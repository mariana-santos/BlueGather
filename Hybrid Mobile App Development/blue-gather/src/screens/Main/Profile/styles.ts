import styled from 'styled-components/native';

export const AvatarWrapper = styled.View`
  margin: 30px 0;
  padding: 0 30px;
`;

export const Text = styled.Text<{ large?: boolean }>`
  font-size: ${({ theme, large }) =>
    large ? theme.FONT_SIZE.XL : theme.FONT_SIZE.SM}px;

  color: ${({ theme }) => theme.COLORS.GRAY[40]};
`;

export const MedalsContainer = styled.View`
  margin-top: 20px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;
