import { Fragment } from 'react';
import { TextInputProps } from 'react-native';

// Theme import
import theme from '@theme/index';

// Style import
import {
  InputWrapper,
  Label,
  InputContainer,
  ErrorMessage,
  Helpers,
  Label2,
  Required,
  LabelWrapper,
} from './styles';

// Interface
interface Props extends TextInputProps {
  label?: string;
  label2?: string;
  error?: string;
  required?: boolean;
}

export function Input({
  label,
  label2,
  required,
  error,
  editable = true,
  ...rest
}: Props) {
  const isInvalid = Boolean(error);
  const placeholderTextColor = isInvalid
    ? theme.COLORS.FEEDBACK.RED
    : theme.COLORS.GRAY[40];

  return (
    <InputWrapper>
      {Boolean(label) && (
        <Helpers>
          <LabelWrapper>
            <Label>{label}</Label>
            {required && <Required>*</Required>}
          </LabelWrapper>

          {label2 && <Label2>{label2}</Label2>}
        </Helpers>
      )}

      <InputContainer
        {...rest}
        placeholderTextColor={placeholderTextColor}
        underlineColorAndroid="transparent"
        isInvalid={isInvalid}
        editable={editable}
      />

      {isInvalid && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  );
}
