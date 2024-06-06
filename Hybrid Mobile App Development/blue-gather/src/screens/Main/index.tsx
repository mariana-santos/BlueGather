import React from 'react';

// Type import
import { MainNavigationRoutes } from '@routes/index';

// Pages import
import { Home } from './Home';
import { Profile } from './Profile';
import { CreateEvent } from './CreateEvent';
import { Events } from './Events';

// Hook import
import { CreateEventProvider } from '@hooks/useCreateEvent';

import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

export type MainRoutesProps = NativeStackNavigationProp<MainRoutes>;

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
    <CreateEventProvider>
      <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="CreateEvent" component={CreateEvent} />
        <Stack.Screen name="Events" component={Events} />
      </Stack.Navigator>
    </CreateEventProvider>
  );
};
