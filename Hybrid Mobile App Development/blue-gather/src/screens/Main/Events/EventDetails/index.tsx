import { Fragment, useLayoutEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { MainNavigationRoutes } from '@routes/index';
import Toast from 'react-native-toast-message';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

// Type import
import { EventsRoutes } from '..';
import { Event, EventQuery } from '@dtos/event';
import { ImageSourcePropType, Share } from 'react-native';

// Component import
import {
  WrapperPage,
  Button,
  CustomModal,
  WavesContainer,
  UserInfo,
} from '@components/index';

// Style import
import {
  TextIndicator,
  Container,
  Label,
  Value,
  Actions,
  LabelWrapper,
  SmallerLabel,
  EventImage,
  EventHeader,
  Back,
  ShareButton,
} from './styles';
import { Flex, ScrollableContent } from '@global/styles';

// Theme import
import theme from '@theme/index';

// Utils import
import { STATUS_OPTIONS } from '@utils/options';
import { formatDate } from '@utils/format-date';

import UpdateStatus from './UpdateStatus';

// Hooks import
import { useAuth } from '@hooks/useAuth';

// Ui
import Review from './Review';

// Service import
import { api } from '@services/api';

// Asset import
import default_image from '@assets/default_event_image.png';

// Type
type PriorityLabel = {
  [key: number]: string;
};

export const EventDetails: React.FC<
  CompositeScreenProps<
    NativeStackScreenProps<EventsRoutes, 'EventDetails'>,
    NativeStackScreenProps<MainNavigationRoutes>
  >
> = ({ route, navigation }) => {
  const { user } = useAuth();

  const [event, setEvent] = useState<Event>({} as Event);
  const [loading, setLoading] = useState(true);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [isReviewModalVisible, setReviewModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalSubtitle, setModalSubtitle] = useState('');
  const [changeStatusLoading, setChangeStatusLoading] = useState(false);

  const toggleUpdateModal = () => setUpdateModalVisible(modal => !modal);
  const toggleReviewModal = () => setReviewModalVisible(modal => !modal);

  const { id } = route.params;

  const handleUpdateEvent = async (body: EventQuery, id: number) => {
    try {
      setChangeStatusLoading(true);
      const { data } = await api.put(`/evento/${id}`, body);

      if (data.id) {
        Toast.show({
          type: 'success',
          text1: 'Evento atualizado com sucesso',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Não foi possível atualizar o evento',
      });
    } finally {
      setChangeStatusLoading(false);
      navigation.navigate('EventList');
      toggleUpdateModal();
    }
  };

  useLayoutEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await api.get(`/evento/${id}`);
        setEvent(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: 'Não foi possível buscar o evento.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, []);

  const priorityLabel: PriorityLabel = {
    1: 'pouca urgência',
    2: 'pouca urgência',
    3: 'média urgência',
    4: 'alta urgência',
    5: 'alta urgência',
  };

  const handleCancel = () => {
    setModalTitle('Cancelar');
    setModalSubtitle('Tem certeza que deseja cancelar o evento?');
    toggleUpdateModal();
  };

  const handleConfirm = () => {
    setModalTitle('Finalizar');
    setModalSubtitle('Tem certeza que deseja finalizar o evento?');
    toggleUpdateModal();
  };

  const imageSource: ImageSourcePropType =
    event.imagens && event.imagens.length > 0
      ? { uri: event.imagens[0].urlImagem }
      : default_image;

  const handleShare = () => {
    navigation.navigate('ShareEvent', { event: event });
  };

  const isCancelled = event?.status?.id === STATUS_OPTIONS.cancelled;
  const isInProgress = event?.status?.id === STATUS_OPTIONS.inProgress;

  console.log('teste: ', event);

  const isOrganizer = event?.organizador?.id === user.id;

  return (
    <WrapperPage>
      <ScrollableContent>
        {loading || !event.id ? (
          <TextIndicator>Carregando evento...</TextIndicator>
        ) : (
          <Fragment>
            <EventHeader>
              <EventImage source={imageSource} />
              <Back goBack={() => navigation.goBack()} />
              <ShareButton onPress={handleShare}>
                <Icon
                  name="share"
                  size={theme.FONT_SIZE.XL}
                  color={theme.COLORS.WHITE}
                />
              </ShareButton>
            </EventHeader>

            <WavesContainer fullOpacityWaves>
              <Container>
                <Label>{event.titulo}</Label>
                {event.descricao && <Value>{event.descricao}</Value>}
              </Container>

              <Container>
                <LabelWrapper>
                  <Icon
                    name={'map-marker'}
                    size={theme.FONT_SIZE.XL}
                    color={theme.COLORS.GRAY[40]}
                  />
                  <Label>Local</Label>
                  <SmallerLabel>(clique para direções)</SmallerLabel>
                </LabelWrapper>
                <Value>
                  {event.latitude}, {event.longitude}
                </Value>
              </Container>

              {event.imagens.length > 0 && (
                <Container>
                  <Flex>
                    <Label>Imagens</Label>

                    <Button
                      size="SM"
                      label="Ver imagens"
                      backgroundColor={theme.COLORS.PURPLE[10]}
                      onPress={() =>
                        navigation.navigate('EventImages', {
                          images: event.imagens,
                        })
                      }
                    />
                  </Flex>
                </Container>
              )}

              {event.dataInicio && (
                <Container>
                  <LabelWrapper>
                    <Icon
                      name={'calendar'}
                      size={theme.FONT_SIZE.XL}
                      color={theme.COLORS.GRAY[40]}
                    />
                    <Label>Início</Label>
                  </LabelWrapper>
                  <Value>{formatDate(event.dataInicio)}</Value>
                </Container>
              )}

              {event.dataFim && (
                <Container>
                  <LabelWrapper>
                    <Icon
                      name={'calendar'}
                      size={theme.FONT_SIZE.XL}
                      color={theme.COLORS.GRAY[40]}
                    />
                    <Label>Fim</Label>
                    <SmallerLabel>(previsto)</SmallerLabel>
                  </LabelWrapper>
                  <Value>{formatDate(event.dataFim)}</Value>
                </Container>
              )}

              <Container>
                <Label>Tipo</Label>
                <Value>{event.tipoEvento.nome}</Value>
              </Container>

              {event.urgencia && (
                <Container>
                  <Label>Urgência</Label>
                  <Value>
                    {event.urgencia}: {priorityLabel[event.urgencia]}
                  </Value>
                </Container>
              )}

              <Container>
                {event.organizador ? (
                  <Fragment>
                    <Label>Organizador</Label>
                    <UserInfo user={event.organizador} />
                  </Fragment>
                ) : !isCancelled ? (
                  <Fragment>
                    <Value>
                      O evento ainda não possui um organizador, portanto ainda
                      não tem participantes nem data marcada. Gostaria de marcar
                      uma data?
                    </Value>
                    <Value>
                      Isso também tornaria sua responsabilidade tirar fotos para
                      inspirar mais eventos voluntários e trazer mais
                      visibilidade à causa!
                    </Value>
                  </Fragment>
                ) : (
                  <Value>Evento cancelado</Value>
                )}
              </Container>

              <Actions>
                {isInProgress && isOrganizer && (
                  <Fragment>
                    <Button
                      label={changeStatusLoading ? 'Carregando...' : 'Concluir'}
                      size="MD"
                      onPress={() => handleConfirm()}
                    />

                    <Button
                      label={changeStatusLoading ? 'Carregando...' : 'Cancelar'}
                      size="MD"
                      backgroundColor={theme.COLORS.FEEDBACK.RED}
                      onPress={() => handleCancel()}
                    />
                  </Fragment>
                )}
              </Actions>

              {event.status.id === STATUS_OPTIONS.concluded && (
                <Button
                  label="Avaliar"
                  icon={
                    <Icon
                      name="star-shooting"
                      size={theme.FONT_SIZE.XL}
                      color={theme.COLORS.WHITE}
                    />
                  }
                  style={{
                    marginBottom: 40,
                  }}
                  onPress={() => toggleReviewModal()}
                />
              )}
            </WavesContainer>
          </Fragment>
        )}
      </ScrollableContent>

      <CustomModal
        modalProps={{ isVisible: isUpdateModalVisible }}
        title={`${modalTitle} evento`}
        subtitle={modalSubtitle}
        onClose={toggleUpdateModal}
      >
        <UpdateStatus
          modalTitle={modalTitle}
          event={event}
          handleUpdateEvent={handleUpdateEvent}
        />
      </CustomModal>

      <CustomModal
        modalProps={{ isVisible: isReviewModalVisible }}
        title={`O que você achou desse evento?`}
        subtitle="Isso ajuda nosso sistema a escolher sempre os melhores eventos aos nossos usuários"
        onClose={toggleReviewModal}
      >
        <Review eventId={event.id} toggleReviewModal={toggleReviewModal} />
      </CustomModal>
    </WrapperPage>
  );
};
