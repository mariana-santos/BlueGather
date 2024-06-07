import { format } from 'date-fns';
import { Text } from '../styles';
import { Container, Image, IconPic } from './styles';

// Asset import
import waves from '@assets/medal.png';

interface MedalProps {
  image: string;
  title: string;
  date: string;
}

const default_image =
  'https://img.freepik.com/psd-premium/imagem-de-erro-icone-3d_158757-3491.jpg?w=740';

export function Medal({ image, date, title }: MedalProps) {
  return (
    <Container>
      <Image source={{ uri: image ?? default_image }} />
      <IconPic source={waves} />

      <Text size="lg" style={{ textAlign: 'center' }}>
        {title}
      </Text>

      <Text size="sm">{format(new Date(date), 'dd/MM/yyyy')}</Text>
    </Container>
  );
}
