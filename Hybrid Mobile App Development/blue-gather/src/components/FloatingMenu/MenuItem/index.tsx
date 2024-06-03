import React, { useEffect } from 'react';
import Icon from '@expo/vector-icons/Feather';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacityProps } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Style import
import { Item } from './styles';

// Theme import
import theme from '@theme/index';
import { MainRoutes } from '@screens/Main';

export type MainRoutesProps = NativeStackNavigationProp<MainRoutes>;

interface MenuItemProps extends TouchableOpacityProps {
  icon: keyof typeof Feather.glyphMap;
  screen: keyof MainRoutes;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  screen,
  ...rest
}) => {
  const navigation = useNavigation<MainRoutesProps>();
  const route = useRoute();

  const activeRoute = route.name;
  const isActive = activeRoute === screen;

  const iconColor = isActive ? theme.COLORS.BLUE[0] : theme.COLORS.GRAY[40];

  return (
    <Item
      active={isActive}
      onPress={() => navigation.navigate(screen)}
      activeOpacity={0.7}
      {...rest}
    >
      <Icon name={icon} size={theme.FONT_SIZE.XL} color={iconColor} />
    </Item>
  );
};
