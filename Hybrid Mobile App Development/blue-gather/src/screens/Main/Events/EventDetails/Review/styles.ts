import styled from 'styled-components/native';

export const Label = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  margin-bottom: 5px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.PT_SANS_NARROW.BOLD};
  color: ${({ theme }) => theme.COLORS.GRAY[40]};
`;

export const StarButton = styled.TouchableOpacity`
  font-size: ${({ theme }) => theme.FONT_SIZE.XXL}px;
`;

export const StarsContainer = styled.View`
  margin-bottom: 15px;
`;