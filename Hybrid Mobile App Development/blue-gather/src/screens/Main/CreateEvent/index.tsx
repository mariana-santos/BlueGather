import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

// Hook import
import { CreateEventProvider } from '@hooks/useCreateEvent';

// Pages import
import { Step1 } from '@screens/Main/CreateEvent/Step1';
import { Step2 } from '@screens/Main/CreateEvent/Step2';
import { Step3 } from '@screens/Main/CreateEvent/Step3';
import { MainRoutes } from '..';

// Interfaces
export type CreateEventRoutes = {
  Step1: undefined;
  Step2: undefined;
  Step3: undefined;
  Step4: undefined;
};

export const CreateEvent: React.FC<
  NativeStackScreenProps<MainRoutes, 'CreateEvent'>
> = () => {
  const Stack = createNativeStackNavigator<CreateEventRoutes>();

  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
    gestureEnabled: true,
    animation: 'slide_from_right',
  };

  return (
    <CreateEventProvider>
      <Stack.Navigator initialRouteName="Step1" screenOptions={screenOptions}>
        <Stack.Screen name="Step1" component={Step1} />
        <Stack.Screen name="Step2" component={Step2} />
        <Stack.Screen name="Step3" component={Step3} />
      </Stack.Navigator>
    </CreateEventProvider>
  );
};
