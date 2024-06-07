import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { MainNavigationRoutes } from '@routes/index';

import ViewShot from "react-native-view-shot";

// Type import
import { EventsRoutes } from '..';

// Util import
import { MOMENT_OPTIONS, STATUS_OPTIONS } from '@utils/options';

// Component import
import {
  WrapperPage,
  WavesContainer,
  Header,
  Highlight,
  Button
} from '@components/index';

// Style import
import {
  ImageAfter,
  ImageBefore,
  ImagesContainer,
  Tag
} from './styles';
import { ScrollableContent } from '@global/styles';
import { Fragment, useRef } from 'react';

import * as Sharing from 'expo-sharing';

export const ShareEvent: React.FC<
  CompositeScreenProps<
    NativeStackScreenProps<EventsRoutes, 'ShareEvent'>,
    NativeStackScreenProps<MainNavigationRoutes>
  >
> = ({ route, navigation }) => {

  const { event } = route.params;

  const ref = useRef<ViewShot>(null);

  const isInProgress = event?.status?.id === STATUS_OPTIONS.inProgress;

  const subtitle = !isInProgress ? 
    "Obrigada! Por sua causa o oceano está um pouco menos danificado. (:"
    : 
    "Você está convidado para um evento voluntário para contribuir com a limpeza do oceano!";

  const imageAfter = event.imagens.find(img => img.idMomento === MOMENT_OPTIONS.after);
  const imageBefore = event.imagens.find(img => img.idMomento === MOMENT_OPTIONS.before);

  const handleShare = () => {
    if (ref.current?.capture) {
      ref.current.capture().then(uri => {
        Sharing.shareAsync(uri, {})
      })
    }
  };

  return (
    <WrapperPage>
      <ScrollableContent style={{ paddingTop: 10 }}>
        <ViewShot 
          style={{ backgroundColor: '#fff' }} 
          ref={ref} 
          options={{ fileName: event.titulo, format: "jpg", quality: 1 }}
        >
          <Header goBack={navigation.goBack} /> 
          <Highlight
            title={event.titulo}
            subtitle={subtitle}
          />
          <WavesContainer>
            <ImagesContainer>
              {imageBefore && (
                <Fragment>
                  <ImageBefore source={{ uri: imageBefore.urlImagem }} />
                  <Tag left>Antes</Tag>
                </Fragment>
              )}

              {imageAfter && (
                <Fragment>
                  <ImageAfter source={{ uri: imageAfter.urlImagem }} />
                  <Tag>Depois</Tag>
                </Fragment>
              )}
            </ImagesContainer>

            <Button label='Compartilhe!' onPress={handleShare}/>
          </WavesContainer>          
        </ViewShot>
      </ScrollableContent>
    </WrapperPage>
  );
}
