import React from 'react';
import Icon from '@expo/vector-icons/Feather';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacityProps } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/index';

// Style import
import { Item } from './styles';

// Theme import
import theme from '@theme/index';
import { MainRoutes } from '@screens/Main';

interface MenuItemProps extends TouchableOpacityProps {
  icon: keyof typeof Feather.glyphMap;
  screen: keyof MainRoutes;
}

export const MenuItem: React.FC<MenuItemProps> = ({ icon, screen }) => {

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
  const route = useRoute();

  const handleNavigate = (screen: string) => {
    navigate('Main', { screen })
  }

  const activeRoute = route.name;
  const isActive = activeRoute === screen;

  return (
    <Item active={isActive} onPress={() => handleNavigate(screen)}>
      <Icon 
        name={icon} 
        size={theme.FONT_SIZE.XL} 
        color={theme.COLORS.GRAY[isActive ? 50 : 40]} 
      />
    </Item>
  );
};
