import { Alert, TouchableOpacity } from "react-native";
import { Container, Greeting, Message, Name, Photo } from "./styles";

import { useTheme } from "styled-components/native";
import { useUser, useApp } from "@realm/react";
import { Power } from "phosphor-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const HomeHeader = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top + 32;

  const { COLORS } = useTheme();

  const user = useUser();
  const app = useApp();

  const handleLogout = () => {
    Alert.alert("Logout", "Deseja sair da aplicação?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => {
          app.currentUser?.logOut();
        },
      },
    ]);
  };

  return (
    <Container
      style={{
        paddingTop,
      }}
    >
      <Photo
        source={{
          uri: user?.profile.pictureUrl,
        }}
      />

      <Greeting>
        <Message>Olá,</Message>
        <Name>{user?.profile.name}</Name>
      </Greeting>

      <TouchableOpacity onPress={handleLogout}>
        <Power size={32} color={COLORS.GRAY_400} />
      </TouchableOpacity>
    </Container>
  );
};
