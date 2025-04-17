// CIFAMobileApp/src/components/home/FeaturedMatch.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import TeamLogo from '../common/TeamLogo';

interface FeaturedMatchProps {
  onPress?: () => void;
}

const FeaturedMatch: React.FC<FeaturedMatchProps> = ({ onPress }) => {
  // This would come from Firebase in production
  const matchData = {
    id: 'match001',
    homeTeam: {
      id: 'national',
      name: 'Cayman',
      code: 'CAY',
      primaryColor: '#ef4444',
    },
    awayTeam: {
      id: 'jamaica',
      name: 'Jamaica',
      code: 'JAM',
      primaryColor: '#eab308',
    },
    time: '7:30 PM',
    date: 'TODAY',
    notification: 'Starting lineup announced',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.featuredText}>FEATURED MATCH • {matchData.date}</Text>
      
      <View style={styles.matchContainer}>
        <View style={styles.teamContainer}>
          <TeamLogo 
            teamId={matchData.homeTeam.id}
            teamName={matchData.homeTeam.name}
            teamCode={matchData.homeTeam.code}
            size="medium"
            showName={true}
            colorPrimary={matchData.homeTeam.primaryColor}
          />
        </View>
        
        <View style={styles.scoreContainer}>
          <Text style={styles.vsText}>VS</Text>
          <Text style={styles.timeText}>{matchData.time}</Text>
        </View>
        
        <View style={styles.teamContainer}>
          <TeamLogo 
            teamId={matchData.awayTeam.id}
            teamName={matchData.awayTeam.name}
            teamCode={matchData.awayTeam.code}
            size="medium"
            showName={true}
            colorPrimary={matchData.awayTeam.primaryColor}
          />
        </View>
      </View>
      
      <View style={styles.notificationBanner}>
        <View style={styles.notificationLeft}>
          <Feather name="bell" size={14} color="white" style={styles.notificationIcon} />
          <Text style={styles.notificationText}>{matchData.notification}</Text>
        </View>
        <TouchableOpacity style={styles.viewButton} onPress={onPress}>
          <Text style={styles.viewButtonText}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2563eb',
    padding: 12,
  },
  featuredText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  matchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  teamContainer: {
    alignItems: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
  },
  vsText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  timeText: {
    color: 'white',
    fontSize: 12,
  },
  notificationBanner: {
    backgroundColor: '#1d4ed8',
    borderRadius: 4,
    padding: 4,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationIcon: {
    marginRight: 4,
  },
  notificationText: {
    color: 'white',
    fontSize: 12,
  },
  viewButton: {
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  viewButtonText: {
    color: '#2563eb',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default FeaturedMatch;