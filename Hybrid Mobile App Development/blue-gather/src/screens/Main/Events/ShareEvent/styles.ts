import styled from 'styled-components/native';

export const ImagesContainer = styled.View`
  position: relative;
  min-height: 100px;
  width: 100%;
  aspect-ratio: 1;
  margin-bottom: 40px;
`;

export const ImageBefore = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  top: 0;
  border-radius: 5px;
`;

export const ImageAfter = styled(ImageBefore)`
  width: 50%;
  height: 100%;
  object-fit: cover;
  object-position: right;
  right: 0;
  top: 0;
`;

export const Tag = styled.Text<{ left?: boolean }>`
  position: absolute;
  font-family: ${({ theme }) => theme.FONT_FAMILY.PT_SANS_NARROW.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  background-color: ${({ theme }) => theme.COLORS.PURPLE[10]};
  color: ${({ theme }) => theme.COLORS.GRAY[50]};
  border-radius: 50px;
  right: ${({ left }) => left ? "auto" :  "10px"};
  left: ${({ left }) => left ? "10px" : "auto"};
  top: 10px;
  padding: 3px 10px;
`;

export const Shareable = styled.View`
`;