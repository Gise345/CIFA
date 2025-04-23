// CIFAMobileApp/app/teams/[id]/stats.tsx
import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  RefreshControl,
  ActivityIndicator 
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { useTeams } from '../../../src/hooks/useTeams';
import Card from '../../../src/components/common/Card';
import Section from '../../../src/components/common/Section';

// Interface for team statistics
interface TeamStats {
  matches: {
    played: number;
    won: number;
    drawn: number;
    lost: number;
    winPercentage: number;
  };
  goals: {
    scored: number;
    conceded: number;
    average: number;
  };
  discipline: {
    yellowCards: number;
    redCards: number;
  };
  topScorers: {
    playerId: string;
    playerName: string;
    goals: number;
  }[];
}

export default function TeamStatsScreen() {
  const { id } = useLocalSearchParams();
  const teamId = Array.isArray(id) ? id[0] : id;
  
  const { selectedTeam, teamFixtures, teamPlayers, loading, error, loadTeamData } = useTeams();
  const [refreshing, setRefreshing] = useState(false);
  
  // Initialize team stats
  const [teamStats, setTeamStats] = useState<TeamStats>({
    matches: { played: 0, won: 0, drawn: 0, lost: 0, winPercentage: 0 },
    goals: { scored: 0, conceded: 0, average: 0 },
    discipline: { yellowCards: 0, redCards: 0 },
    topScorers: []
  });
  
  // Load team data on mount
  useEffect(() => {
    if (teamId) {
      loadTeamData(teamId);
    }
  }, [teamId]);
  
  // Calculate statistics when fixtures change
  useEffect(() => {
    if (teamFixtures.length > 0 && selectedTeam) {
      calculateTeamStats();
    }
  }, [teamFixtures, selectedTeam]);
  
  // Handle refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    if (teamId) {
      await loadTeamData(teamId);
    }
    setRefreshing(false);
  };
  
  // Calculate team statistics from fixtures
  const calculateTeamStats = () => {
    // Only use completed matches
    const completedFixtures = teamFixtures.filter(fixture => 
      fixture.status === 'completed'
    );
    
    if (completedFixtures.length === 0 || !selectedTeam) return;
    
    let matchesPlayed = 0;
    let matchesWon = 0;
    let matchesDrawn = 0;
    let matchesLost = 0;
    let goalsScored = 0;
    let goalsConceded = 0;
    let yellowCards = 0;
    let redCards = 0;
    
    // Track player goals
    const playerGoals: Record<string, number> = {};
    
    // Process each fixture
    completedFixtures.forEach(fixture => {
      matchesPlayed++;
      
      // Determine if team is home or away
      const isHomeTeam = fixture.homeTeamId === teamId;
      const teamScore = isHomeTeam ? fixture.homeScore || 0 : fixture.awayScore || 0;
      const opponentScore = isHomeTeam ? fixture.awayScore || 0 : fixture.homeScore || 0;
      
      // Update match results
      if (teamScore > opponentScore) {
        matchesWon++;
      } else if (teamScore === opponentScore) {
        matchesDrawn++;
      } else {
        matchesLost++;
      }
      
      // Update goals
      goalsScored += teamScore;
      goalsConceded += opponentScore;
      
      // Process events if available
      if (fixture.events) {
        fixture.events.forEach(event => {
          // Only count events for this team
          if (event.teamId === teamId) {
            // Count cards
            if (event.type === 'yellowCard') {
              yellowCards++;
            } else if (event.type === 'redCard') {
              redCards++;
            }
            
            // Count goals for player stats
            if (event.type === 'goal' || event.type === 'penalty') {
              if (!playerGoals[event.playerId]) {
                playerGoals[event.playerId] = 0;
              }
              playerGoals[event.playerId]++;
            }
          }
          
          // Count own goals scored by opponent as goals for this team
          if (event.teamId !== teamId && event.type === 'ownGoal') {
            goalsScored++;
          }
          
          // Count own goals scored by this team as goals for opponent
          if (event.teamId === teamId && event.type === 'ownGoal') {
            goalsConceded++;
          }
        });
      }
    });
    
    // Calculate win percentage
    const winPercentage = matchesPlayed > 0 
      ? (matchesWon / matchesPlayed) * 100 
      : 0;
    
    // Calculate goals average per match
    const goalsAverage = matchesPlayed > 0 
      ? goalsScored / matchesPlayed 
      : 0;
    
    // Create top scorers list
    const topScorers = Object.entries(playerGoals)
      .map(([playerId, goals]) => {
        // Find player name from team players
        const player = teamPlayers.find(p => p.id === playerId);
        return {
          playerId,
          playerName: player ? player.name : 'Unknown Player',
          goals
        };
      })
      .sort((a, b) => b.goals - a.goals)
      .slice(0, 5); // Top 5 scorers
    
    // Update team stats
    setTeamStats({
      matches: {
        played: matchesPlayed,
        won: matchesWon,
        drawn: matchesDrawn,
        lost: matchesLost,
        winPercentage: Math.round(winPercentage)
      },
      goals: {
        scored: goalsScored,
        conceded: goalsConceded,
        average: parseFloat(goalsAverage.toFixed(2))
      },
      discipline: {
        yellowCards,
        redCards
      },
      topScorers
    });
  };
  
  // Render loading state
  if (loading && !refreshing && !selectedTeam) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Loading team statistics...</Text>
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
      
      {selectedTeam && (
        <>
          {/* Season Overview */}
          <Section title="SEASON OVERVIEW" style={styles.section}>
            <Card>
              <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>{teamStats.matches.played}</Text>
                  <Text style={styles.statLabel}>Matches</Text>
                </View>
                
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>{teamStats.matches.won}</Text>
                  <Text style={styles.statLabel}>Wins</Text>
                </View>
                
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>{teamStats.matches.drawn}</Text>
                  <Text style={styles.statLabel}>Draws</Text>
                </View>
                
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>{teamStats.matches.lost}</Text>
                  <Text style={styles.statLabel}>Losses</Text>
                </View>
              </View>
              
              {/* Win percentage meter */}
              <View style={styles.winPercentageContainer}>
                <View style={styles.meterLabelContainer}>
                  <Text style={styles.meterLabel}>Win Percentage</Text>
                  <Text style={styles.percentageValue}>{teamStats.matches.winPercentage}%</Text>
                </View>
                <View style={styles.meterBackground}>
                  <View 
                    style={[
                      styles.meterFill, 
                      { width: `${teamStats.matches.winPercentage}%` }
                    ]}
                  />
                </View>
              </View>
            </Card>
          </Section>
          
          {/* Scoring Stats */}
          <Section title="SCORING" style={styles.section}>
            <Card>
              <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>{teamStats.goals.scored}</Text>
                  <Text style={styles.statLabel}>Goals For</Text>
                </View>
                
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>{teamStats.goals.conceded}</Text>
                  <Text style={styles.statLabel}>Goals Against</Text>
                </View>
                
                <View style={styles.statCard}>
                  <Text style={styles.statValueSmall}>{teamStats.goals.average}</Text>
                  <Text style={styles.statLabel}>Avg. Goals</Text>
                </View>
                
                <View style={styles.statCard}>
                  <Text style={styles.statValueSmall}>
                    {teamStats.goals.scored - teamStats.goals.conceded}
                  </Text>
                  <Text style={styles.statLabel}>Goal Diff</Text>
                </View>
              </View>
            </Card>
          </Section>
          
          {/* Discipline */}
          <Section title="DISCIPLINE" style={styles.section}>
            <Card>
              <View style={styles.disciplineContainer}>
                <View style={styles.cardContainer}>
                  <View style={styles.yellowCard} />
                  <Text style={styles.cardCount}>{teamStats.discipline.yellowCards}</Text>
                  <Text style={styles.cardLabel}>Yellow Cards</Text>
                </View>
                
                <View style={styles.cardContainer}>
                  <View style={styles.redCard} />
                  <Text style={styles.cardCount}>{teamStats.discipline.redCards}</Text>
                  <Text style={styles.cardLabel}>Red Cards</Text>
                </View>
              </View>
            </Card>
          </Section>
          
          {/* Top Scorers */}
          {teamStats.topScorers.length > 0 && (
            <Section title="TOP SCORERS" style={styles.section}>
              <Card>
                {teamStats.topScorers.map((scorer, index) => (
                  <View key={scorer.playerId} style={[
                    styles.scorerRow,
                    index < teamStats.topScorers.length - 1 && styles.borderBottom
                  ]}>
                    <Text style={styles.scorerRank}>{index + 1}</Text>
                    <Text style={styles.scorerName}>{scorer.playerName}</Text>
                    <Text style={styles.scorerGoals}>{scorer.goals}</Text>
                  </View>
                ))}
              </Card>
            </Section>
          )}
          
          {/* No Statistics Message */}
          {teamStats.matches.played === 0 && (
            <View style={styles.noStatsContainer}>
              <Feather name="bar-chart-2" size={32} color="#9ca3af" />
              <Text style={styles.noStatsText}>
                No match statistics available for this team yet.
              </Text>
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
}

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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
  },
  statCard: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 16,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  statValueSmall: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  winPercentageContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  meterLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  meterLabel: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  percentageValue: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: 'bold',
  },
  meterBackground: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  meterFill: {
    height: '100%',
    backgroundColor: '#2563eb',
    borderRadius: 4,
  },
  disciplineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  cardContainer: {
    alignItems: 'center',
  },
  yellowCard: {
    width: 40,
    height: 60,
    backgroundColor: '#fcd34d',
    borderRadius: 4,
    marginBottom: 12,
  },
  redCard: {
    width: 40,
    height: 60,
    backgroundColor: '#ef4444',
    borderRadius: 4,
    marginBottom: 12,
  },
  cardCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  cardLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  scorerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  scorerRank: {
    width: 30,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4b5563',
  },
  scorerName: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
  },
  scorerGoals: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563eb',
    width: 30,
    textAlign: 'center',
  },
  noStatsContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  noStatsText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
});