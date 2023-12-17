import { FC } from "react";
import { Container, Loading, Title } from "./styles";
import { TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  loading?: boolean;
  title: string;
}

export const Button: FC<ButtonProps> = ({
  loading = false,
  title,
  ...rest
}) => {
  return (
    <Container activeOpacity={0.7} disabled={loading} {...rest}>
      {loading ? <Loading /> : <Title>{title}</Title>}
    </Container>
  );
};
