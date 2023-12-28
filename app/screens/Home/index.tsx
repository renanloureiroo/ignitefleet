import { useNavigation } from "@react-navigation/native";
import { CardStatus, HomeHeader } from "../../components";
import { Container, Content } from "./styles";

export const HomeScreen = () => {
  const { navigate } = useNavigation();

  const handleRegisterMovement = () => {
    navigate("departure");
  };

  return (
    <Container>
      <HomeHeader />
      <Content>
        <CardStatus onPress={handleRegisterMovement} />
      </Content>
    </Container>
  );
};
