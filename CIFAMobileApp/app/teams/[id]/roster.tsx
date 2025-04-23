// CIFAMobileApp/app/teams/[id]/roster.tsx
import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Image,
  RefreshControl,
  ActivityIndicator,
  ScrollView 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

import { useTeams } from '../../../src/hooks/useTeams';
import { Player } from '../../../src/types/team';

export default function TeamRosterScreen() {
  const { id } = useLocalSearchParams();
  const teamId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();
  
  const { selectedTeam, teamPlayers, loading, error, loadTeamData } = useTeams();
  const [refreshing, setRefreshing] = useState(false);
  const [activePosition, setActivePosition] = useState<string | null>(null);
  
  // Load team data on mount
  useEffect(() => {
    if (teamId) {
      loadTeamData(teamId);
    }
  }, [teamId]);
  
  // Handle refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    if (teamId) {
      await loadTeamData(teamId);
    }
    setRefreshing(false);
  };
  
  // Get unique positions from players
  const positions = [...new Set(teamPlayers.map(player => player.position))].filter(Boolean);
  
  // Filter players by selected position
  const filteredPlayers = activePosition
    ? teamPlayers.filter(player => player.position === activePosition)
    : teamPlayers;
  
  // Navigate to player details
  const navigateToPlayer = (playerId: string) => {
    router.push(`/players/${playerId}`);
  };
  
  // Render loading state
  if (loading && !refreshing && !selectedTeam) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Loading roster...</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      {/* Position Filter Tabs */}
      <View style={styles.positionFilterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity 
            style={[
              styles.positionTab, 
              activePosition === null && styles.activePositionTab
            ]}
            onPress={() => setActivePosition(null)}
          >
            <Text style={[
              styles.positionTabText, 
              activePosition === null && styles.activePositionTabText
            ]}>
              All
            </Text>
          </TouchableOpacity>
          
          {positions.map(position => (
            <TouchableOpacity 
              key={position}
              style={[
                styles.positionTab, 
                activePosition === position && styles.activePositionTab
              ]}
              onPress={() => setActivePosition(position)}
            >
              <Text style={[
                styles.positionTabText, 
                activePosition === position && styles.activePositionTabText
              ]}>
                {position}s
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* Error State */}
      {error && (
        <View style={styles.errorContainer}>
          <Feather name="alert-circle" size={32} color="#ef4444" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      
      {/* Player List */}
      <FlatList
        data={filteredPlayers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.playerCard}
            onPress={() => navigateToPlayer(item.id)}
          >
            {/* Player Image */}
            <View style={styles.playerImageContainer}>
              {item.photoUrl ? (
                <Image 
                  source={{ uri: item.photoUrl }} 
                  style={styles.playerImage} 
                />
              ) : (
                <View style={styles.playerImagePlaceholder}>
                  <Text style={styles.playerInitials}>
                    {getPlayerInitials(item.name)}
                  </Text>
                </View>
              )}
              <View style={styles.playerNumberBadge}>
                <Text style={styles.playerNumberText}>{item.number}</Text>
              </View>
            </View>
            
            {/* Player Info */}
            <View style={styles.playerInfoContainer}>
              <Text style={styles.playerName}>{item.name}</Text>
              <Text style={styles.playerPosition}>{item.position}</Text>
              {item.nationality && (
                <Text style={styles.playerNationality}>{item.nationality}</Text>
              )}
            </View>
            
            {/* Arrow Icon */}
            <View style={styles.arrowContainer}>
              <Feather name="chevron-right" size={20} color="#9ca3af" />
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Feather name="users" size={32} color="#9ca3af" />
            <Text style={styles.emptyText}>
              {teamPlayers.length === 0
                ? 'No players available'
                : 'No players found for the selected position'}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

// Helper function to get player initials
const getPlayerInitials = (name: string): string => {
  if (!name) return '';
  
  const words = name.split(' ');
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }
  
  // Return first letter of first and last name
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6b7280',
  },
  positionFilterContainer: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  positionTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    marginHorizontal: 4,
  },
  activePositionTab: {
    backgroundColor: '#2563eb',
  },
  positionTabText: {
    fontSize: 14,
    color: '#4b5563',
    fontWeight: '500',
  },
  activePositionTabText: {
    color: 'white',
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  playerImageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  playerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  playerImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerInitials: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6b7280',
  },
  playerNumberBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  playerNumberText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  playerInfoContainer: {
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  playerPosition: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 2,
  },
  playerNationality: {
    fontSize: 12,
    color: '#6b7280',
  },
  arrowContainer: {
    padding: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    marginTop: 8,
    fontSize: 16,
    color: '#ef4444',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
});