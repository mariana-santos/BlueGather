import React from 'react';

// Hook import
import { QuoteProvider } from '@hooks/useQuote';

// Type import
import { MainNavigationRoutes } from '@routes/index';

// Pages import
import { Home } from './Home';
import { Profile } from './Profile';
import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

// Interfaces
export type MainRoutes = {
  Home: undefined;
  Profile: undefined;
};

export const Main: React.FC<
  NativeStackScreenProps<MainNavigationRoutes, 'Main'>
> = ({ navigation }) => {
  const Stack = createNativeStackNavigator<MainRoutes>();

  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
    gestureEnabled: true,
    animation: 'fade',
  };

  return (
    <QuoteProvider>
      <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </QuoteProvider>
  );
};
