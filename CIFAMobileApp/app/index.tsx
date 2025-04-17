// CIFAMobileApp/app/index.tsx
import { Redirect } from 'expo-router';

export default function Index() {
  // If the user is authenticated, redirect to the home tab
  // otherwise redirect to the login screen
  const isAuthenticated = false;
  
  return isAuthenticated ? <Redirect href="/(tabs)" /> : <Redirect href="/(auth)/login" />;
}