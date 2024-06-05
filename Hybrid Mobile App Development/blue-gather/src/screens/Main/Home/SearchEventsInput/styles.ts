import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type ResultProps = {
  last?: boolean;
}

export const Wrapper = styled(LinearGradient).attrs(() => ({
  colors: ["#45A1C2", "#45A1C2BF", "transparent"],
}))`
  display: flex;
  justify-content: center;

  padding: 50px 20px;

  position: absolute;
  top: 0;

  width: 100%;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY[50]};
  font-family: ${({ theme }) => theme.FONT_FAMILY.PT_SANS_NARROW.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.XXL}px;
  margin-bottom: 8px;
`;

export const Subtitle = styled(Title)`
  color: ${({ theme }) => theme.COLORS.GRAY[50]};
  font-family: ${({ theme }) => theme.FONT_FAMILY.OPEN_SANS.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  margin-bottom: 8px;
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  gap: 16px;
  align-items: center;
  border-radius: 25px;
  margin-top: 10px;
`;

export const Input = styled.TextInput`
  flex: 1;
  padding: 8px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.COLORS.BLUE[0]};
  font-family: ${({ theme }) => theme.FONT_FAMILY.PT_SANS_NARROW.BOLD};

  border-radius: 30px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.COLORS.BLUE[50]};

  padding: 16px;

  color: ${({ theme }) => theme.COLORS.GRAY[40]};
`;

export const SearchButton = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.COLORS.BLUE[50]};
  border-radius: 30px;

  padding: 16px;

  justify-content: center;
  align-items: center;
`;

export const  ResultsContainer = styled.View`
  background: ${({ theme }) => theme.COLORS.BLUE[0]};
  color: ${({ theme }) => theme.COLORS.GRAY[40]};
  position: absolute;
  top: 60px;
  left: 20px;
  width: 205px;
`;

export const  Result = styled.Text<ResultProps>`
  color: ${({ theme }) => theme.COLORS.GRAY[40]};
  padding: 10px;
  border-style: solid;
  border-color: ${({ theme }) => theme.COLORS.GRAY[10]};
  border-bottom-width: ${({ last }) => !last ? "1px" : "0"};
  font-family: ${({ theme }) => theme.FONT_FAMILY.PT_SANS_NARROW.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
`;