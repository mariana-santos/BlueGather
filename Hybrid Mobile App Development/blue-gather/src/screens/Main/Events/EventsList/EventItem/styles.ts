import { EventIcon } from '@screens/Main/Home/styles';
import styled from 'styled-components/native';

export const Container = styled.Pressable`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.BLUE[10]};
  padding: 10px 0;
`;

export const Icon = styled(EventIcon)`
  width: 75px;
  height: 75px;
  border: none;
`;

export const EventTitle = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.PT_SANS_NARROW.BOLD};
  color: ${({ theme }) => theme.COLORS.GRAY[40]};
`;

export const EventStatus = styled(EventTitle)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.OPEN_SANS.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.XXS}px;
  color: ${({ theme }) => theme.COLORS.GRAY[40]};
`;

export const EventDescription = styled(EventStatus)`
  font-size: ${({ theme }) => theme.FONT_SIZE.XS}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.OPEN_SANS.REGULAR};
`;

export const EventDate = styled(EventDescription)`
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.OPEN_SANS.BOLD};
  color: ${({ theme }) => theme.COLORS.GRAY[30]};
`;

export const Section = styled.View<{ start?: boolean; end?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;

  align-items: ${props => {
    if (props.end) return 'flex-end';
    return 'flex-start';
  }};

  ${props => props.start && "flex: 2;" }

  gap: 10px;
`;
