import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from "react-native";
import React, {
  useLayoutEffect,
  useRef,
  useEffect,
  useState,
  useContext,
} from "react";
import hospitalbg from "../../../assets/hospitalbg.png";
import hospital from "../../../assets/hospital.png";
import {
  API_KEY,
  DEV_URL,
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  MAIN_COLOR,
  MAIN_COLOR_GRAY_BG,
  TEXT_COLOR_GRAY,
} from "../../constant";
import { Icon, Divider } from "@rneui/base";
import stethoscope from "../../../assets/stethoscope.png";
import card_bg from "../../../assets/card-bg.png";
import MainContext from "../../contexts/MainContext";
import axios from "axios";
import Loader from "../../components/Loader";
import Empty from "../../components/Empty";

const HEADER_HEIGHT = 250;

const HospitalDtlScreen = (props) => {
  const state = useContext(MainContext);
  const [tabIndex, setIndex] = useState(0);
  const [doctorList, setDoctorList] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);

  useLayoutEffect(() => {
    // TabBar Hide хийх
    props.navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    // TabBar Hide хийх
  }, [props.navigation]);

  const getDoctors = async () => {
    setDoctorList([]);
    setLoadingDoctors(true);
    //***** Эмчийн жагсаалт авах
    await axios({
      method: "get",
      url: `${DEV_URL}mobile/employee`,
      params: {
        hospitalId: state.selectedHospital ? state.selectedHospital.id : null,
      },
      headers: {
        "X-API-KEY": API_KEY,
        Authorization: `Bearer ${state.accessToken}`,
      },
    })
      .then(async (response) => {
        console.log("response get Doctors", response.data.response);
        if (response.status == 200) {
          setDoctorList(response.data.response);
        }
        setLoadingDoctors(false);
      })
      .catch(function (error) {
        setLoadingDoctors(false);
        console.log("errr", error.response.data);
        if (error?.response?.status == 401) {
          state.setLoginError("Холболт салсан байна дахин нэвтэрнэ үү.");
          state.logout();
        }
        // setIsLoading(false);
      });
  };
  useEffect(() => {
    getDoctors();
  }, []);

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
              {state.selectedHospital.name ?? "-"}
            </Text>
            <Text style={styles.type}>
              {state.selectedHospital.databaseName ?? "-"}
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
                  {state.selectedHospital.address ?? "-"}
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
        {loadingDoctors ? (
          <Loader />
        ) : !loadingDoctors && doctorList == "" ? (
          <Empty text="Эмч олдсонгүй" subtext="" type="empty" />
        ) : (
          <>
            {doctorList &&
              doctorList?.map((el, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      state.setSelectedDoctor(el);
                      props.navigation.navigate("DoctorDtlScreen");
                    }}
                    style={styles.doctorTopContainer}
                    key={index}
                  >
                    <Image
                      source={stethoscope}
                      resizeMode="contain"
                      style={styles.avatar}
                    />
                    <View style={styles.titleContainer}>
                      <Text style={styles.doctorName}>
                        {el.lastName?.substr(0, 1) + ". " + el.firstName}
                      </Text>
                      <Divider style={{ marginTop: 5, marginRight: 10 }} />
                      <Text style={styles.doctorPosition}>Арьсны эмч</Text>
                      <Text style={styles.doctorHospital}>
                        {el.hospital?.name}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 5,
                        }}
                      >
                        {/* <Icon
                          name="staro"
                          type="antdesign"
                          size={20}
                          color={MAIN_COLOR}
                        /> */}
                        <Text style={styles.count}>
                          {el.workingYear ?? 0} жил ажилласан
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </>
        )}
      </ScrollView>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: Platform.OS == "ios" ? 20 : 10,
          width: "95%",
          alignSelf: "center",
        }}
        onPress={() => {
          state.resetAppontmentData();
          props.navigation.navigate("DoctorAppointmentStep1");
        }}
      >
        <ImageBackground
          source={card_bg}
          style={styles.menuContainer}
          resizeMode="cover"
        >
          <Icon name="calendar" type="feather" size={15} color="#fff" />
          <Text numberOfLines={1} style={styles.menuText}>
            Цаг авах
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default HospitalDtlScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: MAIN_COLOR_GRAY_BG,
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
  menuContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderColor: MAIN_COLOR,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: MAIN_COLOR,
    justifyContent: "center",
    paddingVertical: 10,
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
