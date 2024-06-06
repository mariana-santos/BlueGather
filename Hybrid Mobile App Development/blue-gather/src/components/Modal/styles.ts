import styled from 'styled-components/native';

export const Container = styled.View`
  color: ${({ theme }) => theme.COLORS.WHITE};
  background-color: ${({ theme }) => theme.COLORS.BLUE[0]};
  border-radius: 8px;
  padding: 20px;
`;

export const Header = styled.View`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY[40]};
  font-size: ${({ theme }) => theme.FONT_SIZE.XXL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.PT_SANS_NARROW.BOLD};
  margin-bottom: 12px;
`;

export const Subtitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY[30]};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.OPEN_SANS.REGULAR};
  margin-bottom: 20px;
`;
