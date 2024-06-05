import styled from 'styled-components/native';

export const EventsWrapper = styled.View`
  padding-bottom: 50px;
`;

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  gap: 50px;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

export const TextIndicator = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme}) => theme.FONT_FAMILY.PT_SANS_NARROW.BOLD};
  color: ${({ theme}) => theme.COLORS.GRAY[30]};
  text-align: center;
`;
