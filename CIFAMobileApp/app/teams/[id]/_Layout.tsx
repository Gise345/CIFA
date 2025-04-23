// CIFAMobileApp/app/teams/[id]/_layout.tsx
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  ActivityIndicator 
} from 'react-native';
import { Tabs } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTeams } from '../../../src/hooks/useTeams';
import TeamLogo from '../../../src/components/common/TeamLogo';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TeamLayout() {
  const { id } = useLocalSearchParams();
  const teamId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();
  
  const { selectedTeam, loading, error, fetchTeamById } = useTeams();
  
  // Load team data on mount
  useEffect(() => {
    loadTeamData();
  }, [teamId]);
  
  const loadTeamData = async () => {
    if (teamId) {
      // Load team details if not already loaded
      if (!selectedTeam || selectedTeam.id !== teamId) {
        await fetchTeamById(teamId);
      }
    }
  };
  
  // Get primary color from team data or use default
  const getPrimaryColor = () => {
    if (selectedTeam?.colorPrimary) {
      return selectedTeam.colorPrimary;
    }
    return '#2563eb'; // Default blue
  };
  
  // Get contrast color for text based on primary color
  const getContrastColor = () => {
    // Simple contrast calculation, would need a more sophisticated method in production
    return '#ffffff'; // White for now
  };
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[getPrimaryColor(), '#0A1172', '#041E42']} // Start with team color, fade to standard app background
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.header}>
          {/* Back Button */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={24} color={getContrastColor()} />
          </TouchableOpacity>
          
          {/* Team Header Content */}
          <View style={styles.teamHeaderContent}>
            {loading ? (
              <ActivityIndicator size="small" color={getContrastColor()} />
            ) : error ? (
              <Text style={[styles.errorText, { color: getContrastColor() }]}>
                Error loading team
              </Text>
            ) : selectedTeam ? (
              <View style={styles.teamInfoContainer}>
                <TeamLogo
                  teamId={selectedTeam.id}
                  teamName={selectedTeam.name}
                  teamCode={getTeamInitials(selectedTeam.name)}
                  size="medium"
                  colorPrimary={selectedTeam.colorPrimary}
                  colorSecondary={getContrastColor()}
                />
                <View style={styles.teamTextContainer}>
                  <Text style={[styles.teamName, { color: getContrastColor() }]}>
                    {selectedTeam.name}
                  </Text>
                  <Text style={[styles.teamDivision, { color: getContrastColor() }]}>
                    {selectedTeam.division || 'Team'}
                  </Text>
                </View>
              </View>
            ) : (
              <Text style={[styles.loadingText, { color: getContrastColor() }]}>
                Loading team...
              </Text>
            )}
          </View>
          
          {/* Optional Share or Favorite Button */}
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="heart" size={20} color={getContrastColor()} />
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
      
      {/* Tab Navigator */}
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: getPrimaryColor(),
          tabBarInactiveTintColor: '#6b7280',
          tabBarStyle: {
            backgroundColor: 'white',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: '#f3f4f6',
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
            textTransform: 'uppercase',
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Overview",
            tabBarIcon: ({ color }) => (
              <Feather name="info" size={20} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="roster"
          options={{
            title: "Squad",
            tabBarIcon: ({ color }) => (
              <Feather name="users" size={20} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="fixtures"
          options={{
            title: "Fixtures",
            tabBarIcon: ({ color }) => (
              <Feather name="calendar" size={20} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="stats"
          options={{
            title: "Stats",
            tabBarIcon: ({ color }) => (
              <Feather name="bar-chart-2" size={20} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

// Helper function to get team initials
const getTeamInitials = (teamName: string): string => {
  if (!teamName) return '';
  
  const words = teamName.split(' ');
  if (words.length === 1) {
    return words[0].substring(0, 3).toUpperCase();
  }
  
  // Return first letter of each word (up to 3)
  return words
    .slice(0, 3)
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  gradient: {
    paddingTop: 20, // For status bar
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  teamHeaderContent: {
    flex: 1,
    justifyContent: 'center',
  },
  teamInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamTextContainer: {
    marginLeft: 12,
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  teamDivision: {
    fontSize: 14,
    opacity: 0.8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
  },
  errorText: {
    fontSize: 14,
  },
});