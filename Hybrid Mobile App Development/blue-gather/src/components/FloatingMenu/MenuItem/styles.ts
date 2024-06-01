import styled, { css } from 'styled-components/native';

type Props = {
  active?: boolean;
}

export const Item = styled.Pressable<Props>`
  padding: 10px 20px;
  border-radius: 50px;

  ${({ active, theme }) => 
    active && css`
      background: ${theme.COLORS.BLUE[20]};
      border: solid 1px ${theme.COLORS.BLUE[30]};
    `
  }
`;
