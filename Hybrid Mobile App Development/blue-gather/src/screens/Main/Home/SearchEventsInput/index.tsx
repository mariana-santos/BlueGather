import Icon from '@expo/vector-icons/Feather';
import Toast from 'react-native-toast-message';

// Style import
import { 
  Wrapper, 
  Title, 
  Subtitle,
  SearchContainer, 
  Input, 
  SearchButton, 
  ResultsContainer,
  Result
} from './styles';

// Theme import
import theme from '@theme/index';

// Type import
import { Event } from '@dtos/event';
import { useState } from 'react';

type Props = {
  events: Event[]
}

export const SearchEventsInput = ({ events }: Props) => {

  const [search, setSearch] = useState(""); 
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]); 

  const onSearch = () => {
    if (!events || search === "" || !search) 
      return setFilteredEvents([]);

    const normalizedSearch = search.trim().toLowerCase();

    const foundEvents = events.filter(event => {
      const { descricao, titulo, tipoEvento, organizador } = event;
      const possibleResults = [
        descricao.trim().toLowerCase(),
        titulo.trim().toLowerCase(),
        tipoEvento?.nome.trim().toLowerCase(),
        organizador?.nome.trim().toLowerCase()
      ];

      return possibleResults.some(result => result && result.includes(normalizedSearch));
    });

    setFilteredEvents(foundEvents);
    
    if (foundEvents.length === 0){
      return Toast.show({
        type: 'info',
        text1: 'Opa!',
        text2: 'Nenhum evento encontrado.',
      });
    }
  }

  return (
    <Wrapper>
      <Title>Ajude na limpeza do oceano!</Title>
      <Subtitle>Encontre ou indique lugares que precisam de voluntários para ajudar nessa causa.</Subtitle>
      <SearchContainer>
        <Input
          placeholder="Buscar um evento..."
          placeholderTextColor={theme.COLORS.GRAY[30]}
          onChangeText={text => setSearch(text)}
        />
        <SearchButton onPress={onSearch}>
          <Icon name="search" size={24} color="#FFFFFF" />
        </SearchButton>
        {filteredEvents && filteredEvents.length > 0 && (
          <ResultsContainer>
            {filteredEvents.map((event, index) => (
              <Result 
                last={index === filteredEvents.length - 1} 
                key={event.titulo}
              >
                {event.titulo}
              </Result>
            ))}
          </ResultsContainer>
        )}
      </SearchContainer>

    </Wrapper>
  );
};
