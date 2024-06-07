import styled from 'styled-components/native';

export const Label = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.PT_SANS_NARROW.BOLD};
  color: ${({ theme }) => theme.COLORS.GRAY[30]};
  margin-bottom: 10px;
`;