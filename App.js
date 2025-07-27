import React from 'react';
import { StatusBar } from 'expo-status-bar';
import GameScreen from './screens/GameScreen';

export default function App() {
  // Mock navigation object for standalone testing
  const mockNavigation = {
    goBack: () => console.log('Back pressed'),
    canGoBack: () => false,
    replace: (screen, params) => console.log('Navigate to', screen, params),
  };

  // Mock route object
  const mockRoute = {
    params: { levelId: 3 }
  };

  return (
    <>
      <StatusBar style="light" />
      <GameScreen 
        navigation={mockNavigation} 
        route={mockRoute}
      />
    </>
  );
}

