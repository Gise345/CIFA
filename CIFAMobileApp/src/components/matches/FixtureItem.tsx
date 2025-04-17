import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Card from '../common/Card';
import TeamLogo from '../common/TeamLogo';

interface Team {
  id: string;
  name: string;
  code: string;
  primaryColor: string;
}

interface Fixture {
  id: string;
  date: string;
  time: string;
  competition: string;
  homeTeam: Team;
  awayTeam: Team;
  venue?: string;
  status?: 'scheduled' | 'live' | 'completed';
  homeScore?: number;
  awayScore?: number;
}

interface FixtureItemProps {
  fixture: Fixture;
  onPress?: () => void;
  showVenue?: boolean;
}

const FixtureItem: React.FC<FixtureItemProps> = ({
  fixture,
  onPress,
  showVenue = false,
}) => {
  const isLive = fixture.status === 'live';
  const isCompleted = fixture.status === 'completed';
  const hasScores = isLive || isCompleted;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.container}>
        <Text style={styles.metaText}>
          {fixture.date} • {fixture.time} • {fixture.competition}
        </Text>
        
        <View style={styles.teamsContainer}>
          <View style={styles.teamContainer}>
            <TeamLogo
              teamId={fixture.homeTeam.id}
              teamCode={fixture.homeTeam.code}
              size="small"
              colorPrimary={fixture.homeTeam.primaryColor}
            />
            <Text style={styles.teamName}>{fixture.homeTeam.name}</Text>
          </View>
          
          {hasScores ? (
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>
                {fixture.homeScore} - {fixture.awayScore}
              </Text>
              {isLive && <Text style={styles.liveIndicator}>LIVE</Text>}
            </View>
          ) : (
            <Text style={styles.vsText}>VS</Text>
          )}
          
          <View style={styles.teamContainer}>
            <Text style={styles.teamName}>{fixture.awayTeam.name}</Text>
            <TeamLogo
              teamId={fixture.awayTeam.id}
              teamCode={fixture.awayTeam.code}
              size="small"
              colorPrimary={fixture.awayTeam.primaryColor}
            />
          </View>
        </View>
        
        {showVenue && fixture.venue && (
          <Text style={styles.venueText}>{fixture.venue}</Text>
        )}
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    backgroundColor: '#f9fafb',
  },
  metaText: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 4,
  },
  teamsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  teamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '40%',
  },
  teamName: {
    fontSize: 14,
    fontWeight: '500',
    marginHorizontal: 8,
  },
  vsText: {
    fontSize: 12,
    color: '#9ca3af',
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  liveIndicator: {
    fontSize: 10,
    color: '#ef4444',
    fontWeight: 'bold',
    marginTop: 2,
  },
  venueText: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 4,
  },
});

export default FixtureItem;