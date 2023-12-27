import { useNavigation } from "@react-navigation/native";
import { CardStatus, Header } from "../../components";
import { Container, Content } from "./styles";

export const HomeScreen = () => {
  const { navigate } = useNavigation();

  return (
    <Container>
      <Header />
      <Content>
        <CardStatus />
      </Content>
    </Container>
  );
};
