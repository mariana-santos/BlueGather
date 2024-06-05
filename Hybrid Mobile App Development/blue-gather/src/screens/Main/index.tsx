import React from 'react';

// Type import
import { MainNavigationRoutes } from '@routes/index';

// Pages import
import { Home } from './Home';
import { Profile } from './Profile';
import { CreateEvent } from './CreateEvent';
import { Events } from './Events';

import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

// Interfaces
export type MainRoutes = {
  Home: undefined;
  Profile: undefined;
  CreateEvent: undefined;
  Events: undefined;
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
    <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="CreateEvent" component={CreateEvent} />
      <Stack.Screen name="Events" component={Events} />
    </Stack.Navigator>
  );
};
