// CIFAMobileApp/app/teams/[id]/index.tsx
import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Image
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { useTeams } from '../../../src/hooks/useTeams';
import { useLeagues } from '../../../src/hooks/useLeagues';
import { Team } from '../../../src/types/team';
import { LeagueFixture } from '../../../src/services/firebase/leagues';

import Card from '../../../src/components/common/Card';
import Section from '../../../src/components/common/Section';
import EnhancedPlayerList from '../../../src/components/teams/EnhancedPlayerList';
import FixtureItem from '../../../src/components/Leagues/FixtureItem';
import LeagueStandings from '../../../src/components/Leagues/LeagueStandings';

export default function TeamOverviewScreen() {
  const { id } = useLocalSearchParams();
  const teamId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();
  
  const { 
    selectedTeam, 
    teamPlayers, 
    teamFixtures, 
    loading, 
    error, 
    loadTeamData, 
    getFixturesByStatus 
  } = useTeams();
  
  const [refreshing, setRefreshing] = useState(false);
  
  // Load team data on mount
  useEffect(() => {
    if (teamId) {
      loadTeamData(teamId);
    }
  }, [teamId]);
  
  // Handle pull-to-refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    if (teamId) {
      await loadTeamData(teamId);
    }
    setRefreshing(false);
  };
  
  // Get next fixture and last result
  const { liveFixtures, upcomingFixtures, pastFixtures } = getFixturesByStatus(teamFixtures);
  
  const nextFixture = [...liveFixtures, ...upcomingFixtures][0];
  const lastResult = pastFixtures[0];
  
  // Navigate to fixture details
  const navigateToFixture = (fixtureId: string) => {
    router.push(`/fixtures/${fixtureId}`);
  };
  
  // Navigate to view all fixtures
  const handleViewAllFixtures = () => {
    router.push(`/teams/${teamId}/fixtures`);
  };
  
  // Render loading state
  if (loading && !refreshing && !selectedTeam) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Loading team information...</Text>
      </View>
    );
  }
  
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      {/* Error State */}
      {error && (
        <View style={styles.errorContainer}>
          <Feather name="alert-circle" size={32} color="#ef4444" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      
      {/* Team Info */}
      {selectedTeam && (
        <>
          {/* Team Details */}
          <Section title="ABOUT THE TEAM" style={styles.section}>
            <Card>
              <View style={styles.teamInfoContainer}>
                {/* Team Details */}
                <View style={styles.teamDetailsContainer}>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Founded:</Text>
                    <Text style={styles.infoValue}>{selectedTeam.foundedYear || 'Unknown'}</Text>
                  </View>
                  
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Home Venue:</Text>
                    <Text style={styles.infoValue}>{selectedTeam.venue || 'Unknown'}</Text>
                  </View>
                  
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Division:</Text>
                    <Text style={styles.infoValue}>{selectedTeam.division || 'Unknown'}</Text>
                  </View>
                  
                  {selectedTeam.website && (
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Website:</Text>
                      <Text style={styles.websiteLink}>{selectedTeam.website}</Text>
                    </View>
                  )}
                </View>
                
                {/* Team Description */}
                {selectedTeam.description && (
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>
                      {selectedTeam.description}
                    </Text>
                  </View>
                )}
              </View>
            </Card>
          </Section>
          
          {/* Next Fixture & Last Result */}
          <Section title="FIXTURES" viewAllText="View All" onViewAll={handleViewAllFixtures} style={styles.section}>
            <Card>
              {(nextFixture || lastResult) ? (
                <View>
                  {/* Next Fixture */}
                  {nextFixture && (
                    <View>
                      <Text style={styles.fixtureHeader}>Next Match</Text>
                      <FixtureItem 
                        fixture={nextFixture}
                        showVenue={true}
                        showLeague={true}
                        onPress={() => navigateToFixture(nextFixture.id)}
                      />
                    </View>
                  )}
                  
                  {/* Last Result */}
                  {lastResult && (
                    <View>
                      <Text style={styles.fixtureHeader}>Last Result</Text>
                      <FixtureItem 
                        fixture={lastResult}
                        showVenue={true}
                        showLeague={true}
                        onPress={() => navigateToFixture(lastResult.id)}
                      />
                    </View>
                  )}
                </View>
              ) : (
                <View style={styles.noFixturesContainer}>
                  <Feather name="calendar" size={24} color="#9ca3af" />
                  <Text style={styles.noFixturesText}>No fixtures available</Text>
                </View>
              )}
            </Card>
          </Section>
          
          {/* League Position (if applicable) */}
          {selectedTeam.leagueId && (
            <Section title="LEAGUE STANDINGS" viewAllText="Full Table" style={styles.section}>
              <LeagueStandings 
                leagueId={selectedTeam.leagueId}
                showTeamLogos={true}
                maxRows={4}
              />
            </Section>
          )}
          
          {/* Squad / Players */}
          <EnhancedPlayerList teamId={teamId} showViewAll={true} />
          
          {/* Team Achievements */}
          {selectedTeam.achievements && selectedTeam.achievements.length > 0 && (
            <Section title="ACHIEVEMENTS" style={styles.section}>
              <Card>
                <View style={styles.achievementsContainer}>
                {selectedTeam.achievements.map((achievement: string, index: number) => (
                <View key={index} style={styles.achievementRow}>
                  <View style={styles.achievementBullet} />
                  <Text style={styles.achievementText}>{achievement}</Text>
                </View>
                  ))}
                </View>
              </Card>
            </Section>
          )}
          
          {/* Team Social Media */}
          {selectedTeam.socialLinks && Object.keys(selectedTeam.socialLinks).length > 0 && (
            <Section title="FOLLOW" style={styles.section}>
              <Card>
                <View style={styles.socialLinksContainer}>
                  {Object.entries(selectedTeam.socialLinks).map(([platform, url]) => (
                    <TouchableOpacity key={platform} style={styles.socialButton}>
                      <Feather 
                        name={getSocialIcon(platform) as any} 
                        size={20} 
                        color="#2563eb" 
                      />
                      <Text style={styles.socialButtonText}>
                        {getPlatformName(platform)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </Card>
            </Section>
          )}
        </>
      )}
    </ScrollView>
  );
}

// Helper function to get social media icon
const getSocialIcon = (platform: string): string => {
  const platformLower = platform.toLowerCase();
  if (platformLower === 'facebook') return 'facebook';
  if (platformLower === 'twitter' || platformLower === 'x') return 'twitter';
  if (platformLower === 'instagram') return 'instagram';
  if (platformLower === 'youtube') return 'youtube';
  if (platformLower === 'tiktok') return 'video';
  return 'globe';
};

// Helper function to get platform display name
const getPlatformName = (platform: string): string => {
  switch (platform.toLowerCase()) {
    case 'facebook':
      return 'Facebook';
    case 'twitter':
      return 'Twitter';
    case 'x':
      return 'X';
    case 'instagram':
      return 'Instagram';
    case 'youtube':
      return 'YouTube';
    case 'tiktok':
      return 'TikTok';
    default:
      return platform.charAt(0).toUpperCase() + platform.slice(1);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
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
  errorContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    marginTop: 8,
    fontSize: 16,
    color: '#ef4444',
    textAlign: 'center',
  },
  section: {
    marginBottom: 16,
  },
  teamInfoContainer: {
    padding: 16,
  },
  teamDetailsContainer: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    width: 100,
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
  },
  websiteLink: {
    flex: 1,
    fontSize: 14,
    color: '#2563eb',
  },
  descriptionContainer: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4b5563',
  },
  fixtureHeader: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f9fafb',
  },
  noFixturesContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noFixturesText: {
    marginTop: 8,
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  achievementsContainer: {
    padding: 16,
  },
  achievementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  achievementBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563eb',
    marginRight: 12,
  },
  achievementText: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
  },
  socialLinksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#eff6ff',
    borderRadius: 8,
  },
  socialButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '500',
  },
});