import { FC } from "react";
import { Container, Title } from "./styles";
import { IconProps } from "phosphor-react-native";
import { useTheme } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SlideInUp, SlideOutUp } from "react-native-reanimated";

import {} from "react-native";

type IconType = (props: IconProps) => JSX.Element;

type TopMessageProps = {
  title: string;
  icon?: IconType;
};

export const TopMessage: FC<TopMessageProps> = ({ icon: Icon, title }) => {
  const { COLORS } = useTheme();
  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + 16;

  return (
    <Container
      entering={SlideInUp}
      exiting={SlideOutUp}
      style={{
        paddingTop,
      }}
    >
      {Icon && <Icon size={18} color={COLORS.BRAND_MID} />}
      <Title>{title}</Title>
    </Container>
  );
};
