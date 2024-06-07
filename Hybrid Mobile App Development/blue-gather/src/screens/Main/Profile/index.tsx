import { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, ImageSourcePropType } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';

// Hook import
import { useAuth } from '@hooks/useAuth';

// Component import
import {
  WavesContainer,
  DefaultComponent,
  UserAvatar,
  WrapperPage,
  FloatingMenu,
  Button,
  UserInfo,
} from '@components/index';

// Style import
import { AvatarWrapper, Content, MedalsContainer, Text } from './styles';
import { ScrollableContent } from '@global/styles/index';
import { Medal } from './Medal';
import theme from '@theme/index';
import { api } from '@services/api';
import { Event } from '@dtos/event';

interface ProfileForm {
  email: string;
  senha: string;
}

export function Profile() {
  // Hook
  const { user, handleSignOut } = useAuth();

  // State
  const [avatar, setAvatar] = useState<string | undefined>(user?.urlImagem);
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsLoading, setEventsLoading] = useState(false);

  const imageSource: ImageSourcePropType = avatar
    ? { uri: avatar }
    : require('../../../assets/default_avatar.png');

  useLayoutEffect(() => {
    (async function getMyContributions() {
      if (!user.id) return;

      try {
        setEventsLoading(true);
        const { data } = await api.get(`/evento/voluntario/${user.id}`);
        setEvents(data);
      } catch (error) {
        return Toast.show({
          type: 'error',
          text1: 'Erro!',
          text2: 'Não foi possível encontrar suas contribuições',
        });
      } finally {
        setEventsLoading(false);
      }
    })();
  }, []);

  return (
    <WrapperPage>
      <ScrollableContent>
        <DefaultComponent key="default-component-profile" />

        <AvatarWrapper>
          <UserInfo user={user}/>
        </AvatarWrapper>

        <WavesContainer>
          <Content>
            <Text size="lg">Minhas contribuições</Text>

            {eventsLoading && (
              <ActivityIndicator size={30} color={theme.COLORS.PURPLE[30]} />
            )}

            {!eventsLoading && (
              <Text size="sm">
                {events.length >= 1
                  ? 'Obrigado por todo o seu apoio na nossa causa de amenizar os estragos no oceano! Aqui estão suas medalhas provando que você é um herói! :)'
                  : 'Você não possui contribuições.'}
              </Text>
            )}

            <MedalsContainer>
              {!eventsLoading &&
                events.map(event => (
                  <Medal
                    key={event.titulo}
                    date={event.dataInicio ?? ''}
                    image={event?.imagens[0]?.urlImagem ?? null}
                    title={event.titulo}
                  />
                ))}
            </MedalsContainer>

            <Button
              backgroundColor={theme.COLORS.FEEDBACK.RED}
              style={{ marginTop: 25, marginBottom: 100 }}
              label="Sair"
              icon={
                <Icon
                  name="logout"
                  size={theme.FONT_SIZE.LG}
                  color={theme.COLORS.WHITE}
                />
              }
              onPress={handleSignOut}
            />
          </Content>
        </WavesContainer>
      </ScrollableContent>

      <FloatingMenu />
    </WrapperPage>
  );
}
