import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  Platform,
  NativeModules,
} from "react-native";
const { StatusBarManager } = NativeModules;
import React from "react";
import { MAIN_COLOR, MAIN_COLOR_BG } from "../../constant";
import HeaderUser from "../../components/HeaderUser";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MyStatusBar from "../../components/CustomStatusBar";

const AppointmentTabScreen = (props) => {
  const menus = [
    {
      img: require("../../../assets/homeMenus/receiptsearch.png"),
      label: "Оношилгооны хариу",
      nav: "XrayResultScreen",
      active: true,
    },
    {
      img: require("../../../assets/homeMenus/receiptitem.png"),
      label: "Шинжилгээний хариу",
      nav: "ExaminationResultScreen",
      active: true,
    },
    {
      img: require("../../../assets/homeMenus/buliding.png"),
      label: "Эмнэлэг",
      nav: "HospitalListScreen",
      active: true,
    },
    {
      img: require("../../../assets/homeMenus/hospital.png"),
      label: "Эмийн сан",
      nav: "",
      active: false,
    },
    {
      img: require("../../../assets/homeMenus/profile.png"),
      label: "Цахим эмч",
      nav: "",
      active: false,
    },
    {
      img: require("../../../assets/homeMenus/profile2user.png"),
      label: "Сувилагч",
      nav: "",
      active: false,
    },
  ];
  return (
    <SafeAreaProvider
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
        backgroundColor: MAIN_COLOR_BG,
      }}
    >
      <MyStatusBar backgroundColor={MAIN_COLOR} barStyle="light-content" />

      <HeaderUser isContent={false} />
      <ScrollView contentContainerStyle={styles.mainContainer}>
        <View style={styles.menusContainer}>
          {menus.map((el, index) => {
            return (
              <TouchableOpacity
                style={[styles.menuItem, { opacity: !el.active ? 0.3 : 1 }]}
                key={index}
                onPress={() =>
                  el.nav
                    ? props.navigation.navigate("HomeTab", { screen: el.nav })
                    : null
                }
                disabled={!el.active}
              >
                <Image source={el.img} style={{ width: 25, height: 25 }} />
                <Text style={styles.menuText}>{el.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default AppointmentTabScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    backgroundColor: MAIN_COLOR_BG,
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: -20,
  },
  menusContainer: {
    flexWrap: "wrap",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "flex-start", // if you want to fill rows left to right
    marginTop: 10,
  },
  menuItem: {
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#fff",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 2,
    marginBottom: 10,
    alignItems: "center",
  },
  menuText: {
    color: "#86909C",
    marginLeft: 10,
    flex: 1,
    fontWeight: "500",
    lineHeight: 16,
  },
});
