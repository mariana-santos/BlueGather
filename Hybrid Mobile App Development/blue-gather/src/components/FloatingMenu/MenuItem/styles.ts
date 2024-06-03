import styled, { css } from 'styled-components/native';

type Props = {
  active?: boolean;
};

export const Item = styled.TouchableOpacity<Props>`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 50px;
  width: 55px;

  border-radius: 25px;

  ${({ active, theme }) =>
    active &&
    css`
      background: ${theme.COLORS.BLUE[20]};
      border: solid 1px ${theme.COLORS.BLUE[50]};
    `}
`;
