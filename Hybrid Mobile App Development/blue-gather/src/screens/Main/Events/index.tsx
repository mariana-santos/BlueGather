import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

// Type import
import { MainRoutes } from '..';

// Pages import
import { EventList } from '@screens/Main/Events/EventsList';
import { EventDetails } from '@screens/Main/Events/QuoteDetails';

// Interfaces
export type EventsRoutes = {
  EventList: undefined;
  EventDetails: { id: number } ;
};

export const Events: React.FC<
  NativeStackScreenProps<MainRoutes, 'Events'>
> = () => {
  const Stack = createNativeStackNavigator<EventsRoutes>();

  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
    gestureEnabled: true,
    animation: 'slide_from_right',
  };

  return (
    <Stack.Navigator initialRouteName="EventList" screenOptions={screenOptions}>
      <Stack.Screen name="EventList" component={EventList} />
      <Stack.Screen name="EventDetails" component={EventDetails} />
    </Stack.Navigator>
  );
};
