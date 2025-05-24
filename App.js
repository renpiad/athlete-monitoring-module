import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { StatsProvider } from "./context/StatsContext";
import MainScreen from "./views/screens/MainScreen";

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <StatsProvider>
        <MainScreen />
      </StatsProvider>
    </SafeAreaProvider>
  );
};

export default App;
