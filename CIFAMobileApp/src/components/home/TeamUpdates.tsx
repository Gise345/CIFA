import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

interface TeamStory {
  id: string;
  teamId: string;
  teamName: string;
  teamCode: string;
  colorPrimary: string;
  hasUnreadUpdates: boolean;
}

const TeamUpdates: React.FC = () => {
  // This would come from Firebase in production
  const teamStories: TeamStory[] = [
    {
      id: '1',
      teamId: 'national',
      teamName: 'National',
      teamCode: 'CAY',
      colorPrimary: '#ef4444',
      hasUnreadUpdates: true,
    },
    {
      id: '2',
      teamId: 'scholars',
      teamName: 'Scholars',
      teamCode: 'SCH',
      colorPrimary: '#1e40af',
      hasUnreadUpdates: true,
    },
    {
      id: '3',
      teamId: 'elite',
      teamName: 'Elite SC',
      teamCode: 'ELT',
      colorPrimary: '#15803d',
      hasUnreadUpdates: true,
    },
    {
      id: '4',
      teamId: 'bodden',
      teamName: 'Bodden',
      teamCode: 'BTF',
      colorPrimary: '#7e22ce',
      hasUnreadUpdates: false,
    },
    {
      id: '5',
      teamId: 'future',
      teamName: 'Future SC',
      teamCode: 'FSC',
      colorPrimary: '#b45309',
      hasUnreadUpdates: false,
    },
  ];

  const getGradient = (hasUnread: boolean) => {
    return hasUnread ? styles.activeStoryRing : styles.inactiveStoryRing;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>TEAM UPDATES</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {teamStories.map(team => (
          <TouchableOpacity key={team.id} style={styles.storyContainer}>
            <View style={[styles.storyRing, getGradient(team.hasUnreadUpdates)]}>
              <View style={styles.storyImageContainer}>
                <View 
                  style={[
                    styles.teamLogo, 
                    { backgroundColor: team.colorPrimary }
                  ]}
                >
                  <Text style={styles.teamCode}>{team.teamCode}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.teamName}>{team.teamName}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1effe', // Light blue background
    paddingTop: 8,
    paddingBottom: 12,
  },
  headerContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  header: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  scrollContent: {
    paddingHorizontal: 12,
  },
  storyContainer: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  storyRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 2,
    marginBottom: 4,
  },
  activeStoryRing: {
    backgroundColor: '#2563eb',
  },
  inactiveStoryRing: {
    backgroundColor: '#cbd5e1',
  },
  storyImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamLogo: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamCode: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  teamName: {
    fontSize: 12,
    marginTop: 4,
    color: '#111827',
  },
});

export default TeamUpdates;