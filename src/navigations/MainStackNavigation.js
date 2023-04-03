import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "../screens/LoginScreen";
import {
  FONT_FAMILY_BOLD,
  MAIN_BACKGROUND_COLOR_GRAY,
  MAIN_COLOR,
  MAIN_COLOR_BG,
} from "../constant";
import HomeScreen from "../screens/HomeScreen";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/base";
import { Text } from "react-native";
import MainContext from "../contexts/MainContext";
import LoginOrRegisterScreen from "../screens/LoginOrRegisterScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import HospitalListScreen from "../screens/DoctorAppointment/HospitalListScreen";
import HospitalDtlScreen from "../screens/DoctorAppointment/HospitalDtlScreen";
import DoctorDtlScreen from "../screens/DoctorAppointment/DoctorDtlScreen";
import IntroSliderScreen from "../screens/IntroSliderScreen";
import NotificationScreen from "../screens/NotificationScreen";
import EditUserDataScreen from "../screens/EditUserDataScreen";
import MeetScreen from "../screens/Meet/MeetScreen";
import HistoryScreen from "../screens/History/HistoryScreen";
import BlogScreen from "../screens/Blog/BlogScreen";
import ExaminationResultScreen from "../screens/ExaminationResult/ExaminationResultScreen";
import AccountScreen from "../screens/AccountScreen";
import PrivacyScreen from "../screens/PrivacyScreen";
import QAScreen from "../screens/QAScreen";
import ContactDoctorScreen from "../screens/ContactDoctor/ContactDoctorScreen";
import OnlineExaminationScreen from "../screens/OnlineExamination/OnlineExaminationScreen";
import ResetPasswordScreen from "../screens/ResetPassword/ResetPasswordScreen";
import OTPScreen from "../screens/ResetPassword/OTPScreen";
import NewPasswordScreenjs from "../screens/ResetPassword/NewPasswordScreen";
import { useNavigation } from "@react-navigation/native";
import DoctorAppointmentStep1 from "../screens/DoctorAppointment/DoctorAppointmentStep1";
import DoctorAppointmentStep2 from "../screens/DoctorAppointment/DoctorAppointmentStep2";
import RegisterScreen from "../screens/RegisterScreen";
import BlogDtlScreen from "../screens/Blog/BlogDtlScreen";
import NotificationDtlScreen from "../screens/NotificationDtlScreen";
import ChatScreen from "../screens/Chat/ChatScreen";
import BannerScreen from "../screens/BannerScreen";
import ReferenceScreen from "../screens/ReferenceScreen";
import MeetDtlScreen from "../screens/Meet/MeetDtlScreen";

const Stack = createStackNavigator();

