import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { MainNavigationRoutes } from '@routes/index';

// Type import
import { EventsRoutes } from '..';

// Util import
import { MOMENT_OPTIONS, STATUS_OPTIONS } from '@utils/options';

// Component import
import {
  WrapperPage,
  WavesContainer,
  DefaultComponent
} from '@components/index';

// Style import
import {
  Label,
} from './styles';
import { ScrollableContent } from '@global/styles';

// Theme import
import { 
  ImageWrapper, 
  ImagesContainer, 
  Image 
} from '@screens/Main/CreateEvent/Step2/styles';
import { Fragment } from 'react/jsx-runtime';

export const EventImages: React.FC<
  CompositeScreenProps<
    NativeStackScreenProps<EventsRoutes, 'EventImages'>,
    NativeStackScreenProps<MainNavigationRoutes>
  >
> = ({ route, navigation }) => {

  const { images } = route.params;

  const before = images.filter(img => img.idMomento === MOMENT_OPTIONS.before);
  const after = images.filter(img => img.idMomento === MOMENT_OPTIONS.after);
  const during = images.filter(img => img.idMomento === MOMENT_OPTIONS.during);

  return (
    <WrapperPage>
      <ScrollableContent style={{ paddingTop: 10 }}>
        <DefaultComponent
          highlightProps={{
            title: "Galeria",
            subtitle: "Veja as imagens do evento e se inspire para os próximos!"
          }}
          headerProps={{
            goBack: navigation.goBack
          }}
        />
        <WavesContainer>
          {before.length > 0 && (
            <Fragment>
              <Label>Antes</Label>
              <ImagesContainer>
                {before.map((image, index) => {
                  return (
                    <ImageWrapper key={image.id}>
                      <Image source={{ uri: image.urlImagem }} />
                    </ImageWrapper>
                  );
                })}
              </ImagesContainer>
            </Fragment>
          )}
          
          {during.length > 0 && (
            <Fragment>
              <Label>Durante</Label>
              <ImagesContainer>
                {during.map((image, index) => {
                  return (
                    <ImageWrapper key={image.id}>
                      <Image source={{ uri: image.urlImagem }} />
                    </ImageWrapper>
                  );
                })}
              </ImagesContainer>
            </Fragment>
          )}

          {after.length > 0 && (
            <Fragment>
              <Label>Depois</Label>
                <ImagesContainer>
                  {after.map((image, index) => {
                    return (
                      <ImageWrapper key={image.id}>
                        <Image source={{ uri: image.urlImagem }} />
                      </ImageWrapper>
                    );
                  })}
                </ImagesContainer>
            </Fragment>
          )}

          
        </WavesContainer>
      </ScrollableContent>
    </WrapperPage>
  );
}
