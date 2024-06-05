import { Fragment, useLayoutEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { MainNavigationRoutes } from '@routes/index';
import Toast from 'react-native-toast-message';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

// Type import
import { EventsRoutes } from '..';
import { Event } from '@dtos/event';
import { ImageSourcePropType } from 'react-native';

// Component import
import {
  WrapperPage,
  Button,
  CustomModal,
  WavesContainer
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
  Header,
  EventImage
} from './styles';
import { Flex, ScrollableContent } from '@global/styles';

// Theme import
import theme from '@theme/index';

// Utils import
import { STATUS_OPTIONS } from '@utils/statusOptions';
import { formatDate } from '@utils/format-date';

import UpdateStatus from './UpdateStatus';

// Hooks import
import { useAuth } from '@hooks/useAuth';

// Ui
import Review from './Review';

// Service import
import { api } from '@services/api';

// Asset import
import default_image from "@assets/default_event_image.png";

// Type
type PriorityLabel = {
  [key: number]: string;
}

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
  const [modalTitle, setModalTitle] = useState("");
  const [modalSubtitle, setModalSubtitle] = useState("");

  // const toggleUpdateModal = () => setUpdateModalVisible(modal => !modal);
  // const toggleReviewModal = () => setReviewModalVisible(modal => !modal);

  const { id } = route.params;

  // const updateQuote = async (body: QuoteQuery, id: number, goBack?: boolean) => {
  //   handleUpdateQuote(body, id);
  //   fetchQuotesByBuyer(user.id);
  //   if (goBack) navigation.navigate("QuotesHistory");
  //   toggleUpdateModal();
  // };

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
      }
      finally {
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
    5: 'alta urgência'
  }

  
  const handleCancel = () => {
    setModalTitle("Cancelar");
    setModalSubtitle("Tem certeza que deseja cancelar o evento?");
    // toggleUpdateModal();
  }

  const handleConfirm = () => {
    setModalTitle("Finalizar");
    setModalSubtitle("Tem certeza que deseja finalizar o evento?");
    // toggleUpdateModal();
  }

  const imageSource: ImageSourcePropType = 
    event.imagens && event.imagens.length > 0
      ? { uri: event.imagens[0].urlImagem }
      : default_image;

  return (
    <WrapperPage>
      <ScrollableContent style={{ paddingTop: 10 }}>
        {loading || !event.id ?
            <TextIndicator>Carregando evento...</TextIndicator> 
            : 
            (
              <Fragment>

                <Header>
                  <EventImage source={imageSource}/>
                </Header>

                <WavesContainer fullOpacityWaves>
                  <Container>
                    <Label>{event.titulo}</Label>
                    <Value>{event.descricao}</Value>
                  </Container>

                  <Container>
                    <LabelWrapper>
                      <Icon 
                          name={"map-marker"} 
                          size={theme.FONT_SIZE.XL} 
                          color={theme.COLORS.GRAY[40]} 
                        />
                      <Label>Local</Label>
                      <SmallerLabel>(clique para direções)</SmallerLabel>
                    </LabelWrapper>
                    <Value>{event.latitude}, {event.longitude}</Value>
                  </Container>

                  <Container>
                    <LabelWrapper>
                      <Label>Imagens</Label>
                    </LabelWrapper>
                  </Container>

                  {event.dataInicio && (
                    <Container>
                      <LabelWrapper>
                        <Icon 
                            name={"calendar"} 
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
                            name={"calendar"} 
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

                  <Container>
                    <Label>Urgência</Label>
                    <Value>{event.urgencia}: {priorityLabel[event.urgencia]}</Value>
                  </Container>

                  <Container>
                    {event.organizador ? (
                      <Value>Tem organizador</Value>
                    ) : (
                      <Fragment>
                        <Value>O evento ainda não possui um organizador, portanto ainda não tem participantes nem data marcada. Gostaria de marcar uma data?</Value>
                        <Value>Isso também tornaria sua responsabilidade tirar fotos do depois para mostrar inspirar mais eventos voluntários e trazer mais visibilidade à causa!</Value>
                      </Fragment>
                    )}
                  </Container>

                  {/* <Actions>
                    {retrievedQuote.status.id !== STATUS_OPTIONS.closed && 
                     retrievedQuote.status.id !== STATUS_OPTIONS.concluded && (
                      <Button 
                        label="Cancelar"
                        size="SM"
                        backgroundColor={theme.COLORS.RED_DARK}
                        onPress={() => handleCancel()}
                      />
                    )}
                    
                    {retrievedQuote.status.id === STATUS_OPTIONS.approved && (
                      <Button 
                        label="Concluir"
                        size="SM"
                        backgroundColor={theme.COLORS.GREEN_800}
                        onPress={() => handleConfirm()}
                      />
                    )}
                  </Actions> */}

                  {/* {retrievedQuote.status.id === STATUS_OPTIONS.concluded && (
                    <Button 
                      label='Avaliar'
                      icon={
                        <Icon 
                          name="star-shooting" 
                          size={theme.FONT_SIZE.XL} 
                          color={theme.COLORS.WHITE} 
                        />
                      }
                      style={{
                        marginBottom: 40
                      }}
                      onPress={() => toggleReviewModal()}
                    />
                  )} */}
                </WavesContainer>
              </Fragment>
            )
        }
      </ScrollableContent>

      {/* <CustomModal
        modalProps={{ isVisible: isUpdateModalVisible }}
        title={`${modalTitle} cotação`}
        subtitle={modalSubtitle}
        onClose={toggleUpdateModal}
      >
        <UpdateStatus 
          modalTitle={modalTitle} 
          quote={retrievedQuote}
          handleUpdateQuote={updateQuote}
        />
      </CustomModal>

      <CustomModal
        modalProps={{ isVisible: isReviewModalVisible }}
        title={`O que você achou do fornecedor?`}
        subtitle="Isso ajuda nosso sistema a escolher sempre os melhores fornecedores aos nossos usuários"
        onClose={toggleReviewModal}
      >
        <Review 
          quote={retrievedQuote}
          toggleReviewModal={toggleReviewModal} 
        />
      </CustomModal> */}
    </WrapperPage>
  );
}
