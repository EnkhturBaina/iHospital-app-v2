import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import avatar from "../../../assets/avatar.png";
import {
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  MAIN_COLOR,
  MAIN_COLOR_BG,
  MAIN_COLOR_GRAY,
  TEXT_COLOR_GRAY,
} from "../../constant";
import { Icon } from "@rneui/base";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const DoctorChatScreen = () => {
  const [hospitalSearchValue, setHospitalSearchValue] = useState("");
  return (
    <ScrollView contentContainerStyle={styles.mainScroller}>
      <View style={styles.searchContainer}>
        <Icon name="search" type="feather" size={20} color={TEXT_COLOR_GRAY} />
        <TextInput
          style={styles.searchInput}
          onChangeText={setHospitalSearchValue}
          value={hospitalSearchValue}
          placeholder="Хайх"
        />
        <Icon name="sliders" type="feather" size={20} color={TEXT_COLOR_GRAY} />
      </View>
      <TouchableOpacity style={styles.cardContainer}>
        <View style={styles.stack1}>
          <Image source={avatar} resizeMode="contain" style={styles.avatar} />
          <View>
            <View style={styles.textContainer}>
              <Text style={{ fontFamily: FONT_FAMILY_BOLD }}>
                T.Дэлгэрсайхан
              </Text>
              <Text style={{ fontFamily: FONT_FAMILY_LIGHT }}>
                Where are you? I’m waiting
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.stack2}>
          <Text style={{ fontFamily: FONT_FAMILY_LIGHT }}>12:13 Pm</Text>
          <Icon name="dot-single" type="entypo" size={30} color={MAIN_COLOR} />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};
const HospitalChatScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.mainScroller}>
      {/* <Text>HospitalChatScreen</Text> */}
    </ScrollView>
  );
};
const ChatScreen = (props) => {
  useLayoutEffect(() => {
    // TabBar Hide хийх
    props.navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () =>
      props.navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
    // TabBar Hide хийх
  }, [props.navigation]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarAndroidRipple: {
          color: "transparent",
        },
        tabBarLabelStyle: {
          textTransform: "capitalize",
          fontFamily: FONT_FAMILY_BOLD,
        },
        tabBarStyle: {
          backgroundColor: MAIN_COLOR_BG,
        },
        tabBarIndicatorStyle: {
          backgroundColor: MAIN_COLOR,
          height: 5,
          borderRadius: 12,
        },
      }}
    >
      <Tab.Screen name="Эмч" component={DoctorChatScreen} />
      <Tab.Screen name="Эмнэлэг" component={HospitalChatScreen} />
    </Tab.Navigator>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  mainScroller: {
    flexGrow: 1,
    backgroundColor: MAIN_COLOR_BG,
    paddingHorizontal: 10,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  searchInput: {
    fontFamily: FONT_FAMILY_LIGHT,
    color: TEXT_COLOR_GRAY,
    marginLeft: 10,
    width: "85%",
    height: 20,
  },
  avatar: {
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 12,
    padding: 5,
  },
  stack1: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "column",
    marginLeft: 10,
  },
  stack2: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
});
