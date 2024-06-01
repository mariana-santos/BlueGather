import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 70px;
  width: 100%;
`;

export const Empty = styled.View`
  flex: 1;
`;

export const Menu = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  background: ${({ theme }) => theme.COLORS.BLUE[5]};
  padding: 2px;
  flex: 2;
`;
