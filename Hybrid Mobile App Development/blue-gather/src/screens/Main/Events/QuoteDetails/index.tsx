import { Fragment, useLayoutEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { MainNavigationRoutes } from '@routes/index';
import { Clock } from 'phosphor-react-native';
import { format, parse } from 'date-fns';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

// Type import
import { EventsRoutes } from '..';
import { QuoteQuery } from '@dtos/quote';

// Component import
import {
  WrapperPage,
  DefaultComponent,
  Chip,
  Button,
  CustomModal,
  WavesContainer
} from '@components/index';

// Style import
import { 
  TextIndicator, 
  TimeAgo,
  Container,
  TextIcon,
  Label,
  Value,
  Price,
  Subtitle,
  Tags,
  BiggerValue,
  Actions
} from './styles';
import { Flex, ScrollableContent } from '@global/styles';

// Theme import
import theme from '@theme/index';

// Utils import
import { STATUS_OPTIONS } from '@utils/statusOptions';
import { toMaskedCurrency } from '@utils/masks';

import UpdateStatus from './UpdateStatus';

// Hooks import
import { useAuth } from '@hooks/useAuth';

// Ui
import Review from './Review';

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

  const [showDetails, setShowDetails] = useState(false);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [isReviewModalVisible, setReviewModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalSubtitle, setModalSubtitle] = useState("");

  // const toggleUpdateModal = () => setUpdateModalVisible(modal => !modal);
  // const toggleReviewModal = () => setReviewModalVisible(modal => !modal);

  // const { id } = route.params;

  // const updateQuote = async (body: QuoteQuery, id: number, goBack?: boolean) => {
  //   handleUpdateQuote(body, id);
  //   fetchQuotesByBuyer(user.id);
  //   if (goBack) navigation.navigate("QuotesHistory");
  //   toggleUpdateModal();
  // };

  useLayoutEffect(() => {
    // fetchQuoteById(id);
  }, []);

  const priorityLabel: PriorityLabel = {
    1: 'pouca urgência',
    2: 'média urgência',
    3: 'alta urgência'
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

  return <></>;

  // return (
  //   <WrapperPage>
  //     <ScrollableContent style={{ paddingTop: 10 }}>
  //       {loading || !retrievedQuote.id ?
  //           <TextIndicator>Carregando cotação...</TextIndicator> : 
  //           (
  //             <Fragment>
  //               <DefaultComponent
  //                 highlightProps={{
  //                   title: retrievedQuote.produto.nome,
  //                   subtitle: "Detalhes da cotação de ",
  //                 }}
  //                 headerProps={{ goBack: () => navigation.goBack() }}
  //                 key="default-component-quote-details"
  //               />
  //               <TimeAgo>
  //                 <Clock size={theme.FONT_SIZE.SM} color={theme.COLORS.GRAY_300} />
  //                 <Subtitle>{daysAgoLabel}</Subtitle>
  //               </TimeAgo>

  //               <WavesContainer>
  //                 <Container>
  //                   <Label>Status</Label>
  //                   <Value>{retrievedQuote.status.nome}</Value>
  //                 </Container>

  //                 <Container>
  //                   <Label>Quantidade</Label>
  //                   <Value>{retrievedQuote.quantidadeProduto} unidades</Value>
  //                 </Container>

  //                 <Container>
  //                   <Label>Preço</Label>
  //                   <Flex>
  //                     <Flex>
  //                       <Value>Unidade: </Value>
  //                       <Price>{toMaskedCurrency(retrievedQuote.valorProduto.toFixed(2), true)}</Price>
  //                     </Flex>
  //                     <Flex>
  //                       <Value>Total: </Value>
  //                       <Price>{toMaskedCurrency(total, true)}</Price>
  //                     </Flex>
  //                   </Flex>
  //                 </Container>

  //                 <Container>
  //                   <Label>Departamento</Label>
  //                   <TextIcon>
  //                     <Icon 
  //                       name={retrievedQuote.produto.departamento.icone} 
  //                       size={theme.FONT_SIZE.SM} 
  //                       color={theme.COLORS.PRIMARY} 
  //                     />
  //                     <Value>{retrievedQuote.produto.departamento.nome}</Value>
  //                   </TextIcon>
  //                 </Container>

  //                 {retrievedQuote.produto.tags.length > 0 && (
  //                   <Container>
  //                     <Label>Tags</Label>
  //                     <Tags>
  //                       {retrievedQuote.produto.tags.map(tag => <Chip key={tag.id} value={tag.nome} />)}
  //                     </Tags>
  //                   </Container>
  //                 )}

  //                 <Container>
  //                   <Label>Prioridade</Label>

  //                   <Value>
  //                     <BiggerValue>Preço baixo</BiggerValue>{'\n'}
  //                     {retrievedQuote.prioridadePreco}: {priorityLabel[retrievedQuote.prioridadePreco]}
  //                   </Value>
  //                   <Value>
  //                     <BiggerValue>Qualidade</BiggerValue>{'\n'}
  //                     {retrievedQuote.prioridadeQualidade}: {priorityLabel[retrievedQuote.prioridadeQualidade]}
  //                   </Value>
  //                   <Value>
  //                     <BiggerValue>Entrega</BiggerValue>{'\n'}
  //                     {retrievedQuote.prioridadeEntrega}: {priorityLabel[retrievedQuote.prioridadeEntrega]}
  //                   </Value>
  //                 </Container>

  //                 {showDetails && (
  //                   <QuoteInfo quote={retrievedQuote} />
  //                 )}

  //                 {hasDetails && (
  //                   <Button 
  //                     label={`${showDetails ? "Menos" : "Mais"} detalhes`}
  //                     type="secondary"
  //                     size="LG"
  //                     onPress={() => setShowDetails(!showDetails)}
  //                     iconFirst={showDetails}
  //                     icon={
  //                       <Icon 
  //                         name={showDetails ? "chevron-up" : "chevron-down"}
  //                         size={theme.FONT_SIZE.XXL}
  //                         color={theme.COLORS.PRIMARY_LIGHTER}
  //                       />
  //                     }
  //                   />
  //                 )}

  //                 <Actions>
  //                   {retrievedQuote.status.id !== STATUS_OPTIONS.closed && 
  //                    retrievedQuote.status.id !== STATUS_OPTIONS.concluded && (
  //                     <Button 
  //                       label="Cancelar"
  //                       size="SM"
  //                       backgroundColor={theme.COLORS.RED_DARK}
  //                       onPress={() => handleCancel()}
  //                     />
  //                   )}
                    
  //                   {retrievedQuote.status.id === STATUS_OPTIONS.approved && (
  //                     <Button 
  //                       label="Concluir"
  //                       size="SM"
  //                       backgroundColor={theme.COLORS.GREEN_800}
  //                       onPress={() => handleConfirm()}
  //                     />
  //                   )}
  //                 </Actions>

  //                 {retrievedQuote.status.id === STATUS_OPTIONS.concluded && (
  //                   <Button 
  //                     size='MD' 
  //                     label='Avaliar fornecedor'
  //                     icon={
  //                       <Icon 
  //                         name="star-shooting" 
  //                         size={theme.FONT_SIZE.XL} 
  //                         color={theme.COLORS.WHITE} 
  //                       />
  //                     }
  //                     style={{
  //                       marginBottom: 40
  //                     }}
  //                     onPress={() => toggleReviewModal()}
  //                   />
  //                 )}
  //               </WavesContainer>
  //             </Fragment>
  //           )
  //       }
  //     </ScrollableContent>

  //     <CustomModal
  //       modalProps={{ isVisible: isUpdateModalVisible }}
  //       title={`${modalTitle} cotação`}
  //       subtitle={modalSubtitle}
  //       onClose={toggleUpdateModal}
  //     >
  //       <UpdateStatus 
  //         modalTitle={modalTitle} 
  //         quote={retrievedQuote}
  //         handleUpdateQuote={updateQuote}
  //       />
  //     </CustomModal>

  //     <CustomModal
  //       modalProps={{ isVisible: isReviewModalVisible }}
  //       title={`O que você achou do fornecedor?`}
  //       subtitle="Isso ajuda nosso sistema a escolher sempre os melhores fornecedores aos nossos usuários"
  //       onClose={toggleReviewModal}
  //     >
  //       <Review 
  //         quote={retrievedQuote}
  //         toggleReviewModal={toggleReviewModal} 
  //       />
  //     </CustomModal>
  //   </WrapperPage>
  // );
}
