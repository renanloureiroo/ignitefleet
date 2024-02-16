import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Header, Map } from "../../components";
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
import { getLocationsStorage } from "../../libs/asyncStorage/locationStorage";
import { LatLng } from "react-native-maps";
import { useEffect, useState } from "react";
import { getAddressLocation } from "../../utils/getAddressLocation";
import { LocationAccuracy } from "expo-location";
import { Locations } from "../../components/Locations";
import { Loading } from "../../components/Button/styles";

type RouteParams = {
  id: string;
};

export const ArrivalScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<LatLng[]>([]);
  const [partidaAddress, setPartidaAddress] = useState<string>("");
  const [chegadaAddress, setChegadaAddress] = useState<string>("");
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

  const removeVehicleUsage = async () => {
    realm.write(() => {
      realm.delete(historic);
    });

    await stopLocationTrackingTask();

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

      const locations = await getLocationsStorage();
      realm.write(() => {
        historic!.status = "arrival";
        historic!.updated_at = new Date();
        historic?.coords.push(...locations);
      });
      await stopLocationTrackingTask();
      goBack();
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível registrar a chegada do veículo");
    }
  };

  const getLocationInfo = async () => {
    if (!historic) return;
    setIsLoading(true);
    if (!isDeparture) {
      const coordinates = historic?.coords.map((coord) => ({
        latitude: coord.latitude,
        longitude: coord.longitude,
      }));
      if (coordinates) {
        coordinates && setCoordinates(coordinates);
        const addressPartida = await getAddressLocation({
          latitude: coordinates[0].latitude,
          longitude: coordinates[0].longitude,
        });

        setPartidaAddress(addressPartida!);

        const addressChegada = await getAddressLocation({
          latitude: coordinates[coordinates.length - 1].latitude,
          longitude: coordinates[coordinates.length - 1].longitude,
        });

        setChegadaAddress(addressChegada!);
      }
      setIsLoading(false);
      return;
    }
    const coordinates = await getLocationsStorage();

    setCoordinates(coordinates);
    setIsLoading(false);
  };

  useEffect(() => {
    getLocationInfo();
  }, [historic]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <Header title={title} />

      {coordinates.length > 0 && <Map coordinates={coordinates} />}
      <Content>
        {partidaAddress && chegadaAddress && (
          <Locations
            arrival={{
              label: "Chegada",
              description: chegadaAddress,
            }}
            departure={{
              label: "Partida",
              description: partidaAddress,
            }}
          />
        )}
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
