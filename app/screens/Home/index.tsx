import { useNavigation } from "@react-navigation/native";
import { Header } from "../../components";
import { Container } from "./styles";

export const HomeScreen = () => {
  const { navigate } = useNavigation();

  return (
    <Container>
      <Header />
    </Container>
  );
};
