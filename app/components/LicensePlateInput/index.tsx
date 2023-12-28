import { FC, forwardRef } from "react";
import { Container, Input, Label } from "./styles";
import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";

type LicensePlateInputProps = TextInputProps & {
  label: string;
};

export const LicensePlateInput = forwardRef<TextInput, LicensePlateInputProps>(
  ({ label, ...rest }, ref) => {
    const { COLORS } = useTheme();
    return (
      <Container>
        <Label>{label}</Label>
        <Input
          ref={ref}
          maxLength={7}
          autoCapitalize="characters"
          placeholderTextColor={COLORS.GRAY_400}
          {...rest}
        />
      </Container>
    );
  }
);
