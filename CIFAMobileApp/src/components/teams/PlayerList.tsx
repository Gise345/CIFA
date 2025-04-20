// CIFAMobileApp/src/components/teams/PlayerList.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Card from '../common/Card';
import Section from '../common/Section';

interface Player {
  id: string;
  name: string;
  position: string;
  number: number;
  nationality: string;
  age: number;
  photoUrl?: string;
}

interface PlayerListProps {
  teamId: string;
  limit?: number;
  showViewAll?: boolean;
}

const PlayerList: React.FC<PlayerListProps> = ({ 
  teamId, 
  limit, 
  showViewAll = true 
}) => {
  const router = useRouter();
  
  // This would come from Firebase in production
  const getPlayers = (teamId: string) => {
    // Mock player data
    const players: { [key: string]: Player[] } = {
      'team1': [ // Elite SC
        {
          id: 'player1',
          name: 'Jermaine Wilson',
          position: 'Goalkeeper',
          number: 1,
          nationality: 'Cayman Islands',
          age: 28,
        },
        {
          id: 'player2',
          name: 'Christopher Ebanks',
          position: 'Defender',
          number: 4,
          nationality: 'Cayman Islands',
          age: 26,
        },
        {
          id: 'player3',
          name: 'Wesley Robinson',
          position: 'Midfielder',
          number: 8,
          nationality: 'Cayman Islands',
          age: 25,
        },
        {
          id: 'player4',
          name: 'Raul Rodriguez',
          position: 'Forward',
          number: 10,
          nationality: 'Jamaica',
          age: 24,
        },
        {
          id: 'player5',
          name: 'Mark Ebanks',
          position: 'Forward',
          number: 9,
          nationality: 'Cayman Islands',
          age: 29,
        },
      ],
      'team2': [ // Scholars
        {
          id: 'player6',
          name: 'Richard McField',
          position: 'Goalkeeper',
          number: 1,
          nationality: 'Cayman Islands',
          age: 30,
        },
        {
          id: 'player7',
          name: 'Oneil Taylor',
          position: 'Defender',
          number: 5,
          nationality: 'Jamaica',
          age: 27,
        },
        {
          id: 'player8',
          name: 'James Ebanks',
          position: 'Midfielder',
          number: 6,
          nationality: 'Cayman Islands',
          age: 24,
        },
        {
          id: 'player9',
          name: 'Rolly Bodden',
          position: 'Forward',
          number: 11,
          nationality: 'Cayman Islands',
          age: 23,
        },
        {
          id: 'player10',
          name: 'Dwight Dunk',
          position: 'Forward',
          number: 9,
          nationality: 'Cayman Islands',
          age: 25,
        },
      ],
      // Add more teams as needed
    };
    
    return players[teamId] || [];
  };
  
  const players = getPlayers(teamId);
  
  // Apply limit if provided
  const displayedPlayers = limit ? players.slice(0, limit) : players;
  
  const handlePlayerPress = (playerId: string) => {
    router.push(`/players/${playerId}`);
  };
  
  const handleViewAllPress = () => {
    // Use a different approach for navigation to team players
    router.push(`/teams/${teamId}/roster`);
  };

  return (
    <Section 
      title="SQUAD" 
      viewAllText="View All Players"
      onViewAll={showViewAll ? handleViewAllPress : undefined}
      style={styles.section}
    >
      <Card>
        <View style={styles.positionSection}>
          <Text style={styles.positionTitle}>Goalkeepers</Text>
          {displayedPlayers
            .filter(player => player.position === 'Goalkeeper')
            .map(player => (
              <TouchableOpacity
                key={player.id}
                style={styles.playerRow}
                onPress={() => handlePlayerPress(player.id)}
              >
                <View style={styles.playerNumberContainer}>
                  <Text style={styles.playerNumber}>{player.number}</Text>
                </View>
                <View style={styles.playerInfo}>
                  <Text style={styles.playerName}>{player.name}</Text>
                  <Text style={styles.playerNationality}>{player.nationality}</Text>
                </View>
                <Text style={styles.playerAge}>{player.age} yrs</Text>
              </TouchableOpacity>
            ))}
        </View>
        
        <View style={styles.positionSection}>
          <Text style={styles.positionTitle}>Defenders</Text>
          {displayedPlayers
            .filter(player => player.position === 'Defender')
            .map(player => (
              <TouchableOpacity
                key={player.id}
                style={styles.playerRow}
                onPress={() => handlePlayerPress(player.id)}
              >
                <View style={styles.playerNumberContainer}>
                  <Text style={styles.playerNumber}>{player.number}</Text>
                </View>
                <View style={styles.playerInfo}>
                  <Text style={styles.playerName}>{player.name}</Text>
                  <Text style={styles.playerNationality}>{player.nationality}</Text>
                </View>
                <Text style={styles.playerAge}>{player.age} yrs</Text>
              </TouchableOpacity>
            ))}
        </View>
        
        <View style={styles.positionSection}>
          <Text style={styles.positionTitle}>Midfielders</Text>
          {displayedPlayers
            .filter(player => player.position === 'Midfielder')
            .map(player => (
              <TouchableOpacity
                key={player.id}
                style={styles.playerRow}
                onPress={() => handlePlayerPress(player.id)}
              >
                <View style={styles.playerNumberContainer}>
                  <Text style={styles.playerNumber}>{player.number}</Text>
                </View>
                <View style={styles.playerInfo}>
                  <Text style={styles.playerName}>{player.name}</Text>
                  <Text style={styles.playerNationality}>{player.nationality}</Text>
                </View>
                <Text style={styles.playerAge}>{player.age} yrs</Text>
              </TouchableOpacity>
            ))}
        </View>
        
        <View style={styles.positionSection}>
          <Text style={styles.positionTitle}>Forwards</Text>
          {displayedPlayers
            .filter(player => player.position === 'Forward')
            .map(player => (
              <TouchableOpacity
                key={player.id}
                style={styles.playerRow}
                onPress={() => handlePlayerPress(player.id)}
              >
                <View style={styles.playerNumberContainer}>
                  <Text style={styles.playerNumber}>{player.number}</Text>
                </View>
                <View style={styles.playerInfo}>
                  <Text style={styles.playerName}>{player.name}</Text>
                  <Text style={styles.playerNationality}>{player.nationality}</Text>
                </View>
                <Text style={styles.playerAge}>{player.age} yrs</Text>
              </TouchableOpacity>
            ))}
        </View>
      </Card>
    </Section>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 16,
  },
  positionSection: {
    marginBottom: 16,
  },
  positionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  playerNumberContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  playerNumber: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  playerNationality: {
    fontSize: 12,
    color: '#6b7280',
  },
  playerAge: {
    fontSize: 12,
    color: '#6b7280',
  },
});

export default PlayerList;