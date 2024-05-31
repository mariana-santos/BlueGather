import React, { Fragment, useLayoutEffect, useState } from 'react';
import { CompositeScreenProps, StackActions } from '@react-navigation/native';

// Component import
import { 
  WrapperPage, 
  WavesContainer, 
  Button,
  UserInfo
} from '@components/index';

// Style import
import { ScrollableContent } from '@global/styles';
import { 
  Actions, 
  QuotesWrapper, 
  Title,
  Header,
  NotificationButton
} from './styles';

// Hook import
import { useAuth } from '@hooks/useAuth';

// Type import
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainRoutes } from '..';

// Theme import
import theme from '@theme/index';
import { MainNavigationRoutes } from '@routes/index';
import { Bell } from 'phosphor-react-native';
import { useQuote } from '@hooks/useQuote';

export function Home({
  navigation,
}: CompositeScreenProps<NativeStackScreenProps<MainRoutes, 'Home'>,
  NativeStackScreenProps<MainNavigationRoutes>>) {

  const { user } = useAuth();
  const { quotes, fetchQuotesByBuyer } = useQuote();

  useLayoutEffect(() => {
    fetchQuotesByBuyer(user.id);
  }, []);

  return (
    <WrapperPage>
      <ScrollableContent>
        <WavesContainer scrollable>
          <Fragment>
            <Title>Suas cotações</Title>
          </Fragment>
        </WavesContainer>
      </ScrollableContent>
    </WrapperPage>
  );
}
