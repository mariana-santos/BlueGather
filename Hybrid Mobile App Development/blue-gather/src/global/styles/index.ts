import styled from 'styled-components/native';

export const ScrollableContent = styled.ScrollView`
  padding-top: 20px;

  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
`;

export const AlertText = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_300};
  font-family: ${({ theme }) => theme.FONT_FAMILY.OPEN_SANS.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;

  margin-bottom: 30px;
`;

export const Fieldset = styled.View`
  width: 100%;

  margin-bottom: 20px;
`;

export const Flex = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  gap: 8px;
`;
