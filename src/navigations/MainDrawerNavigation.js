import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreenTabNavigation from "./HomeScreenTabNavigation";
import {
  ChatStackNavigator,
  LoginStackNavigator,
  NotificationStackNavigator,
  ProfileStackNavigator,
} from "./MainStackNavigation";
import SplashScreen from "../screens/SplashScreen";
import MainContext from "../contexts/MainContext";

const Drawer = createDrawerNavigator();

const MainDrawerNavigation = () => {
  const state = useContext(MainContext);
  if (state.isLoading) {
    return <SplashScreen />;
  } else {
    return (
      <Drawer.Navigator
        initialRouteName={state.isLoggedIn ? "HomeNav" : "LoginStack"}
        screenOptions={{
          headerShown: false,
        }}
        useLegacyImplementation
      >
        {!state.isLoggedIn ? (
          <Drawer.Screen name="LoginStack" component={LoginStackNavigator} />
        ) : (
          <>
            <Drawer.Screen name="HomeNav" component={HomeScreenTabNavigation} />
            <Drawer.Screen
              name="ProfileStack"
              component={ProfileStackNavigator}
            />
            <Drawer.Screen
              name="NotificationStack"
              component={NotificationStackNavigator}
            />
            <Drawer.Screen name="ChatStack" component={ChatStackNavigator} />
          </>
        )}
      </Drawer.Navigator>
    );
  }
};

export default MainDrawerNavigation;
