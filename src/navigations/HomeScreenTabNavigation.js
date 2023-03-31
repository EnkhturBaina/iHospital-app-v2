import { StyleSheet } from "react-native";
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/themed";
import {
  FONT_FAMILY_BOLD,
  MAIN_COLOR,
  MAIN_COLOR_GRAY,
  TEXT_COLOR_GRAY,
} from "../constant";
import {
  HistoryStackNavigator,
  LoginStackNavigator,
  MainStackNavigator,
  MeetStackNavigator,
  BlogStackNavigator,
  ProfileStackNavigator,
} from "./MainStackNavigation";
import MainContext from "../contexts/MainContext";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createBottomTabNavigator();
const HomeScreenTabNavigation = (props) => {
  const state = useContext(MainContext);
  if (state.isLoading) {
    return <SplashScreen />;
  } else if (!state.isLoading && state.isLoggedIn) {
    // return <LoginScreen />;
    return <LoginStackNavigator />;
  } else {
    return (
      <Tab.Navigator
        screenOptions={{
          unmountOnBlur: true,
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="HomeTab"
          component={MainStackNavigator}
          options={{
            tabBarLabel: "Нүүр",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Icon
                name="home"
                type="feather"
                size={25}
                style={styles.inputIcon}
                active={focused}
                color={color}
              />
            ),
            tabBarInactiveTintColor: TEXT_COLOR_GRAY,
            tabBarActiveTintColor: MAIN_COLOR,
            tabBarLabelStyle: {
              fontFamily: FONT_FAMILY_BOLD,
            },
          }}
        />
        <Tab.Screen
          name="MeetTab"
          component={MeetStackNavigator}
          options={{
            tabBarLabel: "Календарь",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Icon
                name="calendar"
                type="font-awesome"
                size={25}
                style={styles.inputIcon}
                active={focused}
                color={color}
              />
            ),
            tabBarInactiveTintColor: TEXT_COLOR_GRAY,
            tabBarActiveTintColor: MAIN_COLOR,
            tabBarLabelStyle: {
              fontFamily: FONT_FAMILY_BOLD,
            },
          }}
        />
        <Tab.Screen
          name="HistoryTab"
          component={HistoryStackNavigator}
          options={{
            tabBarLabel: "Түүх",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Icon
                name="hipchat"
                type="fontisto"
                size={25}
                style={styles.inputIcon}
                active={focused}
                color={color}
              />
            ),
            tabBarInactiveTintColor: TEXT_COLOR_GRAY,
            tabBarActiveTintColor: MAIN_COLOR,
            tabBarLabelStyle: {
              fontFamily: FONT_FAMILY_BOLD,
            },
          }}
        />
        <Tab.Screen
          name="BlogTab"
          component={BlogStackNavigator}
          options={{
            tabBarLabel: "Нийтлэл",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Icon
                name="clipboard-text-outline"
                type="material-community"
                size={25}
                style={styles.inputIcon}
                active={focused}
                color={color}
              />
            ),
            tabBarInactiveTintColor: TEXT_COLOR_GRAY,
            tabBarActiveTintColor: MAIN_COLOR,
            tabBarLabelStyle: {
              fontFamily: FONT_FAMILY_BOLD,
            },
          }}
        />
        <Tab.Screen
          name="ProfileTab"
          component={ProfileStackNavigator}
          options={{
            tabBarLabel: "Профайл",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Icon
                name="user"
                type="font-awesome"
                size={25}
                style={styles.inputIcon}
                active={focused}
                color={color}
              />
            ),
            tabBarInactiveTintColor: TEXT_COLOR_GRAY,
            tabBarActiveTintColor: MAIN_COLOR,
            tabBarLabelStyle: {
              fontFamily: FONT_FAMILY_BOLD,
            },
          }}
        />
      </Tab.Navigator>
    );
  }
};

export default HomeScreenTabNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputIcon: {
    marginHorizontal: 10,
  },
});
