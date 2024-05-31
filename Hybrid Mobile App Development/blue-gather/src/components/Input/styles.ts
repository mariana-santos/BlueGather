import { css } from 'styled-components';
import styled from 'styled-components/native';

export const InputWrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

export const LabelWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: start;
  gap: 2px;
`;

export const Helpers = styled.View`
  margin-bottom: 12px;
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY[40]};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.PT_SANS_NARROW.BOLD};
  text-align: left;
`;

export const Label2 = styled(Label)`
  color: ${({ theme }) => theme.COLORS.GRAY[30]};
  font-size: ${({ theme }) => theme.FONT_SIZE.XS}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.OPEN_SANS.REGULAR};
  text-align: left;
`;

export const Required = styled(Label)`
  color: ${({ theme }) => theme.COLORS.FEEDBACK.RED};
`;

export const InputContainer = styled.TextInput<{ isInvalid: boolean }>`
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  color: ${({ theme }) => theme.COLORS.GRAY[40]};
  font-family: ${({ theme }) => theme.FONT_FAMILY.OPEN_SANS.REGULAR};

  padding: 14px 12px;

  border: 1px solid ${({ theme }) => theme.COLORS.GRAY[10]};
  border-radius: 8px;

  ${props =>
    props.isInvalid &&
    css`
      border: 1px solid ${({ theme }) => theme.COLORS.FEEDBACK.RED};
    `};
`;

export const ErrorMessage = styled.Text`
  color: ${({ theme }) => theme.COLORS.FEEDBACK.RED};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.PT_SANS_NARROW.BOLD};

  margin: 10px 0 5px;
`;
