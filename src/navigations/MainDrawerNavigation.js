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
import BlogDtlScreen from "../screens/Blog/BlogDtlScreen";
import { FONT_FAMILY_BOLD, MAIN_COLOR } from "../constant";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import BlogScreen from "../screens/Blog/BlogScreen";

const Drawer = createDrawerNavigator();

const MainDrawerNavigation = () => {
  const navigation = useNavigation();
  const state = useContext(MainContext);
  if (state.isLoading) {
    return <SplashScreen />;
  } else {
    return (
      <Drawer.Navigator
        initialRouteName={state.isLoggedIn ? "HomeNav" : "LoginStack"}
        screenOptions={{
          swipeEdgeWidth: 0, //Drawer swipe хийхийг хаах
        }}
        useLegacyImplementation
      >
        {!state.isLoggedIn ? (
          <Drawer.Screen
            name="LoginStack"
            component={LoginStackNavigator}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <>
            <Drawer.Screen
              name="HomeNav"
              component={HomeScreenTabNavigation}
              options={{
                headerShown: false,
              }}
            />
            <Drawer.Screen
              name="ProfileStack"
              component={ProfileStackNavigator}
              options={{
                headerShown: false,
              }}
            />
            <Drawer.Screen
              name="NotificationStack"
              component={NotificationStackNavigator}
              options={{
                headerShown: false,
              }}
            />
            <Drawer.Screen
              name="ChatStack"
              component={ChatStackNavigator}
              options={{
                headerShown: false,
              }}
            />
            <Drawer.Screen
              name="BlogScreenDrawer"
              component={BlogScreen}
              options={{
                title: "",
                headerStyle: {
                  backgroundColor: MAIN_COLOR,
                  borderBottomLeftRadius: 24,
                  borderBottomRightRadius: 24,
                },
                headerLeft: () => (
                  <TouchableOpacity
                    style={styles.headerLeftContainer}
                    onPress={() => {
                      navigation.goBack();
                    }}
                  >
                    <Icon type="feather" name="arrow-left" color="#fff" />
                    <Text style={styles.headerLeftText}>Зөвлөгөө</Text>
                  </TouchableOpacity>
                ),
              }}
            />
            <Drawer.Screen
              name="BlogDtlScreenDrawer"
              component={BlogDtlScreen}
              options={{
                title: "",
                headerStyle: {
                  backgroundColor: MAIN_COLOR,
                  borderBottomLeftRadius: 24,
                  borderBottomRightRadius: 24,
                },
                headerLeft: () => (
                  <TouchableOpacity
                    style={styles.headerLeftContainer}
                    onPress={() => {
                      navigation.goBack();
                    }}
                  >
                    <Icon type="feather" name="arrow-left" color="#fff" />
                    <Text style={styles.headerLeftText}>Зөвлөгөө</Text>
                  </TouchableOpacity>
                ),
              }}
            />
          </>
        )}
      </Drawer.Navigator>
    );
  }
};

export default MainDrawerNavigation;

const styles = StyleSheet.create({
  headerLeftContainer: {
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  headerLeftText: {
    marginLeft: 10,
    fontFamily: FONT_FAMILY_BOLD,
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});
