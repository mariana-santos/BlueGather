import { Dimensions } from 'react-native';
import { css } from 'styled-components';
import styled from 'styled-components/native';

const windowHeight = Dimensions.get('window').height;

export const Header = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Waves = styled.Image`
  width: 100%;
  height: 80px;
`;

export const Container = styled.ImageBackground<{ scrollable?: boolean }>`
  flex: 1;

  ${props =>
    props.scrollable
      ? css`
          min-height: 600px;
        `
      : css`
          min-height: ${windowHeight - 210}px;
        `}

  background-color: ${({ theme }) => theme.COLORS.BLUE[3]};
  padding: 0 30px;
`;
