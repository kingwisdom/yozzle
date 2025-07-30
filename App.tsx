import React from 'react';
import { StatusBar } from 'expo-status-bar';
import GameScreen from './app/tabs/GameScreen';
import { NavigationProp, RouteProp } from '@react-navigation/native';

export default function App() {
  // Mock navigation object for standalone testing
  const mockNavigation: NavigationProp<any> = {
    goBack: () => console.log('Back pressed'),
    canGoBack: () => false,
    replace: (screen: string, params: any) => console.log('Navigate to', screen, params),
    dispatch: (action: any) => {},
    navigate: (screen: string, params?: any) => {},
    isFocused: () => true,
    addListener: (type: any, listener: any) => { return () => {} },
    removeListener: (type: any, listener: any) => {},
    setParams: (params: any) => {},
    setOptions: (options: any) => {},
  };

  // Mock route object
  const mockRoute: RouteProp<{ params: { levelId: number } }, 'params'> = {
    key: 'params',
    name: 'params',
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
