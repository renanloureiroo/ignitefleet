import "react-native-get-random-values";
import "./app/libs/dayjs";

import { SignInScreen } from "./app/screens/SignIn";
import { ThemeProvider } from "styled-components/native";

import theme from "./app/theme";

import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { AppProvider, UserProvider } from "@realm/react";
import { useNetInfo } from "@react-native-community/netinfo";

import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar, View } from "react-native";

import { M_APP_ID } from "@env";

import { Routes } from "./app/routes";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RealmProvider, syncConfig } from "./app/libs/realm";
import { Loading } from "./app/components/Button/styles";
import { TopMessage } from "./app/components";
import { WifiSlash } from "phosphor-react-native";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  const { isConnected } = useNetInfo();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <AppProvider id={M_APP_ID}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider
          style={{
            backgroundColor: theme.COLORS.GRAY_700,
          }}
        >
          {!isConnected && (
            <TopMessage icon={WifiSlash} title="Você está offline!" />
          )}
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          <UserProvider fallback={SignInScreen}>
            <RealmProvider sync={syncConfig} fallback={<Loading />}>
              <Routes />
            </RealmProvider>
          </UserProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
