import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useLayoutEffect, useEffect, useContext } from "react";
import hospitalbg from "../../../assets/hospitalbg.png";
import hospital from "../../../assets/hospital.png";
import {
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  MAIN_COLOR,
  MAIN_COLOR_BG,
  TEXT_COLOR_GRAY,
} from "../../constant";
import { Icon } from "@rneui/base";
import MainContext from "../../contexts/MainContext";

const HospitalDtlScreen = (props) => {
  const state = useContext(MainContext);

  useLayoutEffect(() => {
    // TabBar Hide хийх
    props.navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    // TabBar Hide хийх
  }, [props.navigation]);

  useEffect(() => {}, []);

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: Platform.OS == "ios" ? 60 : 50,
          paddingHorizontal: 10,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={hospitalbg}
          resizeMode="contain"
          style={{ width: "100%", height: 150 }}
        />
        <View style={styles.hospitalContainer}>
          <Image source={hospital} resizeMode="contain" style={styles.logo} />
          <View style={styles.hospitalDtlContainer}>
            <Text style={styles.title}>
              {state.appointmentData.hospital.name ?? "-"}
            </Text>
            <Text style={styles.type}>
              {state.appointmentData.hospital.databaseName ?? "-"}
            </Text>
            <View style={styles.addressContainer}>
              <View style={styles.scheduleContainer}>
                <Icon
                  name="clock"
                  type="feather"
                  size={15}
                  color={TEXT_COLOR_GRAY}
                />
                <Text numberOfLines={1} style={styles.address}>
                  09:00-22:00 (Даваа - Ням)
                </Text>
              </View>
              <View style={styles.scheduleContainer}>
                <Icon
                  name="location"
                  type="ionicon"
                  size={15}
                  color={TEXT_COLOR_GRAY}
                />
                <Text style={styles.address}>
                  {state.appointmentData.hospital.address ?? "-"}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.title}>Бидний тухай</Text>
          <Text style={{ fontFamily: FONT_FAMILY_LIGHT, paddingVertical: 10 }}>
            When false, if there is a small amount of space available around
            aWhen false, if there is a small amount of space available around
            aWhen false, if there is a small amount of space available around
            aWhen false, if there is a small amount of space available around
            aWhen false, if there is a small amount of space available around a
          </Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: Platform.OS == "ios" ? 20 : 10,
          width: "95%",
          alignSelf: "center",
          flexDirection: "row",
          alignItems: "center",
          borderColor: MAIN_COLOR,
          borderRadius: 8,
          borderWidth: 1,
          backgroundColor: MAIN_COLOR,
          justifyContent: "center",
          paddingVertical: 10,
        }}
        onPress={() => {
          state.resetAppontmentData();
          props.navigation.navigate("HospitalListScreen");
        }}
      >
        <Text numberOfLines={1} style={styles.menuText}>
          Цаг захиалах
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HospitalDtlScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: MAIN_COLOR_BG,
  },
  hospitalDtlContainer: {
    flexDirection: "column",
    width: "100%",
    paddingRight: 20,
    justifyContent: "flex-start",
    flex: 1,
  },
  hospitalContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingVertical: 10,
  },
  logo: {
    width: 30,
    height: 30,
    marginHorizontal: 20,
  },
  title: {
    fontFamily: FONT_FAMILY_BOLD,
    color: MAIN_COLOR,
  },
  type: {
    fontFamily: FONT_FAMILY_LIGHT,
    fontSize: 12,
  },
  addressContainer: {
    flexDirection: "column",
    marginTop: 10,
  },
  scheduleContainer: {
    flexDirection: "row",
  },
  address: {
    fontFamily: FONT_FAMILY_LIGHT,
    color: TEXT_COLOR_GRAY,
    marginLeft: 5,
  },
  menuText: {
    fontFamily: FONT_FAMILY_BOLD,
    marginLeft: 10,
    color: "#fff",
  },
  doctorTopContainer: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 2,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    marginHorizontal: 20,
  },
  titleContainer: {
    flexDirection: "column",
    width: "100%",
    paddingRight: 20,
    justifyContent: "flex-start",
    flex: 1,
  },
  doctorName: {
    fontFamily: FONT_FAMILY_BOLD,
    color: MAIN_COLOR,
    fontSize: 18,
  },
  count: {
    fontFamily: FONT_FAMILY_LIGHT,
  },
  doctorPosition: {
    fontFamily: FONT_FAMILY_LIGHT,
  },
  doctorHospital: {
    fontFamily: FONT_FAMILY_LIGHT,
  },
});
