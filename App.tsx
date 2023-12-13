import { StatusBar } from "expo-status-bar";

import { SignInScreen } from "./app/screens/SignIn";

export default function App() {
  return (
    <>
      <StatusBar style="auto" translucent backgroundColor="transparent" />
      <SignInScreen />
    </>
  );
}
