import Slider from '@react-native-community/slider';
import styled from 'styled-components/native';

export const Label = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.PT_SANS_NARROW.BOLD};

  margin-top: 30px;
  margin-bottom: 12px;

  text-align: left;
`;

export const Value = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_300};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.OPEN_SANS.REGULAR};
`;

export const StyledSlider = styled(Slider)`
  margin-top: 0;
  margin-bottom: 5px;
`;
