import { Container, Subtitle, Title } from "./styles";

import BackgroundPNG from "../../assets/background.png";

export const SignInScreen = () => {
  return (
    <Container source={BackgroundPNG} resizeMode="cover">
      <Title>Ignite Fleet</Title>
      <Subtitle>Gestão de uso de veículos</Subtitle>
    </Container>
  );
};
