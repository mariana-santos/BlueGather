import { Fragment, useEffect, useState } from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { Marker, Region, MapPressEvent } from 'react-native-maps';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Style import
import {
  EventIcon,
  EventInfo,
  EventSubtitle,
  EventTitle,
  EventWrapper,
  Map,
} from './styles';

// Type import
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainRoutes } from '..';
import { ImageSourcePropType } from 'react-native';
import { Event } from '@dtos/event';

// Theme import
import { MainNavigationRoutes } from '@routes/index';

// Service import
import { api } from '@services/api';

// Asset import
import defaultIcon from '@assets/default_event_icon.png';

// Component import
import { FloatingMenu } from '@components/FloatingMenu';
import { SearchEventsInput } from './SearchEventsInput';

// Util import
import { STATUS_OPTIONS } from '@utils/statusOptions';

export function Home({
  navigation,
}: CompositeScreenProps<
  NativeStackScreenProps<MainRoutes, 'Home'>,
  NativeStackScreenProps<MainNavigationRoutes>
>) {
  const [currentRegion, setCurrentRegion] = useState<Region>();
  const [events, setEvents] = useState<Event[]>([]);
  const [userMarker, setUserMarker] = useState<Region>();

  useEffect(() => {
    (async function loadInitialPosition() {
      const { granted } = await requestForegroundPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          accuracy: 6,
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        });
      }
    })();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await api.get(`/evento/status/${STATUS_OPTIONS.inProgress}`);
        setEvents(data);
      } catch (error) {
        console.error(error);
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: 'Não foi possível buscar os eventos voluntários perto de você',
        });
      }
    };

    fetchEvents();
  }, []);

  const handleMapPress = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setUserMarker({ 
      latitude,
      longitude,
      latitudeDelta: 5,
      longitudeDelta: 5,
    });
  };

  if (!currentRegion) return;

  return (
    <Fragment>
      <Map
        onRegionChangeComplete={region => setCurrentRegion(region)}
        initialRegion={currentRegion}
        onPress={handleMapPress}
      >        
        {userMarker && (
          <Marker
            coordinate={{
              longitude: userMarker.latitude,
              latitude: userMarker.latitude,
            }}
          >
            <EventIcon source={defaultIcon} />
            <EventInfo>
              <EventWrapper>
                <EventTitle numberOfLines={1}>aaaaaaaaaa</EventTitle>
              </EventWrapper>
            </EventInfo>
          </Marker>
        )}

        {events && events?.map(ev => {
          const imageSource: ImageSourcePropType = ev.imagens && ev.imagens.length > 0
            ? { uri: ev.imagens[0].urlImagem }
            : defaultIcon;

          let formattedDate = '';

          if (ev.dataInicio) {
            const parsedDate = parseISO(ev.dataInicio);
            formattedDate = format(parsedDate, "dd/MM 'às' HH'h'mm", {
              locale: ptBR,
            });
          }

          return (
            <Marker
              key={ev.id}
              coordinate={{
                longitude: Number(ev.longitude),
                latitude: Number(ev.latitude),
              }}
            >
              <EventIcon source={imageSource} />
              <EventInfo>
                <EventWrapper>
                  <EventTitle numberOfLines={1}>{ev.titulo}</EventTitle>
                  <EventSubtitle numberOfLines={2}>
                    {ev.descricao || formattedDate}
                  </EventSubtitle>
                </EventWrapper>
              </EventInfo>
            </Marker>
          );
        })}
      </Map>

      <SearchEventsInput events={events} />

      <FloatingMenu />
    </Fragment>
  );
}
