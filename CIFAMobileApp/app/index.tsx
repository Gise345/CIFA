import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FirebaseTest from '../src/components/FirebaseTest';


export default function HomeScreen() {
  return (
    <LinearGradient
      colors={['#d72660', '#7c3aed', '#3a0ca3', '#4361ee']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.header}>CIFA Mobile App</Text>
          <Text style={styles.subtitle}>Firebase Configuration Test</Text>
          <FirebaseTest />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#fff', // Changed to white for better visibility on gradient
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff', // Changed to white for better visibility on gradient
  },
});
