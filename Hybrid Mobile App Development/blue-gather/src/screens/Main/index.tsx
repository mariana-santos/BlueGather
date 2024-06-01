import React from 'react';
import { House, IconProps, User } from 'phosphor-react-native';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';

// Theme import
import theme from '@theme/index';

// Hook import
import { useAuth } from '@hooks/useAuth';
import { QuoteProvider } from '@hooks/useQuote';

// Component import
import { Text } from '@components/Tab';

// Type import
import { MainNavigationRoutes } from '@routes/index';

// Pages import
import { Home } from './Home';
import { Profile } from './Profile';
import { NativeStackNavigationOptions, NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';

// Interfaces
export type MainRoutes = {
  Home: undefined;
  Profile: undefined;
};

export const Main: React.FC<
  NativeStackScreenProps<MainNavigationRoutes, 'Main'>
> = ({ navigation }) => {
  const { user } = useAuth();

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
