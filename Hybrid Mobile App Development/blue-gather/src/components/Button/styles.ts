import { css } from 'styled-components';
import styled from 'styled-components/native';

interface Props {
  size: 'SM' | 'MD' | 'LG' | 'XL' | 'XXL';
  backgroundColor?: string;
}

export const ButtonContainer = styled.TouchableOpacity<Props>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  border-radius: 8px;
  align-self: ${({ size }) => (size === 'SM' ? 'flex-start' : 'default')};

  background-color: ${({ backgroundColor }) => backgroundColor};

  padding: ${({ size }) =>
    size === 'SM' ? '8px 12px' : size === 'MD' ? '12px' : '16px'};

  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

export const ButtonText = styled.Text<Props>`
  font-size: ${({ theme, size }) => theme.FONT_SIZE[size]}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.OPEN_SANS.BOLD};
  text-transform: uppercase;
  text-align: center;

  color: ${({ theme }) => theme.COLORS.WHITE};

  ${({ disabled, theme }) =>
    disabled &&
    css`
      color: ${theme.COLORS.GRAY[30]};
    `}
`;
