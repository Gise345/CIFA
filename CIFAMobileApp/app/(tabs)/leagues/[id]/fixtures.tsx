// CIFAMobileApp/app/leagues/[id]/fixtures.tsx
import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  RefreshControl,
  ActivityIndicator,
  Text
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';

import Header from '../../../../src/components/common/Header';
import LeagueFixtures from '../../../../src/components/Leagues/LeagueFixtures';
import { useLeagues } from '../../../../src/hooks/useLeagues';
import { League } from '../../../../src/services/firebase/leagues';

export default function LeagueFixturesScreen() {
  const { id } = useLocalSearchParams();
  const leagueId = Array.isArray(id) ? id[0] : id;
  
  const { fetchLeagueById, selectedLeague, loading, error } = useLeagues();
  const [refreshing, setRefreshing] = useState(false);
  const [league, setLeague] = useState<League | null>(null);

  // Load league data
  useEffect(() => {
    loadLeague();
  }, [leagueId]);

  // Update league state when selectedLeague changes
  useEffect(() => {
    if (selectedLeague) {
      setLeague(selectedLeague);
    }
  }, [selectedLeague]);

  const loadLeague = async () => {
    if (leagueId) {
      await fetchLeagueById(leagueId);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadLeague();
    setRefreshing(false);
  };

  return (
    <LinearGradient
      colors={['#0047AB', '#191970', '#041E42']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <Header 
          title={league ? `${league.name} Fixtures` : 'League Fixtures'} 
          showBack={true} 
        />
        
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          {loading && !refreshing ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#2563eb" />
              <Text style={styles.loadingText}>Loading fixtures...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Feather name="alert-circle" size={32} color="#ef4444" />
              <Text style={styles.errorText}>Failed to load fixtures</Text>
            </View>
          ) : (
            <View style={styles.contentContainer}>
              <View style={styles.headerContainer}>
                <Text style={styles.leagueTitle}>{league?.name || 'League Fixtures'}</Text>
                <Text style={styles.seasonText}>{league?.season || 'Current Season'}</Text>
              </View>
              
              <LeagueFixtures 
                leagueId={leagueId}
                status="scheduled"
                showVenue={true}
              />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  contentContainer: {
    marginTop: 8,
  },
  headerContainer: {
    marginBottom: 16,
  },
  leagueTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  seasonText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6b7280',
  },
  errorContainer: {
    padding: 40, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    marginTop: 12,
    fontSize: 16,
    color: '#ef4444',
  },
});
