import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
`;

export const Image = styled.Image`
  position: relative;

  height: 100px;
  aspect-ratio: 1;

  border-radius: 125px;
  border-width: 3px;
  border-color: ${({ theme }) => theme.COLORS.PURPLE[30]};
`;

export const IconPic = styled.Image`
  position: absolute;
  bottom: 10px;
  right: -10px;
  top: -5px;

  height: 50px;
  width: 50px;
  aspect-ratio: 1;

  align-items: center;
  justify-content: center;

  border-radius: 35px;

  padding: 10px;

  z-index: 10;
`;
