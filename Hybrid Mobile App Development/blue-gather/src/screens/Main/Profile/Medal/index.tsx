import { Text } from '../styles';
import { Container, Image, IconPic } from './styles';

// Asset import
import waves from '@assets/medal.png';

export function Medal() {
  const mock_url =
    'https://imgs.search.brave.com/HeoMfEpb3Qi_rFFTEgByyJOS5y_SqT8K9VWb56jORyA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/aWxoYWJlbGEuY29t/LmJyL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDEyLzExL3ByYWlh/LWdyYW5kZS1pbGhh/YmVsYS0wMS1lMTYw/MDIxMTEzMzQ1Ni5q/cGVn';

  return (
    <Container>
      <Image source={{ uri: mock_url }} />
      <IconPic source={waves} />

      <Text size="lg">Praia grande</Text>
      <Text size="sm">26/10/23</Text>
    </Container>
  );
}
