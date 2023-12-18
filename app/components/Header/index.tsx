import { TouchableOpacity } from "react-native";
import { Container, Greeting, Message, Name, Photo } from "./styles";

import { Power } from "phosphor-react-native";
import { useTheme } from "styled-components/native";

export const Header = () => {
  const { COLORS } = useTheme();

  return (
    <Container>
      <Photo
        source={{
          uri: "https://github.com/renanloureiroo.png",
        }}
      />

      <Greeting>
        <Message>Olá,</Message>
        <Name>Renan</Name>
      </Greeting>

      <TouchableOpacity onPress={() => {}}>
        <Power size={32} color={COLORS.GRAY_400} />
      </TouchableOpacity>
    </Container>
  );
};
