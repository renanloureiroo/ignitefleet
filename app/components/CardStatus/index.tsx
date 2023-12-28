import { Key, Car } from "phosphor-react-native";
import { FC } from "react";
import { Container, IconBox, Message, TextHighlight } from "./styles";
import { useTheme } from "styled-components/native";
import { TouchableOpacityProps } from "react-native";

type CardStatusProps = TouchableOpacityProps & {
  licensePlate?: string;
};

export const CardStatus: FC<CardStatusProps> = ({
  licensePlate = null,
  ...rest
}) => {
  const { COLORS } = useTheme();
  const Icon = licensePlate ? Key : Car;
  const message = licensePlate
    ? `Veículo ${licensePlate} em uso.${"\n"}`
    : `Nenhum veículo em uso.${"\n"}`;

  const status = licensePlate ? "chegada" : "saída";

  return (
    <Container {...rest}>
      <IconBox>
        <Icon size={32} color={COLORS.BRAND_LIGHT} />
      </IconBox>
      <Message>
        {message}
        <TextHighlight>Clique aqui para registar a {status}</TextHighlight>
      </Message>
    </Container>
  );
};
