import { TouchableOpacityProps } from 'react-native';

// Style import
import { ButtonContainer, ButtonText } from './styles';
import theme from '@theme/index';

interface Props extends TouchableOpacityProps {
  label: string;
  size?: 'SM' | 'MD' | 'LG' | 'XL' | 'XXL';
  icon?: React.ReactNode;
  backgroundColor?: string;
}

export function Button({
  label,
  size = 'LG',
  icon,
  backgroundColor = theme.COLORS.BLUE[50],
  ...rest
}: Props) {
  return (
    <ButtonContainer
      {...rest}
      size={size}
      activeOpacity={0.7}
      backgroundColor={backgroundColor}
    >
      <ButtonText size={size}>
        {label}
      </ButtonText>
      {icon && icon}
    </ButtonContainer>
  );
}
