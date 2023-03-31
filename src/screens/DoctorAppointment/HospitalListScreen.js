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
import hospital from "../../../assets/hospital.png";
import {
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  MAIN_COLOR,
  MAIN_COLOR_GRAY,
  TEXT_COLOR_GRAY,
} from "../../constant";
import { Icon } from "@rneui/base";

const HospitalListScreen = (props) => {
  const [text, setText] = useState("");
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

  const hospitalList = [
    {
      value: 0,
      title: "Арьсны өвчин судлалын үндэсний төв",
      type: "Улсын эмнэлэг",
      address: "СБД 11-р хороо, Цагдаагийн гудамж - 78",
    },
    {
      value: 1,
      title: "Синдрелла - 13 салбар",
      type: "Хувийн эмнэлэг",
      address: "БЗД 13-р хороо, 12-р хороолол - 2",
    },
    {
      value: 2,
      title: "Улсын нэгдүгээр төв эмнэлэг",
      type: "Улсын эмнэлэг",
      address: "СБД 1-р хороо, С.Зоригийн гудамж",
    },
  ];
  return (
    <View style={styles.mainContainer}>
      <View style={styles.searchContainer}>
        <Icon name="search" type="feather" size={20} color={TEXT_COLOR_GRAY} />
        <TextInput
          style={{
            fontFamily: FONT_FAMILY_BOLD,
            color: TEXT_COLOR_GRAY,
            marginLeft: 10,
            width: "90%",
          }}
          onChangeText={(text) => setText(text)}
          value={text}
          placeholder="Хайх"
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: 20,
          paddingHorizontal: 10,
        }}
      >
        {hospitalList.map((el, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.hospitalContainer}
              onPress={() => props.navigation.navigate("HospitalDtlScreen")}
              activeOpacity={0.6}
            >
              <Image
                source={hospital}
                resizeMode="contain"
                style={styles.logo}
              />
              <View style={styles.hospitalDtlContainer}>
                <Text style={styles.title}>{el.title}</Text>
                <Text style={styles.type}>{el.type}</Text>
                <View style={styles.addressContainer}>
                  <Icon
                    name="location"
                    type="ionicon"
                    size={15}
                    color={TEXT_COLOR_GRAY}
                  />
                  <Text numberOfLines={1} style={styles.address}>
                    {el.address}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default HospitalListScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: MAIN_COLOR_GRAY,
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 10,
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
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 2,
    borderRadius: 12,
    backgroundColor: "#fff",
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
    flexDirection: "row",
    marginTop: 10,
  },
  address: {
    fontFamily: FONT_FAMILY_LIGHT,
    color: TEXT_COLOR_GRAY,
    marginLeft: 5,
  },
});
