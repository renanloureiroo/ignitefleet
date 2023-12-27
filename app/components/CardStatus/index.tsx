import { Key, Car } from "phosphor-react-native";
import { FC } from "react";
import { Container, IconBox, Message, TextHighlight } from "./styles";
import { useTheme } from "styled-components/native";

type CardStatusProps = {
  licensePlate?: string;
};

export const CardStatus: FC<CardStatusProps> = ({ licensePlate = null }) => {
  const { COLORS } = useTheme();
  const Icon = licensePlate ? Key : Car;
  const message = licensePlate
    ? `Veículo ${licensePlate} em uso.${"\n"}`
    : `Nenhum veículo em uso.${"\n"}`;

  const status = licensePlate ? "chegada" : "saída";

  return (
    <Container>
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
