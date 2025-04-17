import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { firestore } from '../../config/firebase';
import { collection, doc, getDoc } from 'firebase/firestore';

export default function FirebaseTest() {
  const [connectionStatus, setConnectionStatus] = useState('Testing...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function testFirebaseConnection() {
      try {
        // Test Firestore connection by attempting to get a document
        const testCollectionRef = collection(firestore, 'test');
        const testDocRef = doc(testCollectionRef, 'test');
        await getDoc(testDocRef);
        
        setConnectionStatus('Connection successful!');
      } catch (err) {
        setConnectionStatus('Connection failed');
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    }

    testFirebaseConnection();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Firebase Configuration Test</Text>
      
      <View style={styles.configContainer}>
        <Text style={styles.configLabel}>Project ID:</Text>
        <Text style={styles.configValue}>{Constants.expoConfig?.extra?.firebaseProjectId || 'Not found'}</Text>
        
        <Text style={styles.configLabel}>API Key:</Text>
        <Text style={styles.configValue}>
          {Constants.expoConfig?.extra?.firebaseApiKey 
            ? '✓ Configured (hidden for security)' 
            : 'Not found'}
        </Text>
        
        <Text style={styles.configLabel}>Auth Domain:</Text>
        <Text style={styles.configValue}>{Constants.expoConfig?.extra?.firebaseAuthDomain || 'Not found'}</Text>
      </View>
      
      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Connection Status:</Text>
        <Text style={[
          styles.statusValue, 
          connectionStatus === 'Connection successful!' ? styles.success : 
          connectionStatus === 'Connection failed' ? styles.error : styles.testing
        ]}>
          {connectionStatus}
        </Text>
        
        {error && <Text style={styles.errorText}>Error: {error}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  configContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  configLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  configValue: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  statusContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statusLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statusValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  testing: {
    color: '#f2994a',
  },
  success: {
    color: '#27ae60',
  },
  error: {
    color: '#eb5757',
  },
  errorText: {
    color: '#eb5757',
    marginTop: 8,
  },
});