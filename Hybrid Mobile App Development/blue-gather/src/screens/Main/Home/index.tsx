import { Fragment, useEffect, useState } from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { Region, MapPressEvent } from 'react-native-maps';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';

// Style import
import {
  EventIcon,
  EventInfo,
  EventSubtitle,
  EventTitle,
  EventWrapper,
  Map,
  Marker,
} from './styles';

// Type import
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainRoutes } from '..';
import { ImageSourcePropType } from 'react-native';
import { Event } from '@dtos/event';
import { EventsRoutes } from '../Events';

// Service import
import { api } from '@services/api';

// Asset import
import defaultIcon from '@assets/default_event_icon.png';

// Component import
import { FloatingMenu } from '@components/FloatingMenu';
import { SearchEventsInput } from './SearchEventsInput';

// Util import
import { STATUS_OPTIONS } from '@utils/options';
import { formatDate } from '@utils/format-date';

// Hook import
import { useCreateEvent } from '@hooks/useCreateEvent';
import { MapPinLine } from 'phosphor-react-native';
import theme from '@theme/index';

export function Home({
  navigation,
}: CompositeScreenProps<
  NativeStackScreenProps<MainRoutes, 'Home'>,
  NativeStackScreenProps<EventsRoutes>
>) {
  const [currentRegion, setCurrentRegion] = useState<Region>();
  const [events, setEvents] = useState<Event[]>([]);
  const [userMarker, setUserMarker] = useState<Region>();

  const { event, setEvent } = useCreateEvent();

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
        const { data } = await api.get(
          `/evento/status/${STATUS_OPTIONS.inProgress}`,
        );

        console.log(data);

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

  const handleMapPress = (ev: MapPressEvent) => {
    const { latitude, longitude } = ev.nativeEvent.coordinate;

    console.log(latitude, longitude);

    if (!latitude || !longitude) return;

    setUserMarker({
      latitude,
      longitude,
      latitudeDelta: 5,
      longitudeDelta: 5,
    });
  };

  const handlePressNewEvent = () => {
    if (!userMarker) return;

    const { latitude, longitude } = userMarker;

    const lat = String(latitude);
    const lng = String(longitude);

    setEvent(prevEvent => ({
      ...prevEvent,
      latitude: lat,
      longitude: lng,
    }));

    navigation.navigate('CreateEvent');
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
              latitude: userMarker.latitude,
              longitude: userMarker.longitude,
            }}
          >
            <MapPinLine
              size={32}
              color={theme.COLORS.PURPLE[50]}
              weight="fill"
            />

            <EventInfo onPress={handlePressNewEvent}>
              <EventWrapper>
                <EventTitle numberOfLines={1}>Novo evento</EventTitle>
              </EventWrapper>
            </EventInfo>
          </Marker>
        )}

        {events &&
          events?.map(ev => {
            const imageSource: ImageSourcePropType =
              ev.imagens && ev.imagens.length > 0
                ? { uri: ev.imagens[0].urlImagem }
                : defaultIcon;

            const formattedDate = formatDate(ev.dataInicio, true);

            return (
              <Marker
                key={ev.id}
                coordinate={{
                  longitude: Number(ev.longitude),
                  latitude: Number(ev.latitude),
                }}
                onPress={() => {
                  navigation.navigate('Events', {
                    screen: 'EventDetails',
                    params: { id: ev.id },
                  });
                }}
              >
                <MapPinLine
                  size={32}
                  color={theme.COLORS.PURPLE[50]}
                  weight="fill"
                />

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
