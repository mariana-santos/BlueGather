import { ArrowLeft } from 'phosphor-react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;

  margin-top: 20px;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const BackButton = styled.TouchableOpacity`
  flex: 1;
`;

export const Empty = styled.View`
  flex: 1;
`;

export const BackIcon = styled(ArrowLeft).attrs(({ theme }) => ({
  size: theme.FONT_SIZE.XXL,
  color: theme.COLORS.BLUE[50],
}))``;
