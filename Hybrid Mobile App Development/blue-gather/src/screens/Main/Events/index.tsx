import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

// Type import
import { MainRoutes } from '..';
import { Image } from '@dtos/image';
import { Event } from '@dtos/event';

// Pages import
import { EventList } from '@screens/Main/Events/EventsList';
import { EventDetails } from '@screens/Main/Events/EventDetails';
import { EventImages } from '@screens/Main/Events/EventImages';
import { ShareEvent } from '@screens/Main/Events/ShareEvent';

// Interfaces
export type EventsRoutes = {
  EventList: undefined;
  EventDetails: { id: number } ;
  EventImages: { images: Image[] } ;
  ShareEvent: { event: Event } ;
};

export type EventsRoutesProps = NativeStackNavigationProp<EventsRoutes>;

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
      <Stack.Screen name="EventImages" component={EventImages} />
      <Stack.Screen name="ShareEvent" component={ShareEvent} />
    </Stack.Navigator>
  );
};
