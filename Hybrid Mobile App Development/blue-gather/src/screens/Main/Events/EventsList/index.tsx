import { Fragment, useEffect, useLayoutEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

// Type import
import { Event } from '@dtos/event';

// Component import
import {
  WavesContainer,
  WrapperPage,
  Highlight,
  Button,
  FloatingMenu,
} from '@components/index';
import { Tabs } from './Tabs';

import { StatusFilterType, tabs } from './Tabs/constants';

// Style import
import { 
  TextIndicator,
  Container, 
  EventsWrapper 
} from './styles';
import { EventItem } from './EventItem';
import { ScrollableContent } from '@global/styles';

// Utils import
import { STATUS_OPTIONS } from '@utils/statusOptions';

// Hook import
import { useAuth } from '@hooks/useAuth';

// Route import
import { EventsRoutes } from '..';
import { MainRoutes } from '@screens/Main';

// Service import
import { api } from '@services/api';

export const EventList: React.FC<
  CompositeScreenProps<
    NativeStackScreenProps<EventsRoutes, 'EventList'>,
    NativeStackScreenProps<MainRoutes>
  >
> = ({ navigation }) => {
  const [activeOption, setActiveOption] = useState<StatusFilterType>(tabs[0]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  const { user } = useAuth();

  const fetchEvents = async () => {
    try {
      setLoading(true);
      // const { data } = await api.get(`/evento/voluntario/${user.id}`);
      const { data } = await api.get(`/evento`);
      setEvents(data);
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Não foi possível buscar seus eventos voluntários.',
      });
    }
    finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    const filterBy = STATUS_OPTIONS[activeOption.key];
    setFilteredEvents(events.filter(ev => ev.status.id === filterBy));
  };

  useLayoutEffect(() => {
    fetchEvents();
    filterEvents();
  }, []);

  useLayoutEffect(() => {
    filterEvents();
  }, [activeOption]);

  return (
    <WrapperPage>
      <ScrollableContent>
        <Highlight
          title="Meus eventos"
          subtitle="Aqui você encontra os seus próximos eventos de voluntariado"
        />
        <WavesContainer>
          {loading ? (
            <TextIndicator>Carregando eventos...</TextIndicator>
          ) : (
            <Fragment>
              <Tabs
                activeOption={activeOption}
                handleSelectTab={setActiveOption}
              />
              <EventsWrapper>
                {filteredEvents && filteredEvents.length > 0 ? (
                  filteredEvents.map(item => (
                    <EventItem
                      onPress={() =>
                        navigation.navigate('EventDetails', { id: item.id })
                      }
                      key={item.id}
                      event={item}
                    />
                  ))
                ) : (
                  <Container>
                    <TextIndicator>Nenhum evento encontrado.</TextIndicator>
                    <Button
                      size="SM"
                      label="Encontrar novo evento"
                      style={{ alignSelf: 'center' }}
                      onPress={() => navigation.navigate('Home')}
                    />
                  </Container>
                )}
              </EventsWrapper>
            </Fragment>
          )}

        </WavesContainer>
      </ScrollableContent>
      <FloatingMenu />
    </WrapperPage>
  );
};
