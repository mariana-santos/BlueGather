import MapView, { Callout } from 'react-native-maps';
import styled from 'styled-components/native';
import { Marker as RNMarker } from 'react-native-maps';

export const Map = styled(MapView)`
  flex: 1;
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY[40]};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.PT_SANS_NARROW.BOLD};
`;

export const EventIcon = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border: solid 1px ${({ theme }) => theme.COLORS.PURPLE[50]};
`;

export const Marker = styled(RNMarker)``;

export const EventInfo = styled(Callout)`
  flex: 1;
  position: relative;
  max-width: 200px;
  display: flex;
  flex-direction: column;
`;

export const EventWrapper = styled.View`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const EventTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.PURPLE[50]};
  font-family: ${({ theme }) => theme.FONT_FAMILY.PT_SANS_NARROW.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
`;

export const EventSubtitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY[40]};
  font-family: ${({ theme }) => theme.FONT_FAMILY.OPEN_SANS.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
`;
