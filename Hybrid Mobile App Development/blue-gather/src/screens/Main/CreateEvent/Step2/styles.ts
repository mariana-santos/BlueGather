import styled from 'styled-components/native';

export const ImagesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 15px;

  margin-bottom: 20px;
`;

export const ImageWrapper = styled.View`
  position: relative;
  height: 100px;
  width: 100px;
  margin-bottom: 20px;
`;

export const Image = styled.Image`
  height: 100px;
  width: 100px;

  aspect-ratio: 1;

  border-radius: 5px;
`;

export const RemoveImage = styled.TouchableOpacity`
  position: absolute;
  top: -10px;
  right: -5px;

  background-color: ${({ theme }) => theme.COLORS.FEEDBACK.RED};
  padding: 5px;
  border-radius: 20px;
`;
