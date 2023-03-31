import {
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  MAIN_COLOR,
  MAIN_COLOR_GRAY,
  TEXT_COLOR_GRAY,
} from "../constant";
import avatar from "../../assets/avatar.png";
import hospital from "../../assets/hospital.png";
import { Divider } from "react-native-paper";
import { Icon } from "@rneui/base";

const SearchScreen = (props) => {
  const [selectedMenu, setSelectedMenu] = useState(1);
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
  const menus = [
    { value: 1, label: "Эмнэлэг" },
    { value: 2, label: "Эмч" },
    { value: 3, label: "Эмийн сан" },
    { value: 4, label: "Багц шинжилгээ" },
  ];

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

  const RenderHospitals = () => {
    return (
      <View>
        <View style={styles.searchContainer}>
          <Icon
            name="search"
            type="feather"
            size={20}
            color={TEXT_COLOR_GRAY}
          />
          <TextInput
            style={styles.searchInput}
            onChangeText={(text) => setText(text)}
            value={text}
            placeholder="Хайх"
          />
        </View>
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
      </View>
    );
  };
  const RenderDoctors = () => {
    return (
      <View>
        <View style={styles.searchContainer}>
          <Icon
            name="search"
            type="feather"
            size={20}
            color={TEXT_COLOR_GRAY}
          />
          <TextInput
            style={styles.searchInput}
            onChangeText={(text) => setText(text)}
            value={text}
            placeholder="Хайх"
          />
        </View>
        <TouchableOpacity
          style={styles.doctorTopContainer}
          onPress={() => props.navigation.navigate("DoctorDtlScreen")}
        >
          <Image source={avatar} resizeMode="contain" style={styles.avatar} />
          <View style={styles.titleContainer}>
            <Text style={styles.doctorName}>Б. Оюунчимэг</Text>
            <Divider style={{ marginTop: 5, marginRight: 10 }} />
            <Text style={styles.doctorPosition}>Арьсны эмч</Text>
            <Text style={styles.doctorHospital}>Нэгдсэн эмнэлэг</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <Icon
                name="star"
                type="font-awesome"
                size={20}
                color={MAIN_COLOR}
              />
              <Text style={styles.count}>4.4</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const RenderMedicine = () => {
    return (
      <View>
        <Text>RenderMedicine</Text>
      </View>
    );
  };
  const RenderPackage = () => {
    return (
      <View>
        <Text>RenderPackage</Text>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={{ height: 50, paddingVertical: 5 }}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{ flexGrow: 1 }}
          showsHorizontalScrollIndicator={false}
        >
          {menus.map((el, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.menuContainer,
                  {
                    backgroundColor:
                      el.value == selectedMenu ? MAIN_COLOR : "#fff",
                  },
                ]}
                onPress={() => setSelectedMenu(el.value)}
              >
                <Text
                  style={[
                    styles.menuText,
                    {
                      color: el.value == selectedMenu ? "#fff" : MAIN_COLOR,
                    },
                  ]}
                >
                  {el.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.renderContainer}>
        {selectedMenu == 1 ? <RenderHospitals /> : null}
        {selectedMenu == 2 ? <RenderDoctors /> : null}
        {selectedMenu == 3 ? <RenderMedicine /> : null}
        {selectedMenu == 4 ? <RenderPackage /> : null}
      </ScrollView>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  menuContainer: {
    borderRadius: 30,
    borderColor: MAIN_COLOR,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    marginLeft: 10,
  },
  menuText: {
    fontFamily: FONT_FAMILY_BOLD,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: MAIN_COLOR_GRAY,
    borderRadius: 8,
    padding: 10,
  },
  searchInput: {
    fontFamily: FONT_FAMILY_BOLD,
    color: TEXT_COLOR_GRAY,
    marginLeft: 10,
    width: "90%",
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
    marginTop: 5,
  },
  doctorHospital: {
    fontFamily: FONT_FAMILY_LIGHT,
    fontSize: 16,
    marginTop: 5,
  },
  renderContainer: {
    flexGrow: 1,
    paddingHorizontal: 10,
    marginTop: 10,
    paddingBottom: 30,
  },
  count: {
    fontFamily: FONT_FAMILY_BOLD,
    marginLeft: 5,
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
    marginTop: 10,
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
    fontSize: 12,
  },
});
