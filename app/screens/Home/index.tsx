import { useNavigation } from "@react-navigation/native";
import {
  CardStatus,
  HomeHeader,
  HistoricCard,
  HistoricCardData,
} from "../../components";
import { Container, Content, Label, List, Title } from "./styles";
import { useQuery, useRealm } from "../../libs/realm";
import { Historic } from "../../libs/realm/schemas/Historic";
import { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import dayjs from "dayjs";
import { useUser } from "@realm/react";

export const HomeScreen = () => {
  const [vehicleInUser, setVehicleInUse] = useState<Historic | null>(null);
  const [historicState, setHistoricState] = useState<HistoricCardData[]>([]);
  const { navigate } = useNavigation();

  const user = useUser();
  const historic = useQuery(Historic);
  const realm = useRealm();

  const handleHistoricDetails = (id: string) => {
    navigate("arrival", { id });
  };

  const handleRegisterMovement = () => {
    if (vehicleInUser?._id) {
      navigate("arrival", { id: vehicleInUser?._id.toString() });
      return;
    }
    navigate("departure");
  };

  const fetchVehicleInUse = () => {
    try {
      const vehicle = historic?.filtered("status = 'departure'")[0];

      setVehicleInUse(vehicle);
    } catch (error) {
      Alert.alert("Veículo em uso", "Não foi possível buscar o veículo em uso");
    }
  };

  const fetchHistoric = () => {
    const response = historic.filtered(
      "status = 'arrival' SORT(created_at DESC)"
    );

    if (response.length > 0) {
      const formattedHistoric: HistoricCardData[] = response.map((item) => ({
        id: item._id.toString(),
        licensePlate: item.license_plate,
        isSync: false,
        createdAt: dayjs(item.created_at).format(
          "[Saída em] DD/MM/YYYY [ás] HH:mm"
        ),
      }));

      setHistoricState(formattedHistoric);
    }
  };

  useEffect(() => {
    realm.addListener("change", fetchVehicleInUse);

    return () => {
      realm.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    fetchVehicleInUse();
  }, []);

  useEffect(() => {
    fetchHistoric();
  }, [historic]);

  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) => {
      const historicByUserQuery = realm
        .objects("Historic")
        .filtered(`user_id = "${user!.id}"`);

      mutableSubs.add(historicByUserQuery, {
        name: "historic_by_user",
      });
    });
  }, [realm]);

  return (
    <Container>
      <HomeHeader />
      <Content>
        <CardStatus
          licensePlate={vehicleInUser?.license_plate}
          onPress={handleRegisterMovement}
        />

        <Title>Histórico</Title>
        <List
          data={historicState}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HistoricCard
              data={item}
              onPress={() => handleHistoricDetails(item.id)}
            />
          )}
          ListEmptyComponent={<Label>Nenhum registro de utilização</Label>}
        />
      </Content>
    </Container>
  );
};
