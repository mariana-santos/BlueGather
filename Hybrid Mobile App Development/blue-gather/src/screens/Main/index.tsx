import React, { useEffect } from 'react';
import { Article, House, IconProps, User, Folders } from 'phosphor-react-native';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import { useRoute } from '@react-navigation/native';

// Theme import
import theme from '@theme/index';

// Hook import
import { useQuoteProposal } from '@hooks/useQuoteProposal';
import { useAuth } from '@hooks/useAuth';
import { QuoteProvider } from '@hooks/useQuote';

// Component import
import { Text } from '@components/Tab';

// Type import
import { MainNavigationRoutes } from '@routes/index';

// Pages import
import { Home } from './Home';
import { Profile } from './Profile';
import { NavigatorScreenParams } from '@react-navigation/native';


// Interfaces
export type MainRoutes = {
  Home: undefined;
  Profile: undefined;
};

export const Main: React.FC<
  BottomTabScreenProps<MainNavigationRoutes, 'Main'>
> = ({ navigation }) => {
  const { proposal, setLastRouteNavigated } = useQuoteProposal();
  const { user } = useAuth();

  const Tab = createBottomTabNavigator<MainRoutes>();

  // const { GRAY_100, GRAY_300 } = theme.COLORS;

  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    // tabBarActiveBackgroundColor: theme.COLORS.PRIMARY_LOW_OPACITY,
    tabBarLabelPosition: "beside-icon",
    tabBarStyle: {
      borderTopWidth: 0,
      height: 70,
      // backgroundColor: theme.COLORS.GRAY_800,
    },
    tabBarItemStyle: { 
      marginVertical: 15,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
      width: "auto",
      flexGrow: 1
    },
    tabBarLabelStyle: {
      fontSize: theme.FONT_SIZE.MD,
      fontFamily: theme.FONT_FAMILY.PT_SANS_NARROW.BOLD,
      color: theme.COLORS.WHITE
    },
  };

  function iconProps(focused: boolean): IconProps {
    return {
      // color: focused ? GRAY_100 : GRAY_300,
      size: theme.FONT_SIZE.XL,
      weight: 'fill',
    };
  }

  return (
    <QuoteProvider>
      <Tab.Navigator initialRouteName="Home" screenOptions={screenOptions}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => <House {...iconProps(focused)} />,
            tabBarLabel: ({ focused }) => focused && <Text label="Início" />,
          }}
        />
        
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) => <User {...iconProps(focused)} />,
            tabBarLabel: ({ focused }) => focused && <Text label="Perfil" />,
          }}
        />
      </Tab.Navigator>
    </QuoteProvider>
  );
};
