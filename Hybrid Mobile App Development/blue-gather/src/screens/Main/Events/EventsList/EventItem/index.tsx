// Style import
import {
  Container,
  Section,
  Icon,
  EventTitle,
  EventDescription,
  EventStatus,
  EventDate,
} from './styles';

// Type import
import { Event } from '@dtos/event';
import { ImageSourcePropType, PressableProps } from 'react-native';

// Theme import
import theme from '@theme/index';

// Asset import
import defaultIcon from '@assets/default_event_icon.png';

// Util import
import { formatDate } from '@utils/format-date';

interface Item extends PressableProps {
  event: Event;
}

export function EventItem ({ event, ...rest }: Item) {

  const statusColors: { [key: string]: string } = {
    "Aberto": theme.COLORS.FEEDBACK.YELLOW,
    "Finalizado": theme.COLORS.FEEDBACK.GREEN,
    "Cancelado": theme.COLORS.FEEDBACK.RED,
  }

  const currentStatusColor = statusColors[event.status.nome] || theme.COLORS.FEEDBACK.YELLOW;
  
  const imageSource: ImageSourcePropType = 
    event.imagens && event.imagens.length > 0
      ? { uri: event.imagens[0].urlImagem }
      : defaultIcon;

  const formattedDate = formatDate(event.dataInicio);

  return (
    <Container {...rest}>
      <Section>
        <Icon source={imageSource} />
      </Section>

      <Section start>
        <EventTitle numberOfLines={1}>{event.titulo}</EventTitle>
        <EventDescription numberOfLines={2}>{event.descricao}</EventDescription>
      </Section>

      <Section end>
        <EventDate>{formattedDate}</EventDate>
        <EventStatus style={{ color: currentStatusColor }}>{event.status.nome}</EventStatus>
      </Section>
    </Container>
  );
};
