import {
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  RefreshControl,
} from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  MAIN_BACKGROUND_COLOR_GRAY,
  MAIN_COLOR,
  MAIN_COLOR_BG,
  MAIN_COLOR_GRAY,
  TEXT_COLOR_GRAY,
} from "../constant";
import avatar from "../../assets/avatar.png";
import hospital from "../../assets/hospital.png";
import hospitalAvatar from "../../assets/hospitalAvatar.png";
import { Divider } from "react-native-paper";
import { Icon } from "@rneui/base";
import Empty from "../components/Empty";
import MainContext from "../contexts/MainContext";
import Loader from "../components/Loader";

const SearchScreen = (props) => {
  const state = useContext(MainContext);
  const [selectedMenu, setSelectedMenu] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback((refresh_type) => {
    console.log("refresh_type", refresh_type);
    setRefreshing(true);
    refresh_type == "hospital" ? state.getHospitalList() : null;
    refresh_type == "doctor" ? state.getDoctors() : null;
    wait(1000).then(() => setRefreshing(false));
  }, []);

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
  useEffect(() => {
    console.log("RenderHospitals");
    state.getHospitalList();
    state.getDoctors();
  }, []);

  const navigateHospitalDtl = async (hospital_data) => {
    state.setSelectedHospital(hospital_data);
    props.navigation.navigate("HospitalStructuresScreen");
  };
  const RenderHospitals = () => {
    // console.log("state.hospitalList", state.hospitalList);
    const [hospitalSearchValue, setHospitalSearchValue] = useState("");
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.searchContainer}>
          <Icon
            name="search"
            type="feather"
            size={20}
            color={TEXT_COLOR_GRAY}
          />
          <TextInput
            style={styles.searchInput}
            onChangeText={setHospitalSearchValue}
            value={hospitalSearchValue}
            placeholder="Хайх"
          />
          <Icon
            name="sliders"
            type="feather"
            size={20}
            color={TEXT_COLOR_GRAY}
          />
        </View>
        <ScrollView
          contentContainerStyle={styles.mainScroller}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => onRefresh("hospital")}
              tintColor={MAIN_COLOR}
              colors={[MAIN_COLOR]}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          {state.loadingHospitals ? <Loader /> : null}
          {state.hospitalList == "" &&
          !refreshing &&
          !state.loadingHospitals ? (
            <Empty type="empty" text="Үр дүн олдсонгүй." />
          ) : (
            state.hospitalList &&
            state.hospitalList
              ?.filter((obj) =>
                obj.name
                  ?.toLowerCase()
                  ?.includes(hospitalSearchValue?.toLowerCase())
              )
              ?.map((el, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.hospitalContainer}
                    onPress={() => navigateHospitalDtl(el)}
                    activeOpacity={0.6}
                  >
                    <Image
                      source={hospitalAvatar}
                      // source={logoId ? logoId : hospitalAvatar}
                      resizeMode="contain"
                      style={styles.logo}
                    />
                    <View style={styles.hospitalDtlContainer}>
                      <Text style={styles.title}>{el.name}</Text>
                      <Text style={styles.type}>
                        {el.isCountry ? "Улсын эмнэлэг" : "Хувийн эмнэлэг"}
                      </Text>
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
              })
          )}
        </ScrollView>
      </View>
    );
  };
  const RenderDoctors = () => {
    return (
      <View>
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
      <View style={{ flex: 1 }}>
        <Empty type="empty" text="Үр дүн олдсонгүй." />
      </View>
    );
  };
  const RenderPackage = () => {
    return (
      <View style={{ flex: 1 }}>
        <Empty type="empty" text="Үр дүн олдсонгүй." />
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={{ height: 50, paddingVertical: 5, marginVertical: 10 }}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{ flexGrow: 1, marginHorizontal: 10 }}
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
                      el.value == selectedMenu
                        ? MAIN_COLOR
                        : MAIN_BACKGROUND_COLOR_GRAY,
                  },
                ]}
                onPress={() => setSelectedMenu(el.value)}
              >
                <Text
                  style={[
                    styles.menuText,
                    {
                      fontFamily:
                        el.value == selectedMenu
                          ? FONT_FAMILY_BOLD
                          : FONT_FAMILY_LIGHT,
                      color: el.value == selectedMenu ? "#fff" : "#4E5969",
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

      <View style={styles.renderContainer}>
        {selectedMenu == 1 ? <RenderHospitals /> : null}
        {selectedMenu == 2 ? <RenderDoctors /> : null}
        {selectedMenu == 3 ? <RenderMedicine /> : null}
        {selectedMenu == 4 ? <RenderPackage /> : null}
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  mainScroller: {
    flexGrow: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: MAIN_COLOR_BG,
  },
  menuContainer: {
    borderRadius: 30,
    paddingHorizontal: 20,
    marginLeft: 10,
    justifyContent: "center",
  },
  menuText: {
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  searchInput: {
    fontFamily: FONT_FAMILY_LIGHT,
    color: TEXT_COLOR_GRAY,
    marginLeft: 10,
    width: "85%",
    height: 20,
  },
  doctorTopContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
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
    flex: 1,
    paddingHorizontal: 20,
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
    marginBottom: 10,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  logo: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
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
