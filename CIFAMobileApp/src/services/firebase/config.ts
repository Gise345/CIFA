// CIFAMobileApp/src/services/firebase/config.ts
import { initializeApp, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getMessaging } from 'firebase/messaging';
import Constants from 'expo-constants';

// Initialize Firebase
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey ?? 'placeholder-api-key',
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain ?? 'placeholder-auth-domain',
  projectId: Constants.expoConfig?.extra?.firebaseProjectId ?? 'placeholder-project-id',
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket ?? 'placeholder-storage-bucket',
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId ?? 'placeholder-messaging-sender-id',
  appId: Constants.expoConfig?.extra?.firebaseAppId ?? 'placeholder-app-id',
  measurementId: Constants.expoConfig?.extra?.firebaseMeasurementId ?? 'placeholder-measurement-id',
};

// Initialize Firebase (prevent multiple initializations)
let firebaseApp;
try {
  firebaseApp = getApp();
} catch (error) {
  firebaseApp = initializeApp(firebaseConfig);
}

// Initialize Firebase services
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
// Note: Messaging only works on web and native platforms with proper setup
let messaging;
try {
  messaging = getMessaging(firebaseApp);
} catch (error) {
  console.log('Firebase messaging is not available on this platform');
}

export { auth, firestore, storage, messaging, firebaseApp };