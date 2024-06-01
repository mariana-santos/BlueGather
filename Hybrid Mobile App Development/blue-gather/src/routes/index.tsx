import React, { Fragment, useMemo } from 'react';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';

// Hook import
import { AuthProvider, useAuth } from '@hooks/useAuth';

// Screen import
import { SignIn } from '@screens/SignIn';
import { SignUp } from '@screens/SignUp';
import { CreateQuote } from '@screens/CreateQuote';
import { Main, MainRoutes } from '@screens/Main';

export type MainNavigationRoutes = {
  SignIn: undefined;
  SignUp: undefined;
  CreateQuote: undefined;
  Main: NavigatorScreenParams<MainRoutes> | undefined;
};

export type AppNavigatorRoutesProps =
  NativeStackNavigationProp<MainNavigationRoutes>;

export default function Routes() {
  // Hook
  const { user } = useAuth();

  // Navigator instance
  const Stack = createNativeStackNavigator<MainNavigationRoutes>();

  const logged = user?.email;

  const initialMainRoute = useMemo<keyof MainNavigationRoutes>(() => {
    if (logged) return 'Main';

    return 'SignIn';
  }, []);

  // Componente Navigator
  const MainNavigation = useMemo(() => {
    const Navigator: React.FC = () => (
      <Stack.Navigator
        initialRouteName={initialMainRoute}
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          animation: 'slide_from_right',
        }}
      >
        {!logged && (
          <Fragment>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Fragment>
        )}

        <Stack.Screen name="CreateQuote" component={CreateQuote} />
        <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
    );

    return <Navigator />;
  }, [initialMainRoute]);

  return (
    <NavigationContainer>
      <AuthProvider>
        {MainNavigation}
      </AuthProvider>
    </NavigationContainer>
  );
}
