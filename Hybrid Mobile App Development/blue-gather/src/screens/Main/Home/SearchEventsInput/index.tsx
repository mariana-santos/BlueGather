import Icon from '@expo/vector-icons/Feather';

import { Wrapper, Title, SearchContainer, Input, SearchButton } from './styles';

export const SearchEventsInput = () => {
  return (
    <Wrapper>
      <Title>Ajude na limpeza do oceano!</Title>
      <SearchContainer>
        <Input
          placeholder="Buscar um endereço..."
          placeholderTextColor="#2D2C2C"
        />
        <SearchButton>
          <Icon name="search" size={24} color="#FFFFFF" />
        </SearchButton>
      </SearchContainer>
    </Wrapper>
  );
};
