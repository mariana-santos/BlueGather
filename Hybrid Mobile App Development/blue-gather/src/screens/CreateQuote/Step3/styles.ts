import styled from 'styled-components/native';

export const LightText = styled.Text`
  /* color: ${({ theme }) => theme.COLORS.GRAY_300}; */
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.OPEN_SANS.REGULAR};

  margin-top: 15px;

  text-align: left;
`;

export const LightBoldText = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.OPEN_SANS.BOLD};
`;

export const Label = styled.Text`
  /* color: ${({ theme }) => theme.COLORS.GRAY_300}; */
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.OPEN_SANS.REGULAR};

  margin-left: 15px;
`;