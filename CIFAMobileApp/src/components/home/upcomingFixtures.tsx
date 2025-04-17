import React from 'react';
import { View, StyleSheet } from 'react-native';
import Section from '../common/Section';
import FixtureItem from '../matches/FixtureItem';

interface UpcomingFixturesProps {
  onViewAll?: () => void;
}

const UpcomingFixtures: React.FC<UpcomingFixturesProps> = ({ onViewAll }) => {
  // This would come from Firebase in production
  const fixtures = [
    {
      id: 'fixture1',
      date: 'SAT, 19 APR',
      time: '7:00 PM',
      competition: "MEN'S PREMIER LEAGUE",
      homeTeam: {
        id: 'scholars',
        name: 'Scholars FC',
        code: 'SCH',
        primaryColor: '#1e40af',
      },
      awayTeam: {
        id: 'latinos',
        name: 'Latinos FC',
        code: 'LAT',
        primaryColor: '#15803d',
      },
    },
    {
      id: 'fixture2',
      date: 'SUN, 20 APR',
      time: '5:00 PM',
      competition: "WOMEN'S PREMIER LEAGUE",
      homeTeam: {
        id: 'elite',
        name: 'Elite SC',
        code: 'ELT',
        primaryColor: '#15803d',
      },
      awayTeam: {
        id: 'scholars',
        name: 'Scholars',
        code: 'SCH',
        primaryColor: '#1e40af',
      },
    },
  ];

  return (
    <Section title="UPCOMING FIXTURES" viewAllText="View all" onViewAll={onViewAll}>
      <View style={styles.container}>
        {fixtures.map(fixture => (
          <FixtureItem key={fixture.id} fixture={fixture} />
        ))}
      </View>
    </Section>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});

export default UpcomingFixtures;