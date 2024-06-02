import styled from 'styled-components/native';

export const AvatarWrapper = styled.View`
  margin: 30px 0;
  padding: 0 30px;

  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const Text = styled.Text<{ size: 'sm' | 'md' | 'lg' }>`
  font-size: ${({ theme, size }) => {
    if (size === 'lg') return theme.FONT_SIZE.LG;
    if (size === 'md') return theme.FONT_SIZE.MD;

    return theme.FONT_SIZE.SM;
  }}px;

  font-family: ${({ theme }) => theme.FONT_FAMILY.PT_SANS_NARROW.BOLD};

  color: ${({ theme, size }) =>
    size === 'lg' ? theme.COLORS.GRAY[40] : theme.COLORS.GRAY[50]};
`;

export const MedalsContainer = styled.View`
  margin-top: 30px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

export const Content = styled.View`
  gap: 16px;
`;
