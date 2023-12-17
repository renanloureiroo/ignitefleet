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
import { StatusBar } from "react-native";

import { M_APP_ID } from "@env";
import { HomeScreen } from "./app/screens/Home";

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
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <UserProvider fallback={SignInScreen}>
          <HomeScreen />
        </UserProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
