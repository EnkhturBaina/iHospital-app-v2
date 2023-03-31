import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { MainStore } from "./src/contexts/MainContext";
import MainDrawerNavigation from "./src/navigations/MainDrawerNavigation";
import HomeScreenTabNavigation from "./src/navigations/HomeScreenTabNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MainStore>
          {/* <MainDrawerNavigation /> */}
          <HomeScreenTabNavigation />
        </MainStore>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
