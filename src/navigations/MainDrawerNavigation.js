import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
import React, { useContext, useState } from "react";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import HomeScreenTabNavigation from "./HomeScreenTabNavigation";
import {
  FONT_FAMILY_BOLD,
  MAIN_BACKGROUND_COLOR_GRAY,
  MAIN_COLOR,
} from "../constant";
import { Icon } from "@rneui/base";
import { LoginStackNavigator } from "./MainStackNavigation";
import SplashScreen from "../screens/SplashScreen";
import MainContext from "../contexts/MainContext";

const Drawer = createDrawerNavigator();

const MainDrawerNavigation = (props) => {
  const state = useContext(MainContext);
  const [visibleDialog, setVisibleDialog] = useState(false);
  function CustomDrawerContent(props) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <View></View>
      </View>
    );
  }

  if (state.isLoading) {
    return <SplashScreen />;
  } else {
    return (
      <Drawer.Navigator
        initialRouteName="HomeNav"
        screenOptions={{
          drawerItemStyle: {
            marginBottom: 0,
          },
          drawerLabelStyle: {
            fontFamily: FONT_FAMILY_BOLD,
          },
          drawerActiveTintColor: MAIN_COLOR,
          drawerType: "front",
        }}
        useLegacyImplementation
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="HomeNav"
          component={HomeScreenTabNavigation}
          options={{
            title: "Мэргэд",
            headerShown: false,
            headerTitleStyle: {
              fontFamily: FONT_FAMILY_BOLD,
            },
          }}
        />
        {!state.isLoggedIn ? (
          <Drawer.Screen
            name="Login"
            options={{
              title: "Нэвтрэх",
              headerShown: false,
              headerTitleStyle: {
                fontFamily: FONT_FAMILY_BOLD,
              },
            }}
            component={LoginStackNavigator}
          />
        ) : (
          <></>
        )}
        {/* <Drawer.Screen
          name="Contact"
          options={{
            title: "Холбоо барих",
            headerStyle: {
              backgroundColor: MAIN_BACKGROUND_COLOR_GRAY,
              borderBottomWidth: 0,
              shadowColor: "transparent", // this covers iOS
            },
            headerTitleStyle: {
              fontFamily: FONT_FAMILY_BOLD,
            },
          }}
          component={ContactScreen}
        /> */}
      </Drawer.Navigator>
    );
  }
};

export default MainDrawerNavigation;

const styles = StyleSheet.create({
  userData: {
    margin: 16,
    fontFamily: FONT_FAMILY_BOLD,
  },
  label: {
    margin: 18,
    marginBottom: 50,
    fontFamily: FONT_FAMILY_BOLD,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  drawerIcon: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginVertical: 20,
  },
  drawerTopContainer: {
    height: 230,
    paddingVertical: 30,
    marginBottom: 10,
    alignItems: "center",
  },
  drawerTopText: {
    textAlign: "center",
    fontFamily: FONT_FAMILY_BOLD,
    color: MAIN_COLOR,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  closeDrawerContainer: {},
  closeDrawerIcon: {
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
});
