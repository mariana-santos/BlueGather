import { Image } from 'phosphor-react-native';
import * as ImagePicker from 'expo-image-picker';

// Theme import
import theme from '@theme/index';

// Style import
import { Container } from './styles';

interface Props {
  handleSetImage: (uri: string) => void;
}

export function SelectImage({ handleSetImage }: Props) {
  async function handleSelectImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 5],
      quality: 1,
      base64: true,
    });

    if (!result.canceled && handleSetImage) {
      handleSetImage(result.assets[0].uri);
    }
  }

  return (
    <Container 
      onPress={handleSelectImage} 
      activeOpacity={0.7}>
      <Image 
        size={theme.FONT_SIZE.XL} 
        color={theme.COLORS.GRAY[50]} 
      />
    </Container>
  );
}
