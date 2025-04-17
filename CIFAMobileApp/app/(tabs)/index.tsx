import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../src/components/common/Header';
import TeamUpdates from '../../src/components/home/TeamUpdates';
import FeaturedMatch from '../../src/components/home/FeaturedMatch';
import UpcomingFixtures from '../../src/components/home/upcomingFixtures';
import NewsList from '../../src/components/home/NewsList';

export default function LatestScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="CIFA" showNotification={true} showMenu={true} />
      <ScrollView style={styles.scrollView}>
        <TeamUpdates />
        <FeaturedMatch />
        <UpcomingFixtures />
        <NewsList />
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
});