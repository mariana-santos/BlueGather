import React, {
  Dispatch,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import { useNavigation } from '@react-navigation/native';

import Toast from 'react-native-toast-message';

// Service import
import { api } from '@services/api';

//Type import
import { CreateEventRoutes } from '@screens/Main/CreateEvent';
import { MainNavigationRoutes } from '@routes/index';
import { StackNavigationProp } from '@react-navigation/stack';
import { EventQuery } from "@dtos/event"
import { Image } from '@dtos/image';
import { MainRoutesProps } from '@screens/Main';

export type NavigationProp = StackNavigationProp<
  CreateEventRoutes & MainNavigationRoutes
>;

interface CreateEventContextData {
  event: EventQuery, 
  imagesUrl: string[], 
  setEvent: Dispatch<React.SetStateAction<EventQuery>>;
  setImagesUrl: Dispatch<React.SetStateAction<string[]>>;
  handleNewEvent: (eventData: EventQuery) => Promise<void>;
}

interface CreateEventProviderProps {
  children: React.ReactNode;
}

const CreateEventContext = createContext<CreateEventContextData>(
  {} as CreateEventContextData,
);

const CreateEventProvider: React.FC<CreateEventProviderProps> = ({
  children,
}) => {
  const [event, setEvent] = useState<EventQuery>({} as EventQuery);
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<MainRoutesProps>();

  const handleNewImage = useCallback(async (imageData: Image) => {
    try {
      // setLoading(true);
      const body = imageData;
      const { data } = await api.post('/imagem', body);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Não foi possível cadastrar estas imagens.',
      });

      throw error;
    } finally {
      // setLoading(false);
    }
  }, []);

  const handleNewEvent = useCallback(async (eventData: EventQuery) => {
    try {
      setLoading(true);

      const body = eventData;
      const { data } = await api.post('/evento', body);

      if (data?.id) {
        Toast.show({
          type: 'success',
          text1: 'Evento criado com sucesso!',
        });

        // navigation.navigate("Events", {
        //   screen: "EventDetails", 
        //   id: data?.id 
        // });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Não foi possível cadastrar este evento.',
      });

      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <CreateEventContext.Provider value={{
      event,
      imagesUrl,
      setEvent,
      setImagesUrl,
      handleNewEvent
    }}>
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
