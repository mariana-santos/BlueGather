import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 50px;
  width: 50px;

  background-color: ${({ theme }) => theme.COLORS.BLUE[30]};

  border-radius: 25px;
`;
