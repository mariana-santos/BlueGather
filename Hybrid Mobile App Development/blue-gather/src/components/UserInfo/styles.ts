import styled from "styled-components/native";

export const UserWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const UserIcon = styled.View`
  flex: 1;
`;

export const UserData = styled.View`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 5px;
  flex: 4;
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY[40]};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.PT_SANS_NARROW.BOLD};

  text-transform: capitalize;
`;

export const UserDocument = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY[30]};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
`;