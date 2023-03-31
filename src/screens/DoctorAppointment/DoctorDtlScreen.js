import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React from "react";
import avatar from "../../../assets/avatar.png";
import {
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  MAIN_COLOR,
  MAIN_COLOR_BG,
} from "../../constant";
import { Divider } from "react-native-paper";
import { Icon } from "@rneui/base";

const DoctorDtlScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.mainContainer} bounces={false}>
      <View style={styles.doctorTopContainer}>
        <Image source={avatar} resizeMode="contain" style={styles.avatar} />
        <View style={styles.titleContainer}>
          <Text style={styles.doctorName}>Б. Оюунчимэг</Text>
          <Divider style={{ marginTop: 10 }} />
          <Text style={styles.doctorPosition}>Арьсны эмч</Text>

          <Text style={styles.doctorHospital}>Нэгдсэн эмнэлэг</Text>
        </View>
      </View>
      <View style={styles.doctorStatContainer}>
        <View style={styles.statContainer}>
          <Icon
            name="user"
            type="font-awesome"
            size={30}
            color={MAIN_COLOR}
            style={styles.statIcon}
          />
          <Text style={styles.statCount}>5000+</Text>
          <Text style={styles.stateName}>Харилцагч</Text>
        </View>
        <View style={styles.statContainer}>
          <Icon
            name="user"
            type="font-awesome"
            size={30}
            color={MAIN_COLOR}
            style={styles.statIcon}
          />
          <Text style={styles.statCount}>10+</Text>
          <Text style={styles.stateName}>Ажилсан жил</Text>
        </View>
        <View style={styles.statContainer}>
          <Icon
            name="user"
            type="font-awesome"
            size={30}
            color={MAIN_COLOR}
            style={styles.statIcon}
          />
          <Text style={styles.statCount}>4.8</Text>
          <Text style={styles.stateName}>Үнэлгээ</Text>
        </View>
        <View style={styles.statContainer}>
          <Icon
            name="user"
            type="font-awesome"
            size={30}
            color={MAIN_COLOR}
            style={styles.statIcon}
          />
          <Text style={styles.statCount}>215</Text>
          <Text style={styles.stateName}>Сэтгэгдэл</Text>
        </View>
      </View>
      <Text style={{ fontFamily: FONT_FAMILY_BOLD, marginTop: 10 }}>
        Миний тухай
      </Text>
      <Text style={{ fontFamily: FONT_FAMILY_LIGHT }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat
      </Text>
      <Text style={{ fontFamily: FONT_FAMILY_BOLD, marginTop: 10 }}>
        Ажлын цаг
      </Text>
      <Text style={{ fontFamily: FONT_FAMILY_LIGHT }}>
        Даваа - Баасан, 08:00 - 20:00
      </Text>
      <Text style={{ fontFamily: FONT_FAMILY_BOLD, marginTop: 10 }}>
        Сэтгэгдэл
      </Text>
      <View style={styles.commentContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={avatar}
              resizeMode="contain"
              style={styles.commentAvatar}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontFamily: FONT_FAMILY_BOLD }}>
                Alicia J. Aldridge
              </Text>
              <Text style={{ fontFamily: FONT_FAMILY_LIGHT }}>03 Days Ago</Text>
            </View>
          </View>

          <View style={styles.reviewContainer}>
            <Icon
              name="star"
              type="font-awesome"
              size={20}
              color={MAIN_COLOR}
            />
            <Text style={styles.reviewCount}>5</Text>
          </View>
        </View>

        <Text style={{ fontFamily: FONT_FAMILY_LIGHT }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat
        </Text>
      </View>
    </ScrollView>
  );
};

export default DoctorDtlScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#fff",
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  doctorTopContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 2,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    marginLeft: 10,
  },
  doctorName: {
    fontFamily: FONT_FAMILY_BOLD,
    color: MAIN_COLOR,
    fontSize: 18,
  },
  doctorPosition: {
    fontFamily: FONT_FAMILY_LIGHT,
    fontSize: 14,
    marginTop: 10,
  },
  doctorHospital: {
    fontFamily: FONT_FAMILY_LIGHT,
    fontSize: 16,
    marginTop: 10,
  },
  doctorStatContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 20,
  },
  statIcon: {
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: MAIN_COLOR_BG,
    borderRadius: 50,
    marginBottom: 5,
  },
  statContainer: {
    alignItems: "center",
    flex: 1,
  },
  statCount: {
    fontFamily: FONT_FAMILY_BOLD,
    color: MAIN_COLOR,
  },
  stateName: {
    fontFamily: FONT_FAMILY_LIGHT,
    textAlign: "center",
  },
  commentContainer: {
    marginTop: 10,
    flexDirection: "column",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 2,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
  },
  commentAvatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  reviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: MAIN_COLOR,
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 15,
    right: 0,
    height: 35,
  },
  reviewCount: {
    fontFamily: FONT_FAMILY_BOLD,
    marginLeft: 10,
    fontSize: 18,
    color: MAIN_COLOR,
  },
});
