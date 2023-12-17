import { Container, Subtitle, Title, Wrapper } from "./styles";

import BackgroundPNG from "../../assets/background.png";
import { Button } from "../../components";
import { GoogleAuthenticationProvider } from "../../services";
import { useState } from "react";
import { Alert } from "react-native";

export const SignInScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  async function handleGoogleSignIn() {
    try {
      setIsAuthenticating(true);
      await GoogleAuthenticationProvider.hasPlayServices();
      const { idToken } = await GoogleAuthenticationProvider.signIn();

      if (idToken) {
      } else {
        Alert.alert(
          "Entrar",
          "Não foi possível conectar-se a sua conta google."
        );
        setIsAuthenticating(false);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Entrar", "Não foi possível conectar-se a sua conta google");
      setIsAuthenticating(false);
    }
  }
  return (
    <Container source={BackgroundPNG} resizeMode="cover">
      <Wrapper>
        <Title>Ignite Fleet</Title>
        <Subtitle>Gestão de uso de veículos</Subtitle>
      </Wrapper>
      <Button
        title="Entrar com google"
        loading={isAuthenticating}
        onPress={handleGoogleSignIn}
      />
    </Container>
  );
};
