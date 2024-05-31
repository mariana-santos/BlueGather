import { css } from 'styled-components';
import styled from 'styled-components/native';

export const InputWrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.PT_SANS_NARROW.BOLD};

  margin-bottom: 12px;

  text-align: left;
`;

export const InputContainer = styled.TextInput<{ isInvalid: boolean }>`
  background-color: ${({ theme }) => theme.COLORS.GRAY_500};
  color: ${({ theme }) => theme.COLORS.GRAY_200};

  padding: 14px 12px;

  border: 1px solid ${({ theme }) => theme.COLORS.GRAY_500};
  border-radius: 8px;

  ${props =>
    props.isInvalid &&
    css`
      border: 1px solid ${({ theme }) => theme.COLORS.RED};
    `};
`;

export const ErrorMessage = styled.Text`
  color: ${({ theme }) => theme.COLORS.RED};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.PT_SANS_NARROW.BOLD};

  margin: 10px 0 5px;
`;
