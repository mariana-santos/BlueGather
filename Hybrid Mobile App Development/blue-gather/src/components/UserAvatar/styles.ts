import styled from 'styled-components/native';

type Props = {
  size: 'SM' | 'MD' | 'XXL';
}

export const Container = styled.TouchableOpacity`
  height: auto;
  border-radius: 80px;  
`;

export const Image = styled.Image<Props>`
  background-color: ${({ theme }) => theme.COLORS.GRAY[40]};

  height: ${props => (props.size === 'MD' ? '80px' : props.size === 'SM' ? '60px' : '150px')};
  aspect-ratio: 1;

  border-radius: 125px;
  border-width: 3px;
  border-color: ${({ theme }) => theme.COLORS.GRAY[40]};
`;

export const IconPic = styled.View<Props>`
  position: absolute;
  bottom: 10px;
  right: ${props => (props.size === 'MD' ? '-10px' : '0px')};

  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.COLORS.BLUE[50]};

  border-radius: 35px;

  padding: 10px;

  z-index: 10;
`;
