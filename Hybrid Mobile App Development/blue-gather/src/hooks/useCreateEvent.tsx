import React, {
  Dispatch,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

import Toast from 'react-native-toast-message';
import { api } from '@services/api';
import { CreateEventRoutes } from '@screens/Main/CreateEvent';
import { MainNavigationRoutes } from '@routes/index';
import { StackNavigationProp } from '@react-navigation/stack';

export type NavigationProp = StackNavigationProp<
  CreateEventRoutes & MainNavigationRoutes
>;

interface CreateEventContextData {}

interface CreateEventProviderProps {
  children: React.ReactNode;
}

const CreateEventContext = createContext<CreateEventContextData>(
  {} as CreateEventContextData,
);

const CreateEventProvider: React.FC<CreateEventProviderProps> = ({
  children,
}) => {
  return (
    <CreateEventContext.Provider value={{}}>
      {children}
    </CreateEventContext.Provider>
  );
};

function useCreateEvent(): CreateEventContextData {
  const context = useContext(CreateEventContext);

  if (!context)
    throw new Error('useCreateEvent must be used within a CreateEventProvider');

  return context;
}

export { CreateEventProvider, useCreateEvent };
