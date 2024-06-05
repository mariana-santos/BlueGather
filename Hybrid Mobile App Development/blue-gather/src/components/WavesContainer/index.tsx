import { Fragment } from 'react';
import { ScrollViewProps } from 'react-native';

// Style import
import { Container, Header, Waves } from './styles';

// Asset import
import waves from "@assets/waves.png";
import fullOpWaves from "@assets/full_opacity_waves.png";

interface Props extends ScrollViewProps {
  children: React.ReactNode;
  scrollable?: boolean;
  fullOpacityWaves?: boolean;
}

export function WavesContainer({
  children,
  scrollable = false,
  fullOpacityWaves = false,
  ...rest
}: Props) {

  const wavesSrc = fullOpacityWaves ? fullOpWaves : waves;

  return (
    <Fragment>
      <Header>
        <Waves source={wavesSrc} />
      </Header>
      <Container scrollable={scrollable} {...rest}>
        {children}
      </Container>
    </Fragment>
  );
}
