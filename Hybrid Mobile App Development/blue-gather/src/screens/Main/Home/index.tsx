import { useEffect, useState } from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { Marker, Region } from 'react-native-maps';
import { 
  requestForegroundPermissionsAsync, 
  getCurrentPositionAsync 
} from 'expo-location';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Component import
import { WrapperPage } from '@components/index';

// Style import
import { 
  Content, 
  EventIcon, 
  EventInfo,
  EventSubtitle, 
  EventTitle, 
  EventWrapper, 
  Map 
} from './styles';

// Type import
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainRoutes } from '..';
import { Event } from '@dtos/event';
import { ImageSourcePropType } from 'react-native';

// Theme import
import { MainNavigationRoutes } from '@routes/index';

// Service import
import { api } from '@services/api';

// Asset import
import defaultIcon from '@assets/default_event_icon.png';
import { FloatingMenu } from '@components/FloatingMenu';

export function Home({
  navigation,
}: CompositeScreenProps<NativeStackScreenProps<MainRoutes, 'Home'>,
  NativeStackScreenProps<MainNavigationRoutes>>) {

  const [currentRegion, setCurrentRegion] = useState<Region>();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadInitialPosition = async () => {
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
        })
      }
    }

    loadInitialPosition();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/evento");
        setEvents(data.content);
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: 'Não foi possível buscar os eventos voluntários perto de você',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (!currentRegion) return;



  return (
    <WrapperPage>
      <Content>
        <Map 
          onRegionChangeComplete={(region) => setCurrentRegion(region)} 
          initialRegion={currentRegion}
        >
          {events.map(ev => {
            // const imageSource: ImageSourcePropType = ev?.urlImagem
            //   ? { uri: user?.urlImagem }
            //   : defaultIcon;

            let formattedDate = "";

            if (ev.dataInicio) {
              const parsedDate = parseISO(ev.dataInicio);
              formattedDate = format(parsedDate, "dd/MM 'às' HH'h'mm", { locale: ptBR });
            }

            return (
            <Marker 
              key={ev.id}
              coordinate={{ 
                longitude: Number(ev.longitude),
                latitude: Number(ev.latitude), 
              }}
            >
              <EventIcon source={defaultIcon} />

              <EventInfo >
                <EventWrapper>
                  <EventTitle numberOfLines={1}>{ev.titulo}</EventTitle>
                  <EventSubtitle numberOfLines={2}>
                    {ev.descricao || formattedDate}
                  </EventSubtitle>
                </EventWrapper>
              </EventInfo>
            </Marker>
          )})}
        </Map>
        
      </Content>

      <FloatingMenu />
    </WrapperPage>
  );
}
