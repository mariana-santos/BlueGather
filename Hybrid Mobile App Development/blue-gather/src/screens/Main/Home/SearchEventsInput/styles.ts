import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Wrapper = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 10px;

  position: absolute;
  top: 5%;

  width: 100%;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY[50]};
  font-family: ${({ theme }) => theme.FONT_FAMILY.PT_SANS_NARROW.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
  margin-bottom: 8px;
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  gap: 16px;
  align-items: center;
  border-radius: 25px;
  padding: 8px;
`;

export const Input = styled.TextInput`
  flex: 1;
  padding: 8px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.COLORS.BLUE[0]};

  border-radius: 30px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.COLORS.BLUE[50]};

  padding: 16px;

  color: #000;
`;

export const SearchButton = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.COLORS.BLUE[50]};
  border-radius: 30px;

  padding: 16px;

  justify-content: center;
  align-items: center;
`;
