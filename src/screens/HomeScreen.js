import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  Image,
  Platform,
  NativeModules,
  ImageBackground,
  StatusBar,
} from "react-native";
const { StatusBarManager } = NativeModules;
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import MainContext from "../contexts/MainContext";
import { Icon } from "@rneui/base";
import {
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  MAIN_COLOR,
  MAIN_COLOR_GRAY,
  TEXT_COLOR_GRAY,
} from "../constant";
import HeaderUser from "../components/HeaderUser";
import hospital from "../../assets/hospital.png";
import doctor from "../../assets/doctor.png";
import stethoscope from "../../assets/stethoscope.png";
import test from "../../assets/test.png";
import card_bg from "../../assets/card-bg.png";

const HomeScreen = (props) => {
  const state = useContext(MainContext);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
        backgroundColor: "#fff",
      }}
    >
      <StatusBar
        translucent
        barStyle={Platform.OS == "ios" ? "dark-content" : "default"}
      />
      <HeaderUser />
      <ScrollView contentContainerStyle={styles.mainContainer}>
        <TouchableOpacity
          style={styles.searchContainer}
          onPress={() => props.navigation.navigate("SearchScreen")}
        >
          <Icon
            name="search"
            type="feather"
            size={20}
            color={TEXT_COLOR_GRAY}
          />
          <Text
            style={{
              fontFamily: FONT_FAMILY_BOLD,
              color: TEXT_COLOR_GRAY,
              marginLeft: 10,
            }}
          >
            Хайх
          </Text>
        </TouchableOpacity>
        <View style={styles.menusContainer}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("HospitalListScreen")}
            activeOpacity={0.6}
          >
            <ImageBackground
              source={card_bg}
              style={styles.menu}
              resizeMode="cover"
            >
              <Image
                source={hospital}
                resizeMode="contain"
                style={{ width: 60, height: 60 }}
              />
              <Text style={styles.menuText}>Эмнэлэг цаг товлох</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("ExaminationResultScreen")}
            activeOpacity={0.6}
          >
            <ImageBackground
              source={card_bg}
              style={styles.menu}
              resizeMode="cover"
            >
              <Image
                source={test}
                resizeMode="contain"
                style={{ width: 60, height: 60 }}
              />
              <Text style={styles.menuText}>Шижилгээний хариу</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => props.navigation.navigate("ContactDoctorScreen")}
          >
            <ImageBackground
              source={card_bg}
              style={styles.menu}
              resizeMode="cover"
            >
              <Image
                source={doctor}
                resizeMode="contain"
                style={{ width: 60, height: 60 }}
              />
              <Text style={styles.menuText}>Чиглүүлэх эмчтэй холбогдох</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => props.navigation.navigate("OnlineExaminationScreen")}
          >
            <ImageBackground
              source={card_bg}
              style={styles.menu}
              resizeMode="cover"
            >
              <Image
                source={stethoscope}
                resizeMode="contain"
                style={{ width: 60, height: 60 }}
              />
              <Text style={styles.menuText}>Онлайн эмчийн үзлэг</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: MAIN_COLOR_GRAY,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  menusContainer: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  menu: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: MAIN_COLOR,
    marginTop: 10,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 2,
    borderRadius: 12,
    padding: 15,
  },
  menuText: {
    fontFamily: FONT_FAMILY_BOLD,
    marginLeft: 10,
    flex: 1,
    color: "#fff",
    fontSize: 20,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});
