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
  Header,
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

  const toggleUpdateModal = () => setUpdateModalVisible(modal => !modal);
  const toggleReviewModal = () => setReviewModalVisible(modal => !modal);

  const { id } = route.params;

  const handleUpdateEvent = async (body: EventQuery, id: number) => {
    try {
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
    1: 'Baixa urgência',
    2: 'Baixa urgência',
    3: 'Média urgência',
    4: 'Alta urgência',
    5: 'Alta urgência',
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
    Share.share({
      title: 'Vamos fazer a diferença?',
      message: `Oi :) queria te convidar para um evento voluntário para contribuir com a limpeza do oceano!
${event.titulo}
${event.descricao && event.descricao}
${event.dataInicio && formatDate(event.dataInicio, true)}`,
    });
  };

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
                <Value>{event.descricao}</Value>
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
                  <Value>Tem organizador</Value>
                ) : (
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
                )}
              </Container>

              <Actions>
                {event.status.id === STATUS_OPTIONS.inProgress && (
                  <Button
                    label="Concluir"
                    size="SM"
                    onPress={() => handleConfirm()}
                  />
                )}

                {event.status.id !== STATUS_OPTIONS.inProgress &&
                  event.status.id !== STATUS_OPTIONS.concluded && (
                    <Button
                      label="Cancelar"
                      size="SM"
                      backgroundColor={theme.COLORS.FEEDBACK.RED}
                      onPress={() => handleCancel()}
                    />
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

              {event.status.id !== STATUS_OPTIONS.concluded &&
                !event.organizador && (
                  <Button
                    label="Quero organizar o evento"
                    style={{
                      marginBottom: 40,
                    }}
                    onPress={() => toggleReviewModal()}
                  />
                )}

              {event.status.id !== STATUS_OPTIONS.concluded &&
                event.organizador &&
                event.organizador?.id !== user.id && (
                  <Button
                    label={
                      event.voluntarios.includes(user)
                        ? 'Não comparecerei'
                        : 'Vou comparecer'
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
        title={`${modalTitle} cotação`}
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
