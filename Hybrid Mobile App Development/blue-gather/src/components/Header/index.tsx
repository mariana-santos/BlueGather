// Style import
import { Container, BackButton, BackIcon, Empty } from './styles';

export interface Props {
  goBack?: () => void;
  noPadding?: boolean;
}

export function Header({ goBack, noPadding = false }: Props) {
  return (
    <Container style={{
      paddingHorizontal: noPadding ? 0 : 30 
    }}>
      <BackButton onPress={goBack}>
        {typeof goBack === 'function' && <BackIcon />}
      </BackButton>
      <Empty />
    </Container>
  );
}
