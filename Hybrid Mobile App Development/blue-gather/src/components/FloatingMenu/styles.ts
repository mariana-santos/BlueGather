import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 5%;

  width: 100%;
`;

export const Menu = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;

  border-radius: 25px;

  background-color: ${({ theme }) => theme.COLORS.BLUE[0]};

  padding: 2px;
`;
