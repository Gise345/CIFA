import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../src/components/common/Header';
import LeagueTable from '../../src/components/tables/LeagueTable';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function LocalScreen() {
  const [activeLeague, setActiveLeague] = useState('mensPremier');
  
  const leagues = [
    { id: 'mensPremier', name: "Men's Premier" },
    { id: 'womensPremier', name: "Women's Premier" },
    { id: 'mensFirstDiv', name: "Men's First Div" },
    { id: 'youthU17', name: "Youth U-17" },
    { id: 'youthU15', name: "Youth U-15" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Local Leagues" />
      <View style={styles.leagueTabs}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {leagues.map(league => (
            <TouchableOpacity 
              key={league.id}
              style={[
                styles.leagueTab, 
                activeLeague === league.id && styles.activeLeagueTab
              ]}
              onPress={() => setActiveLeague(league.id)}
            >
              <Text 
                style={[
                  styles.leagueTabText,
                  activeLeague === league.id && styles.activeLeagueTabText
                ]}
              >
                {league.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <ScrollView style={styles.scrollView}>
        <LeagueTable leagueId={activeLeague} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  leagueTabs: {
    backgroundColor: '#1e40af', // Deep blue background
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  leagueTab: {
    backgroundColor: '#1e3a8a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  activeLeagueTab: {
    backgroundColor: '#fff',
  },
  leagueTabText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  activeLeagueTabText: {
    color: '#1e3a8a',
  },
});