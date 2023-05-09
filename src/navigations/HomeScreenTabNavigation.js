import { StyleSheet } from "react-native";
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/themed";
import { FONT_FAMILY_BOLD, MAIN_COLOR, TEXT_COLOR_GRAY } from "../constant";
import {
  MainStackNavigator,
  MeetStackNavigator,
  ReferenceStackNavigator,
  AppointmentStackNavigator,
} from "./MainStackNavigation";
import MainContext from "../contexts/MainContext";

const Tab = createBottomTabNavigator();
const HomeScreenTabNavigation = (props) => {
  const state = useContext(MainContext);
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
        listeners={{
          tabPress: (e) => {
            state.setSelectedBottomTab("HomeTab");
          },
        }}
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
        listeners={{
          tabPress: (e) => {
            state.setSelectedBottomTab("MeetTab");
          },
        }}
        options={{
          tabBarLabel: "Уулзалт",
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
        name="AppointmentTab"
        component={AppointmentStackNavigator}
        listeners={{
          tabPress: (e) => {
            state.setSelectedBottomTab("AppointmentTab");
          },
        }}
        options={{
          tabBarLabel: "Захиалга",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name="doctor"
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
        name="ReferenceTab"
        component={ReferenceStackNavigator}
        listeners={{
          tabPress: (e) => {
            state.setSelectedBottomTab("ReferenceTab");
          },
        }}
        options={{
          tabBarLabel: "Лавлах",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name="phone"
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
    </Tab.Navigator>
  );
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
