// CIFAMobileApp/app/(tabs)/local.tsx
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

import Header from '../../src/components/common/Header';
import LeagueSelector from '../../src/components/Leagues/LeagueSelector';
import LeagueFixtures from '../../src/components/Leagues/LeagueFixtures';
import LeagueStandings from '../../src/components/Leagues/LeagueStandings';
import { LEAGUE_CATEGORIES, LeagueCategory } from '../../src/constants/LeagueTypes';

export default function MatchesScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<LeagueCategory>(LEAGUE_CATEGORIES[0]);
  const [activeTab, setActiveTab] = useState<'fixtures' | 'results' | 'standings'>('fixtures');
  
  // Handle when a league category is selected
  const handleCategorySelect = (category: LeagueCategory) => {
    setSelectedCategory(category);
  };
  
  // Navigate to view all fixtures
  const viewAllFixtures = () => {
    router.push({
      pathname: "/leagues/[id]/fixtures",
      params: { id: selectedCategory.id }
    });
  };
  
  // Navigate to view all results
  const viewAllResults = () => {
    router.push({
      pathname: "/leagues/[id]/results",
      params: { id: selectedCategory.id }
    });
  };
  
  // Navigate to view full table
  const viewFullTable = () => {
    router.push({
      pathname: "/leagues/[id]/standings",
      params: { id: selectedCategory.id }
    });
  };

  return (
    <LinearGradient
      colors={['#0047AB', '#191970', '#041E42']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <Header title="Matches" />
        
        {/* League Selector */}
        <LeagueSelector 
          selectedCategoryId={selectedCategory.id}
          onSelectCategory={handleCategorySelect}
        />
        
        <View style={styles.content}>
          {/* League Header */}
          <View style={styles.leagueHeader}>
            <Text style={styles.leagueTitle}>{selectedCategory.label}</Text>
            <Text style={styles.seasonText}>2024-25 Season</Text>
          </View>
          
          {/* Section Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'fixtures' && styles.activeTab]}
              onPress={() => setActiveTab('fixtures')}
            >
              <Feather 
                name="calendar" 
                size={18} 
                color={activeTab === 'fixtures' ? '#2563eb' : '#6b7280'} 
              />
              <Text 
                style={[
                  styles.tabLabel, 
                  activeTab === 'fixtures' && styles.activeTabLabel
                ]}
              >
                Fixtures
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'results' && styles.activeTab]}
              onPress={() => setActiveTab('results')}
            >
              <Feather 
                name="check-square" 
                size={18} 
                color={activeTab === 'results' ? '#2563eb' : '#6b7280'} 
              />
              <Text 
                style={[
                  styles.tabLabel, 
                  activeTab === 'results' && styles.activeTabLabel
                ]}
              >
                Results
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'standings' && styles.activeTab]}
              onPress={() => setActiveTab('standings')}
            >
              <Feather 
                name="list" 
                size={18} 
                color={activeTab === 'standings' ? '#2563eb' : '#6b7280'} 
              />
              <Text 
                style={[
                  styles.tabLabel, 
                  activeTab === 'standings' && styles.activeTabLabel
                ]}
              >
                Standings
              </Text>
            </TouchableOpacity>
          </View>
          
          {/* Tab Content */}
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
          >
            {activeTab === 'fixtures' && (
              <LeagueFixtures 
                leagueId={selectedCategory.id}
                status="scheduled"
                showVenue={true}
                onViewAllFixtures={viewAllFixtures}
              />
            )}
            
            {activeTab === 'results' && (
              <LeagueFixtures 
                leagueId={selectedCategory.id}
                status="completed"
                showVenue={true}
                onViewAllFixtures={viewAllResults}
              />
            )}
            
            {activeTab === 'standings' && (
              <LeagueStandings 
                leagueId={selectedCategory.id}
                showTeamLogos={true}
                showFullTable={true}
                onViewFullTable={viewFullTable}
              />
            )}
          </ScrollView>
        </View>
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
  content: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  leagueHeader: {
    padding: 16,
    paddingBottom: 8,
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
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tab: {
    paddingVertical: 12,
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2563eb',
  },
  tabLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 6,
  },
  activeTabLabel: {
    color: '#2563eb',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
});