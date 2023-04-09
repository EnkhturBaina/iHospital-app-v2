import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/themed";
import { FONT_FAMILY_BOLD, MAIN_COLOR, TEXT_COLOR_GRAY } from "../constant";
import {
  MainStackNavigator,
  MeetStackNavigator,
  BlogStackNavigator,
  ReferenceStackNavigator,
} from "./MainStackNavigation";

const Tab = createBottomTabNavigator();
const HomeScreenTabNavigation = (props) => {
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
        name="BlogTab"
        component={BlogStackNavigator}
        options={{
          tabBarLabel: "Мэдээ",
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
        name="ReferenceTab"
        component={ReferenceStackNavigator}
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
