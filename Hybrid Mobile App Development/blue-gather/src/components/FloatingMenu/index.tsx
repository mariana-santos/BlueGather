import { useNavigation, useRoute } from '@react-navigation/native';
import { MainRoutesProps, MenuItem } from './MenuItem';

// Style import
import { Container, Menu } from './styles';
import { useEffect, useState } from 'react';
import { MainRoutes } from '@screens/Main';

export function FloatingMenu() {
  const navigation = useNavigation<MainRoutesProps>();
  const route = useRoute();

  const [notShowFloatingMenu, setNotShowFloatingMenu] = useState(false);

  const screensWithoutFloatingMenu: (keyof MainRoutes)[] = ['CreateEvent'];

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      const currentRouteName = route.name as keyof MainRoutes;
      setNotShowFloatingMenu(
        screensWithoutFloatingMenu.includes(currentRouteName),
      );
    });

    return unsubscribe;
  }, [navigation, route]);

  if (notShowFloatingMenu) return;

  return (
    <Container>
      <Menu>
        <MenuItem icon="calendar" screen="Home" />
        <MenuItem icon="map-pin" screen="CreateEvent" />
        <MenuItem icon="user" screen="Profile" />
      </Menu>
    </Container>
  );
}
