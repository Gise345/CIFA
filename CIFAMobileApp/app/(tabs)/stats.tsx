import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../src/components/common/Header';
import TopScorers from '../../src/components/tables/TopScorers';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function StatsScreen() {
  const [activeCategory, setActiveCategory] = useState('mensPremier');
  
  const categories = [
    { id: 'mensPremier', name: "Men's Premier" },
    { id: 'womensPremier', name: "Women's Premier" },
    { id: 'nationalTeam', name: "National Team" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Statistics" />
      <View style={styles.categoryTabs}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map(category => (
            <TouchableOpacity 
              key={category.id}
              style={[
                styles.categoryTab, 
                activeCategory === category.id && styles.activeCategoryTab
              ]}
              onPress={() => setActiveCategory(category.id)}
            >
              <Text 
                style={[
                  styles.categoryTabText,
                  activeCategory === category.id && styles.activeCategoryTabText
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <ScrollView style={styles.scrollView}>
        <TopScorers categoryId={activeCategory} />
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
  categoryTabs: {
    backgroundColor: '#1e40af', // Deep blue background
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  categoryTab: {
    backgroundColor: '#1e3a8a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  activeCategoryTab: {
    backgroundColor: '#fff',
  },
  categoryTabText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  activeCategoryTabText: {
    color: '#1e3a8a',
  },
});