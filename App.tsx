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

import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar, View } from "react-native";

import { M_APP_ID } from "@env";

import { Routes } from "./app/routes";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RealmProvider } from "./app/libs/realm";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

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
          <StatusBar
            barStyle="light-content"
            translucent
            backgroundColor="transparent"
          />
          <UserProvider fallback={SignInScreen}>
            <RealmProvider>
              <Routes />
            </RealmProvider>
          </UserProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
