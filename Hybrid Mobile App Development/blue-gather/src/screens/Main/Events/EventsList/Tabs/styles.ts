import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 25px;

  margin: 16px 0;
`;

export const Tab = styled.TouchableOpacity.attrs({ activeOpacity: 1 })<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  opacity: ${({ active }) => active ? "1" : ".4"};
`;

export const TabText = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.PT_SANS_NARROW.BOLD };
  color: ${({ theme }) => theme.COLORS.GRAY[40]};
`;

export const BottomTab = styled.View`
  height: 4px;
  width: 30px;

  border-radius: 15px;

  background-color: ${({ theme }) => theme.COLORS.PURPLE[50]};
`;
