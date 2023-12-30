import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Header,
  LicensePlateInput,
  TextAreaInput,
} from "../../components";
import { Container, Content } from "./styles";
import { useRef, useState } from "react";
import { Alert, ScrollView, TextInput } from "react-native";
import { licensePlateValidate } from "../../utils/validations/licensePlateValidate";
import { useRealm } from "../../libs/realm";
import { Historic } from "../../libs/realm/schemas/Historic";
import { useUser } from "@realm/react";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const DepartureScreen = () => {
  const [licensePlate, setLicensePlate] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const { goBack } = useNavigation();

  const realm = useRealm();
  const user = useUser();

  const licensePlateRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);

  const handleDepartureRegister = () => {
    setLoading(true);
    try {
      if (!licensePlateValidate(licensePlate)) {
        licensePlateRef.current?.focus();
        return Alert.alert("Placa inválida", "A placa informada não é válida");
      }

      if (description.trim().length === 0) {
        descriptionRef.current?.focus();
        return Alert.alert("Finalidade inválida", "Informe a finalidade");
      }

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

  return (
    <Container>
      <Header title="Saída" />
      <Content>
        <KeyboardAwareScrollView
          extraHeight={100}
          contentContainerStyle={{
            gap: 16,
          }}
        >
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
        </KeyboardAwareScrollView>
      </Content>
    </Container>
  );
};