const LoginStackNavigator = (props) => {
  const navigation = useNavigation();
  console.log("PROPS", props);
  const state = useContext(MainContext);
  return (
    <Stack.Navigator
      initialRouteName={state.isIntroShow ? "IntroSlider" : "LoginScreen"}
    >
      <Stack.Screen
        name="LoginOrRegister"
        component={LoginOrRegisterScreen}
        options={{
          title: "Нэвтрэх",
          headerShown: false,
          headerTitleStyle: {
            fontFamily: FONT_FAMILY_BOLD,
          },
        }}
      />

      <Stack.Screen
        name="IntroSlider"
        component={IntroSliderScreen}
        options={{
          title: "",
          headerShown: false,
          headerTitleStyle: {
            fontFamily: FONT_FAMILY_BOLD,
          },
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
          headerStyle: {
            borderBottomWidth: 0,
            shadowColor: "transparent", // this covers iOS
          },
          title: "",
          headerTitleStyle: {
            fontFamily: FONT_FAMILY_BOLD,
          },
        }}
      />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: MAIN_BACKGROUND_COLOR_GRAY,
            borderBottomWidth: 0,
            shadowColor: "transparent", // this covers iOS
            backgroundColor: "#fff",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon type="feather" name="chevron-left" />
              <Text style={styles.headerLeftText}>Буцах</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="OTPScreen"
        component={OTPScreen}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: MAIN_BACKGROUND_COLOR_GRAY,
            borderBottomWidth: 0,
            shadowColor: "transparent", // this covers iOS
            backgroundColor: "#fff",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon type="feather" name="chevron-left" />
              <Text style={styles.headerLeftText}>Буцах</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="NewPasswordScreen"
        component={NewPasswordScreenjs}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: MAIN_BACKGROUND_COLOR_GRAY,
            borderBottomWidth: 0,
            shadowColor: "transparent", // this covers iOS
            backgroundColor: "#fff",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon type="feather" name="chevron-left" />
              <Text style={styles.headerLeftText}>Буцах</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: MAIN_BACKGROUND_COLOR_GRAY,
            borderBottomWidth: 0,
            shadowColor: "transparent", // this covers iOS
            backgroundColor: "#fff",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon type="feather" name="chevron-left" />
              <Text style={styles.headerLeftText}>Буцах</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
const MainStackNavigator = (props) => {
  return (
    <Stack.Navigator initialRouteName="HomeNavtab">
      <Stack.Screen
        name="HomeNavtab"
        component={HomeScreen}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
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
                props.navigation.goBack();
              }}
            >
              <Icon type="feather" name="arrow-left" color="#fff" />
              <Text style={styles.headerLeftText}>Хайх</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="HospitalListScreen"
        component={HospitalListScreen}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: MAIN_BACKGROUND_COLOR_GRAY,
            borderBottomWidth: 0,
            shadowColor: "transparent", // this covers iOS
            backgroundColor: "#fff",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                props.navigation.goBack();
              }}
            >
              <Icon type="feather" name="chevron-left" />
              <Text style={styles.headerLeftText}>Буцах</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="HospitalDtlScreen"
        component={HospitalDtlScreen}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: MAIN_BACKGROUND_COLOR_GRAY,
            borderBottomWidth: 0,
            shadowColor: "transparent", // this covers iOS
            backgroundColor: "#fff",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                props.navigation.goBack();
              }}
            >
              <Icon type="feather" name="chevron-left" />
              <Text style={styles.headerLeftText}>Буцах</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="DoctorDtlScreen"
        component={DoctorDtlScreen}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: MAIN_BACKGROUND_COLOR_GRAY,
            borderBottomWidth: 0,
            shadowColor: "transparent", // this covers iOS
            backgroundColor: "#fff",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                props.navigation.goBack();
              }}
            >
              <Icon type="feather" name="chevron-left" />
              <Text style={styles.headerLeftText}>Буцах</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
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
                props.navigation.goBack();
              }}
            >
              <Icon type="feather" name="arrow-left" color="#fff" />
              <Text style={styles.headerLeftText}>Мэдэгдэл</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="NotificationDtlScreen"
        component={NotificationDtlScreen}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: MAIN_BACKGROUND_COLOR_GRAY,
            borderBottomWidth: 0,
            shadowColor: "transparent", // this covers iOS
            backgroundColor: "#fff",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                props.navigation.goBack();
              }}
            >
              <Icon type="feather" name="chevron-left" />
              <Text style={styles.headerLeftText}>Буцах</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ExaminationResultScreen"
        component={ExaminationResultScreen}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: MAIN_BACKGROUND_COLOR_GRAY,
            borderBottomWidth: 0,
            shadowColor: "transparent", // this covers iOS
            backgroundColor: "#fff",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                props.navigation.goBack();
              }}
            >
              <Icon type="feather" name="chevron-left" />
              <Text style={styles.headerLeftText}>Буцах</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ContactDoctorScreen"
        component={ContactDoctorScreen}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: MAIN_BACKGROUND_COLOR_GRAY,
            borderBottomWidth: 0,
            shadowColor: "transparent", // this covers iOS
            backgroundColor: "#fff",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                props.navigation.goBack();
              }}
            >
              <Icon type="feather" name="chevron-left" />
              <Text style={styles.headerLeftText}>Буцах</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="OnlineExaminationScreen"
        component={OnlineExaminationScreen}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: MAIN_BACKGROUND_COLOR_GRAY,
            borderBottomWidth: 0,
            shadowColor: "transparent", // this covers iOS
            backgroundColor: "#fff",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                props.navigation.goBack();
              }}
            >
              <Icon type="feather" name="chevron-left" />
              <Text style={styles.headerLeftText}>Буцах</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="DoctorAppointmentStep1"
        component={DoctorAppointmentStep1}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: MAIN_BACKGROUND_COLOR_GRAY,
            borderBottomWidth: 0,
            shadowColor: "transparent", // this covers iOS
            backgroundColor: "#fff",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                props.navigation.goBack();
              }}
            >
              <Icon type="feather" name="chevron-left" />
              <Text style={styles.headerLeftText}>Буцах</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="DoctorAppointmentStep2"
        component={DoctorAppointmentStep2}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: MAIN_BACKGROUND_COLOR_GRAY,
            borderBottomWidth: 0,
            shadowColor: "transparent", // this covers iOS
            backgroundColor: "#fff",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                props.navigation.goBack();
              }}
            >
              <Icon type="feather" name="chevron-left" />
              <Text style={styles.headerLeftText}>Буцах</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          title: "",
          headerShown: false,
          headerStyle: {
            backgroundColor: MAIN_BACKGROUND_COLOR_GRAY,
            borderBottomWidth: 0,
            shadowColor: "transparent", // this covers iOS
            backgroundColor: "#fff",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                props.navigation.goBack();
              }}
            >
              <Icon type="feather" name="chevron-left" />
              <Text style={styles.headerLeftText}>Буцах</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="BannerScreen"
        component={BannerScreen}
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
                props.navigation.goBack();
              }}
            >
              <Icon type="feather" name="arrow-left" color="#fff" />
              <Text style={styles.headerLeftText}>Баннер</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
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
                props.navigation.goBack();
              }}
            >
              <Icon type="feather" name="arrow-left" color="#fff" />
              <Text style={styles.headerLeftText}>Профайл</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="EditUserDataScreen"
        component={EditUserDataScreen}
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
                props.navigation.goBack();
              }}
            >
              <Icon type="feather" name="arrow-left" color="#fff" />
              <Text style={styles.headerLeftText}>Профайл засах</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: MAIN_BACKGROUND_COLOR_GRAY,
            borderBottomWidth: 0,
            shadowColor: "transparent", // this covers iOS
            backgroundColor: "#fff",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                props.navigation.navigate("ProfileScreen");
              }}
            >
              <Icon type="feather" name="chevron-left" />
              <Text style={styles.headerLeftText}>Буцах</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="PrivacyScreen"
        component={PrivacyScreen}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: MAIN_BACKGROUND_COLOR_GRAY,
            borderBottomWidth: 0,
            shadowColor: "transparent", // this covers iOS
            backgroundColor: "#fff",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                props.navigation.navigate("ProfileScreen");
              }}
            >
              <Icon type="feather" name="chevron-left" />
              <Text style={styles.headerLeftText}>Буцах</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="QAScreen"
        component={QAScreen}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: MAIN_BACKGROUND_COLOR_GRAY,
            borderBottomWidth: 0,
            shadowColor: "transparent", // this covers iOS
            backgroundColor: "#fff",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftContainer}
              onPress={() => {
                props.navigation.navigate("ProfileScreen");
              }}
            >
              <Icon type="feather" name="chevron-left" color="#fff" />
              <Text style={styles.headerLeftText}>Буцах</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const MeetStackNavigator = (props) => {
  return (
    <Stack.Navigator initialRouteName="MeetNavTab">
      <Stack.Screen
        name="MeetNavTab"
        component={MeetScreen}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MeetDtlScreen"
        component={MeetDtlScreen}
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
                props.navigation.navigate("MeetNavTab");
              }}
            >
              <Icon type="feather" name="arrow-left" color="#fff" />
              <Text style={styles.headerLeftText}>Дэлгэрэнгүй</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
const HistoryStackNavigator = (props) => {
  return (
    <Stack.Navigator initialRouteName="HistoryNavTab">
      <Stack.Screen
        name="HistoryNavTab"
        component={HistoryScreen}
        options={{
          title: "",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
const BlogStackNavigator = (props) => {
  return (
    <Stack.Navigator initialRouteName="BlogScreen">
      <Stack.Screen
        name="BlogScreen"
        component={BlogScreen}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BlogDtlScreen"
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
                props.navigation.navigate("BlogScreen");
              }}
            >
              <Icon type="feather" name="arrow-left" color="#fff" />
              <Text style={styles.headerLeftText}>Мэдээ</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
const ProfileStackNavigator = (props) => {
  return <Stack.Navigator initialRouteName="ProfileScreen"></Stack.Navigator>;
};
const ReferenceStackNavigator = (props) => {
  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen
        name="ReferenceScreen"
        component={ReferenceScreen}
        options={{
          title: "",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export {
  MainStackNavigator,
  LoginStackNavigator,
  MeetStackNavigator,
  HistoryStackNavigator,
  BlogStackNavigator,
  ProfileStackNavigator,
  ReferenceStackNavigator,
};

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
