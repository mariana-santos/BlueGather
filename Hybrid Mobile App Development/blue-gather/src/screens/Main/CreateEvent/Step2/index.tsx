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

// Storage
import { getDownloadURL, ref, storage, uploadBytes } from '@services/firebaseConfig';

// Hook import
import { useCreateEvent } from '@hooks/useCreateEvent';

export const Step2: React.FC<
  CompositeScreenProps<
    NativeStackScreenProps<CreateEventRoutes, 'Step2'>,
    NativeStackScreenProps<MainNavigationRoutes>
  >
> = ({ navigation }) => {
  const [images, setImages] = useState<string[]>([]);
  const { setImagesUrl } = useCreateEvent();

  const uploadImage = async (imageUri: string) => {
    const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
    const storageRef = ref(storage, `images/${filename}`);
    const response = await fetch(imageUri);
    const blob = await response.blob();
  
    try {
      const snapshot = await uploadBytes(storageRef, blob);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return downloadUrl;
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Não foi possível fazer o upload das imagens',
      });
      return null;
    }
  };

  const onSubmit = async () => {
    if (images.length < 1) {
      return Toast.show({
        type: 'error',
        text1: 'Selecione pelo menos uma imagem',
        text2: 'Imagens impactantes dão credibilidade e atraem voluntários.',
      });
    }

    try {
      const uploadedImagesPromises = images.map(image => uploadImage(image));
      const uploadedImages = await Promise.all(uploadedImagesPromises);
  
      const validUploadedImages: string[] = uploadedImages.filter((url): url is string => url !== null);
      setImagesUrl(validUploadedImages);
  
      navigation.navigate('Step3');
    } catch (error) {
      console.error('Erro durante o upload de imagens:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro durante o upload de imagens',
        text2: 'Por favor, tente novamente mais tarde.',
      });
    }
  };

  return (
    <WrapperPage>
      <ScrollableContent>
        <DefaultComponent
          headerProps={{ goBack: () => navigation.goBack() }}
          highlightProps={{
            title: 'Evidências',
            subtitle: 'É importante mostrar imagens relacionadas ao evento para dar credibilidade e atrair mais voluntários!',
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
