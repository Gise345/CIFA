import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Card from '../common/Card';
import Section from '../common/Section';
import LeagueTableRow from './LeagueTableRow';

interface LeagueTableProps {
  leagueId: string;
  onViewFullTable?: () => void;
}

const LeagueTable: React.FC<LeagueTableProps> = ({ leagueId, onViewFullTable }) => {
  // This would come from Firebase in production based on leagueId
  const leagueData = {
    id: leagueId,
    name: "MEN'S PREMIER LEAGUE",
    season: '2024-25 Season',
    teams: [
      {
        id: 'elite',
        name: 'Elite SC',
        logo: '/path/to/logo',
        position: 1,
        played: 12,
        goalDifference: '+17',
        points: 28,
        color: '#16a34a', // Green
      },
      {
        id: 'scholars',
        name: 'Scholars',
        logo: '/path/to/logo',
        position: 2,
        played: 12,
        goalDifference: '+12',
        points: 24,
        color: '#1e40af', // Blue
      },
      {
        id: 'future',
        name: 'Future SC',
        logo: '/path/to/logo',
        position: 3,
        played: 12,
        goalDifference: '+8',
        points: 20,
        color: '#ca8a04', // Yellow/gold
      },
      {
        id: 'bodden',
        name: 'Bodden',
        logo: '/path/to/logo',
        position: 4,
        played: 12,
        goalDifference: '+5',
        points: 18,
        color: '#7e22ce', // Purple
      },
    ],
  };

  return (
    <Section 
      title="LEAGUE TABLE" 
      viewAllText="Full Table" 
      onViewAll={onViewFullTable}
      style={styles.section}
    >
      <Card padding="medium" style={styles.card}>
        {/* Table Headers */}
        <View style={styles.tableHeader}>
          <Text style={[styles.headerText, styles.positionColumn]}>#</Text>
          <Text style={[styles.headerText, styles.teamColumn]}>Team</Text>
          <Text style={[styles.headerText, styles.playedColumn]}>P</Text>
          <Text style={[styles.headerText, styles.gdColumn]}>GD</Text>
          <Text style={[styles.headerText, styles.pointsColumn]}>PTS</Text>
        </View>

        {/* Team Rows */}
        {leagueData.teams.map((team, index) => (
          <LeagueTableRow 
            key={team.id}
            team={team}
            isLast={index === leagueData.teams.length - 1}
          />
        ))}
      </Card>
    </Section>
  );
};

const styles = StyleSheet.create({
  section: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  card: {
    padding: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  headerText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
  },
  positionColumn: {
    flex: 1,
  },
  teamColumn: {
    flex: 5,
  },
  playedColumn: {
    flex: 2,
    textAlign: 'center',
  },
  gdColumn: {
    flex: 2,
    textAlign: 'center',
  },
  pointsColumn: {
    flex: 2,
    textAlign: 'center',
  },
});

export default LeagueTable;