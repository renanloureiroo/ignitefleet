import { FC, forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";
import { Container, Input, Label } from "./styles";
import { useTheme } from "styled-components/native";

type TextAreaInputProps = TextInputProps & {
  label: string;
};

const TextAreaInput = forwardRef<TextInput, TextAreaInputProps>(
  ({ label, ...rest }, ref) => {
    const { COLORS } = useTheme();

    return (
      <Container>
        <Label>{label}</Label>
        <Input
          ref={ref}
          autoCapitalize="sentences"
          placeholderTextColor={COLORS.GRAY_400}
          multiline
          {...rest}
        />
      </Container>
    );
  }
);

export { TextAreaInput };
