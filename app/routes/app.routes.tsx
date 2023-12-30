import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../screens/Home";
import { DepartureScreen } from "../screens/Departure";
import { useTheme } from "styled-components/native";
import { ArrivalScreen } from "../screens/Arrival";

const { Navigator, Screen } = createNativeStackNavigator();

export const AppRoutes = () => {
  const { COLORS } = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: COLORS.GRAY_700,
        },
      }}
    >
      <Screen name="home" component={HomeScreen} />
      <Screen name="departure" component={DepartureScreen} />
      <Screen name="arrival" component={ArrivalScreen} />
    </Navigator>
  );
};
