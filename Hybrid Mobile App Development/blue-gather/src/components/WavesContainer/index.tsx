import { Fragment } from 'react';
import { ScrollViewProps } from 'react-native';

// Style import
import { Container, Header, Waves } from './styles';

// Asset import
import waves from "@assets/waves.png";

interface Props extends ScrollViewProps {
  children: React.ReactNode;
  scrollable?: boolean;
}

export function WavesContainer({
  children,
  scrollable = false,
  ...rest
}: Props) {
  return (
    <Fragment>
      <Header source={waves}>
        <Waves source={waves} />
      </Header>
      <Container scrollable={scrollable} {...rest}>
        {children}
      </Container>
    </Fragment>
  );
}
