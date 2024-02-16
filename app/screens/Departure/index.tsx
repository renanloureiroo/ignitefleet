import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Car } from "phosphor-react-native";
import {
  Button,
  Header,
  LicensePlateInput,
  LocationInfo,
  Map,
  TextAreaInput,
} from "../../components";
import { Container, Content, LoadingContainer, Message } from "./styles";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Linking, TextInput } from "react-native";
import { licensePlateValidate } from "../../utils/validations/licensePlateValidate";
import { useRealm } from "../../libs/realm";
import { Historic } from "../../libs/realm/schemas/Historic";
import { useUser } from "@realm/react";
import {
  useForegroundPermissions,
  watchPositionAsync,
  LocationAccuracy,
  LocationSubscription,
  requestBackgroundPermissionsAsync,
} from "expo-location";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getAddressLocation } from "../../utils/getAddressLocation";
import { Loading } from "../../components/Button/styles";
import { LatLng } from "react-native-maps";
import { startLocationTrackingTask } from "../../tasks/backgroundLocationTask";

export const DepartureScreen = () => {
  const [licensePlate, setLicensePlate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const [currentCoordinates, setCurrentCoordinates] = useState<LatLng | null>(
    null
  );

  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(true);

  const [
    locationForegroundPermissionStatus,
    requestLocationForegroundPermission,
  ] = useForegroundPermissions();

  const { goBack } = useNavigation();

  const realm = useRealm();
  const user = useUser();

  const licensePlateRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);

  const handleRedirectToDeviceSettings = () => {
    Linking.openSettings();
  };

  const handleDepartureRegister = async () => {
    try {
      setLoading(true);
      if (!licensePlateValidate(licensePlate)) {
        licensePlateRef.current?.focus();
        return Alert.alert("Placa inválida", "A placa informada não é válida");
      }

      if (description.trim().length === 0) {
        descriptionRef.current?.focus();
        return Alert.alert("Finalidade inválida", "Informe a finalidade");
      }

      if (!currentCoordinates?.latitude && !currentCoordinates?.longitude) {
        return Alert.alert(
          "Localização inválida",
          "Não foi possível obter a localização atual"
        );
      }
      const backgroundPermissions = await requestBackgroundPermissionsAsync();

      if (!backgroundPermissions.granted) {
        return Alert.alert(
          "Permissão de localização",
          "Para registrar a saída é necessário conceder permissão de localização em segundo plano"
        );
      }

      await startLocationTrackingTask();

      realm.write(() => {
        realm.create(
          "Historic",
          Historic.generate({
            user_id: user.id,
            license_plate: licensePlate.toUpperCase(),
            description,
          })
        );
      });
      goBack();
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Erro ao registrar saída",
        "Não foi possível registrar saída"
      );
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      requestLocationForegroundPermission();
    }, [])
  );

  useEffect(() => {
    if (!locationForegroundPermissionStatus?.granted) return;
    let subscription: LocationSubscription;
    watchPositionAsync(
      {
        accuracy: LocationAccuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (location) => {
        setCurrentCoordinates({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        getAddressLocation(location.coords)
          .then((address) => {
            if (address) {
              setCurrentAddress(address);
            }
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => setIsLoadingLocation(false));
      }
    ).then((response) => (subscription = response));

    return () => {
      if (subscription) subscription.remove();
    };
  }, [locationForegroundPermissionStatus]);

  if (isLoadingLocation) {
    return (
      <Container>
        <Header title="Saída" />
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      </Container>
    );
  }

  if (!locationForegroundPermissionStatus?.granted) {
    return (
      <Container>
        <Header title="Saída" />
        <Message onPress={handleRedirectToDeviceSettings}>
          Você precisa permitir que o aplicativo tenha acesso à localização para
          utilizar essa funcionalidade. Por favor, acesse as configurações do
          seu dispositivo para conceder essa permissão ao aplicativo.
        </Message>
      </Container>
    );
  }

  return (
    <Container>
      <Header title="Saída" />
      <KeyboardAwareScrollView extraScrollHeight={100} enableOnAndroid>
        {currentCoordinates && <Map coordinates={[currentCoordinates]} />}
        <Content>
          {currentAddress && (
            <LocationInfo
              icon={Car}
              label="Localização atual"
              description={currentAddress}
            />
          )}
          <LicensePlateInput
            ref={licensePlateRef}
            label="Placa"
            placeholder="BRA-XXXX"
            onSubmitEditing={() => descriptionRef.current?.focus()}
            returnKeyType="next"
            value={licensePlate}
            onChangeText={setLicensePlate}
          />
          <TextAreaInput
            ref={descriptionRef}
            label="Finalidade"
            placeholder="Vou utilizar o carro para..."
            onSubmitEditing={handleDepartureRegister}
            returnKeyType="send"
            blurOnSubmit
            value={description}
            onChangeText={setDescription}
          />
          <Button
            loading={loading}
            title="Registrar saída"
            onPress={handleDepartureRegister}
          />
        </Content>
      </KeyboardAwareScrollView>
    </Container>
  );
};
