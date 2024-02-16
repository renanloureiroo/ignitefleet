import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Header } from "../../components";
import {
  Container,
  Content,
  Description,
  Footer,
  IconBox,
  Label,
  LicensePlate,
} from "./styles";
import { useObject, useRealm } from "../../libs/realm";
import { Historic } from "../../libs/realm/schemas/Historic";
import { X } from "phosphor-react-native";
import { useTheme } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BSON } from "realm";
import { Alert } from "react-native";
import { stopLocationTrackingTask } from "../../tasks/backgroundLocationTask";

type RouteParams = {
  id: string;
};

export const ArrivalScreen = () => {
  const { goBack } = useNavigation();
  const { COLORS } = useTheme();

  const { params } = useRoute();
  const { id } = params as RouteParams;

  const insets = useSafeAreaInsets();
  const realm = useRealm();
  // @ts-expect-error
  const historic = useObject<Historic>(Historic, new BSON.UUID(id).toUUID());

  const paddingBottom = insets.bottom + 16;

  const isDeparture = historic?.status === "departure";

  const title = isDeparture ? "Chegada" : "Detalhes";

  const removeVehicleUsage = () => {
    realm.write(() => {
      realm.delete(historic);
    });

    goBack();
  };

  const handleRemoveVehicleUsage = () => {
    Alert.alert("Cancelar", "Cancelar a utilização do veículo?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: removeVehicleUsage },
    ]);
  };

  const handleArrivalRegister = async () => {
    try {
      if (!historic) {
        Alert.alert("Erro", "Não foi possível encontrar o veículo");
      }
      await stopLocationTrackingTask();
      realm.write(() => {
        historic!.status = "arrival";
        historic!.updated_at = new Date();
      });
      goBack();
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível registrar a chegada do veículo");
    }
  };

  return (
    <Container>
      <Header title={title} />
      <Content>
        <Label>Placa do veículo</Label>
        <LicensePlate>{historic?.license_plate}</LicensePlate>

        <Label>Finalidade</Label>

        <Description>{historic?.description}</Description>
      </Content>

      {isDeparture && (
        <Footer
          style={{
            paddingBottom,
          }}
        >
          <IconBox activeOpacity={0.7} onPress={handleRemoveVehicleUsage}>
            <X size={32} color={COLORS.BRAND_LIGHT} />
          </IconBox>
          <Button title="Registrar chegada" onPress={handleArrivalRegister} />
        </Footer>
      )}
    </Container>
  );
};
