import { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

// Type import
import { MainNavigationRoutes } from '@routes/index';
import { CreateEventRoutes } from '..';

// Component import
import {
  Button,
  DefaultComponent,
  WavesContainer,
  WrapperPage,
} from '@components/index';

// Style import
import { ScrollableContent } from '@global/styles/index';
import { SelectImage } from './SelectImage';
import { Image, ImageWrapper, ImagesContainer, RemoveImage } from './styles';
import { Trash } from 'phosphor-react-native';

export const Step2: React.FC<
  CompositeScreenProps<
    NativeStackScreenProps<CreateEventRoutes, 'Step2'>,
    NativeStackScreenProps<MainNavigationRoutes>
  >
> = ({ navigation }) => {
  const [images, setImages] = useState<string[]>([]);

  const onSubmit = () => {
    if (images.length < 2) {
      return Toast.show({
        type: 'error',
        text1: 'Selecione pelo menos duas imagem',
        text2: 'Imagens impactantes dão credibilidade e atraem voluntários.',
      });
    }

    return navigation.navigate('Step3');
  };

  return (
    <WrapperPage>
      <ScrollableContent>
        <DefaultComponent
          headerProps={{ goBack: () => navigation.goBack() }}
          highlightProps={{
            title: 'Evidências, compartilhe imagens atual do local.',
            highlightedText: 'compartilhe imagens atual do local.',
            subtitle: 'Passo 2 de 3',
          }}
        />

        <WavesContainer>
          <ImagesContainer>
            {images.map((image, index) => (
              <ImageWrapper key={image}>
                <Image source={{ uri: image }} />
                <RemoveImage
                  onPress={() =>
                    setImages(previousState =>
                      previousState.filter((_, i) => i !== index),
                    )
                  }
                >
                  <Trash size={23} color="#fff" />
                </RemoveImage>
              </ImageWrapper>
            ))}
          </ImagesContainer>

          <SelectImage
            handleSetImage={image =>
              setImages(previousState => [...previousState, image])
            }
          />
        </WavesContainer>
      </ScrollableContent>

      <Button label="Continuar" size="XL" onPress={onSubmit} />
    </WrapperPage>
  );
};
