import { Header } from '@components/Header';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const EventHeader = styled.View`
  height: 278px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  margin-bottom: -70px;
`;

export const EventImage = styled.Image`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  position: absolute;
  z-index: -1;
`;

export const Back = styled(Header)`
  position: absolute;
  z-index: 2;
  top: 0;
`;

export const ShareButton = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  top: 20px;
  background-color: ${({ theme }) => theme.COLORS.BLUE[50]};
  border-radius: 30px;
  padding: 16px;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.View`
  padding: 20px 0;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.BLUE[10]};
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Label = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
  margin-bottom: 10px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.PT_SANS_NARROW.BOLD};
  color: ${({ theme }) => theme.COLORS.GRAY[40]};
`;

export const SmallerLabel = styled(Label)`
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  text-decoration: underline;
`;

export const LabelWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

export const Value = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.OPEN_SANS.BOLD};
  color: ${({ theme }) => theme.COLORS.GRAY[30]};
`;

export const BiggerValue = styled(Value)`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
`;

export const Actions = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 60px;
`;

export const TextIndicator = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme}) => theme.FONT_FAMILY.PT_SANS_NARROW.BOLD};
  color: ${({ theme}) => theme.COLORS.GRAY[30]};
  margin-top: 50px;
  text-align: center;
`;
