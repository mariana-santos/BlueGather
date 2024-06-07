import styled from 'styled-components/native';
import theme from '@theme/index';
import { TextStyle, ViewStyle } from 'react-native';

export const Label = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY[40]};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.PT_SANS_NARROW.BOLD};
  margin-bottom: 12px;
`;

export const errorStyle: TextStyle = {
  color: theme.COLORS.FEEDBACK.RED,
  fontSize: theme.FONT_SIZE.SM,
  fontFamily: theme.FONT_FAMILY.PT_SANS_NARROW.BOLD,
  margin: 5,
};

export const dropdownStyle: ViewStyle = {
  backgroundColor: theme.COLORS.WHITE,
  borderStyle: "solid",
  borderColor: theme.COLORS.GRAY[10],
  borderEndWidth: 1,
  borderStartWidth: 1,
  borderBottomWidth: 1,
  borderTopWidth: 1,
  paddingHorizontal: 12,
  borderRadius: 8,
  borderWidth: 0,
};

export const modalOptions: ViewStyle = {
  backgroundColor: theme.COLORS.BLUE[0],
  height: 'auto',
  minHeight: 300,

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

export const dropdownErrorStyle: ViewStyle = {
  borderColor: theme.COLORS.FEEDBACK.RED,
};

export const textStyle: TextStyle = {
  color: theme.COLORS.GRAY[30],
  fontFamily: theme.FONT_FAMILY.OPEN_SANS.REGULAR,
};

export const checkboxStyle: ViewStyle = {
  borderWidth: 0,
};

export const searchInputStyle: TextStyle = {
  backgroundColor: theme.COLORS.WHITE,
  borderRadius: 8,
  borderWidth: 0,
  height: 'auto',
  color: theme.COLORS.WHITE,
};
