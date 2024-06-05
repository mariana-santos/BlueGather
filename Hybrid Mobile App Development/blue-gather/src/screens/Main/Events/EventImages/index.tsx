import { Fragment, useLayoutEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { MainNavigationRoutes } from '@routes/index';
import Toast from 'react-native-toast-message';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

// Type import
import { EventsRoutes } from '..';
import { Event } from '@dtos/event';
import { ImageSourcePropType } from 'react-native';

// Component import
import {
  WrapperPage,
  Button,
  CustomModal,
  WavesContainer,
  DefaultComponent
} from '@components/index';

// Style import
import { 
  TextIndicator, 
  Container,
  Label,
  Value,
  Actions,
  LabelWrapper,
  SmallerLabel,
  Header,
  EventImage
} from './styles';
import { Flex, ScrollableContent } from '@global/styles';

// Theme import
import theme from '@theme/index';

export const EventImages: React.FC<
  CompositeScreenProps<
    NativeStackScreenProps<EventsRoutes, 'EventImages'>,
    NativeStackScreenProps<MainNavigationRoutes>
  >
> = ({ route, navigation }) => {

  const { images } = route.params;

  return (
    <WrapperPage>
      <ScrollableContent style={{ paddingTop: 10 }}>
        <DefaultComponent
          highlightProps={{
            title: "Galeria",
            subtitle: "É importante mostrar imagens do evento  para dar credibilidade e atrair mais eventos voluntários!"
          }}
          headerProps={{
            goBack: navigation.goBack
          }}
        />
        <WavesContainer>
          <Value>Imagens</Value>
        </WavesContainer>
      </ScrollableContent>
    </WrapperPage>
  );
}
