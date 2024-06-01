import { MenuItem } from './MenuItem';

// Style import
import { Container, Empty, Menu } from './styles';

export function FloatingMenu() {

  return (
    <Container>
      {/* TODO: trocar pra tela de "meus eventos" quando criada */}
      <Empty />
      <Menu>
        <MenuItem 
          icon="calendar"
          screen="Home" 
        />
        <MenuItem 
          icon="map" 
          screen="Home" 
        />
        <MenuItem 
          icon="user" 
          screen="Profile" 
        />
      </Menu>
      <Empty />
    </Container>
  );
}
