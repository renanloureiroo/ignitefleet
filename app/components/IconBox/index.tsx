import { IconProps } from "phosphor-react-native";
import { Container, SizeProps } from "./style";
import { useTheme } from "styled-components/native";

export type IconBoxProps = (props: IconProps) => JSX.Element;

type Props = {
  size?: SizeProps;
  icon: IconBoxProps;
};

export const IconBox = ({ icon: Icon, size = "normal" }: Props) => {
  const iconSize = size === "normal" ? 24 : 16;
  const { COLORS } = useTheme();

  return (
    <Container size={size}>
      <Icon size={iconSize} color={COLORS.BRAND_LIGHT} />
    </Container>
  );
};
