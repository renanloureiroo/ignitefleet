import { TouchableOpacity } from "react-native";
import { Container, Title } from "./style";
import { ArrowLeft } from "phosphor-react-native";
import { useTheme } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { FC } from "react";

type HeaderProps = {
  title: string;
};

export const Header: FC<HeaderProps> = ({ title }) => {
  const { goBack } = useNavigation();
  const { top } = useSafeAreaInsets();
  const { COLORS } = useTheme();
  const paddingTop = top + 42;

  return (
    <Container
      style={{
        paddingTop,
      }}
    >
      <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
        <ArrowLeft size={24} weight="bold" color={COLORS.BRAND_LIGHT} />
      </TouchableOpacity>

      <Title>{title}</Title>
    </Container>
  );
};
