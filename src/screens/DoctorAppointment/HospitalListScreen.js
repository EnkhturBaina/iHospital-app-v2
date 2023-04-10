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

const HospitalListScreen = (props) => {
  const state = useContext(MainContext);
  const [searchValue, setSearchValue] = useState("");
  const [hospitalList, setHospitalList] = useState([]);
  const [loadingHospitals, setLoadingHospitals] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getHospitalList();
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
    getHospitalList();
  }, []);

  const getHospitalList = async () => {
    setHospitalList([]);
    setLoadingHospitals(true);
    //***** Эмнэлэгийн жагсаалт авах
    await axios({
      method: "get",
      url: `${DEV_URL}organization/hospital`,
      headers: {
        "X-API-KEY": API_KEY,
        Authorization: `Bearer ${state.accessToken}`,
      },
    })
      .then(async (response) => {
        console.log("response get HospitalList", response.data);
        if (response.status == 200) {
          setHospitalList(response.data.response.data);
        }
        setLoadingHospitals(false);
      })
      .catch(function (error) {
        setLoadingHospitals(false);
        console.log("errr", error.response.status);
        if (error?.response?.status == 401) {
          state.setLoginError("Холболт салсан байна дахин нэвтэрнэ үү.");
          state.logout();
        }
        // setIsLoading(false);
      });
  };

  const navigateHospitalDtl = (hospital_data) => {
    state.setSelectedHospital(hospital_data);
    props.navigation.navigate("HospitalDtlScreen");
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
        {loadingHospitals ? (
          <Loader />
        ) : (
          hospitalList &&
          hospitalList
            ?.filter((obj) => obj.name?.includes(searchValue))
            ?.map((el, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.hospitalContainer}
                  onPress={() => navigateHospitalDtl(el)}
                  activeOpacity={0.6}
                >
                  <Image
                    source={hospital}
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
    marginTop: 10,
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
