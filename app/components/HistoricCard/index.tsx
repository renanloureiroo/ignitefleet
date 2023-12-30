import { FC } from "react";
import { Check, ClockClockwise } from "phosphor-react-native";
import { TouchableOpacityProps } from "react-native";
import { Container, Departure, Info, LicensePlate } from "./styles";
import { useTheme } from "styled-components/native";

export type HistoricCardData = {
  id: string;
  licensePlate: string;
  createdAt: string;
  isSync: boolean;
};

type HistoricCardProps = TouchableOpacityProps & {
  data: HistoricCardData;
};

export const HistoricCard: FC<HistoricCardProps> = ({ data, ...rest }) => {
  const { COLORS } = useTheme();

  return (
    <Container activeOpacity={0.7} {...rest}>
      <Info>
        <LicensePlate>{data.licensePlate}</LicensePlate>
        <Departure>{data.createdAt}</Departure>
      </Info>

      {data.isSync ? (
        <Check size={24} color={COLORS.BRAND_LIGHT} />
      ) : (
        <ClockClockwise size={24} color={COLORS.GRAY_400} />
      )}
    </Container>
  );
};
