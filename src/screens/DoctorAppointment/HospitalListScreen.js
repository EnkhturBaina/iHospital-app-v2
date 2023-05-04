import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  RefreshControl,
} from "react-native";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";
import hospital from "../../../assets/hospital.png";
import {
  API_KEY,
  DEV_URL,
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  MAIN_COLOR,
  MAIN_COLOR_BG,
  MAIN_COLOR_GRAY,
  TEXT_COLOR_GRAY,
} from "../../constant";
import { Icon } from "@rneui/base";
import axios from "axios";
import MainContext from "../../contexts/MainContext";
import Loader from "../../components/Loader";
import hospitalAvatar from "../../../assets/hospitalAvatar.png";
import Empty from "../../components/Empty";

const HospitalListScreen = (props) => {
  const state = useContext(MainContext);
  const [searchValue, setSearchValue] = useState("");

  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    state.getHospitalList();
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

  useEffect(() => {
    state.getHospitalList();
  }, []);

  const navigateHospitalDtl = (hospital_data) => {
    state.setSelectedHospital(hospital_data);
    props.navigation.navigate("HospitalStructuresScreen");
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.searchContainer}>
        <Icon name="search" type="feather" size={20} color={TEXT_COLOR_GRAY} />
        <TextInput
          style={styles.searchInput}
          onChangeText={setSearchValue}
          value={searchValue}
          placeholder="Хайх"
        />
        <Icon name="sliders" type="feather" size={20} color={TEXT_COLOR_GRAY} />
      </View>
      <ScrollView
        contentContainerStyle={styles.mainScroller}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={MAIN_COLOR}
            colors={[MAIN_COLOR]}
          />
        }
      >
        {state.loadingHospitals ? (
          <Loader />
        ) : (
          state.hospitalList &&
          state.hospitalList
            ?.filter((obj) =>
              obj.name?.toLowerCase()?.includes(searchValue?.toLowerCase())
            )
            .map((el, index) => {
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

export default HospitalListScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: MAIN_COLOR_BG,
    paddingTop: 10,
  },
  searchInput: {
    fontFamily: FONT_FAMILY_BOLD,
    color: TEXT_COLOR_GRAY,
    marginLeft: 10,
    width: "85%",
  },
  mainScroller: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
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
    marginTop: 10,
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
