import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;

  max-width: 150px;
`;

export const Image = styled.Image`
  position: relative;

  height: 80px;
  width: 80px;
  aspect-ratio: 1;

  background-color: red;

  border-radius: 125px;
  border-width: 3px;
  border-color: ${({ theme }) => theme.COLORS.PURPLE[30]};
`;

export const IconPic = styled.Image`
  position: absolute;
  bottom: 10px;
  right: 0px;
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
