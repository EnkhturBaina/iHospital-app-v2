import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  API_KEY,
  DEV_URL,
  FONT_FAMILY_BOLD,
  MAIN_COLOR,
  TEXT_COLOR_GRAY,
} from "../../constant";
import { Button } from "@rneui/themed";
import axios from "axios";
import MainContext from "../../contexts/MainContext";
import Loader from "../../components/Loader";
import Empty from "../../components/Empty";

const DoctorsScreen = (props) => {
  const state = useContext(MainContext);
  const [hospitalDoctors, setHospitalDoctors] = useState("");
  const [loadingDoctors, setLoadingDoctors] = useState(false);

  const getDoctorList = async () => {
    setHospitalDoctors([]);
    setLoadingDoctors(true);
    //***** Эмчийн жагсаалт
    await axios({
      method: "get",
      url: `${DEV_URL}mobile/department-doctors`,
      params: {
        hospitalId: state.appointmentData.hospital.id,
        departmentId: state.appointmentData.structure?.id,
      },
      headers: {
        "X-API-KEY": API_KEY,
        Authorization: `Bearer ${state.accessToken}`,
      },
    })
      .then(async (response) => {
        // console.log("response get HospitalList", JSON.stringify(response.data));
        if (response.status == 200) {
          setHospitalDoctors(response.data.response.data);
        }
        setLoadingDoctors(false);
      })
      .catch(function (error) {
        console.log("err", error);
        setLoadingDoctors(false);
        console.log("errr", error.response.status);
        if (error?.response?.status == 401) {
          state.setLoginError("Холболт салсан байна дахин нэвтэрнэ үү.");
          state.logout();
        }
      });
  };
  useEffect(() => {
    getDoctorList();
    return () => {
      state.setAppointmentData((prevState) => ({
        ...prevState,
        doctor: "",
      }));
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {hospitalDoctors == "" && !loadingDoctors ? (
        <Empty type="empty" text="Эмч олдсонгүй" />
      ) : null}
      <ScrollView contentContainerStyle={styles.mainScroller} bounces={false}>
        {loadingDoctors ? (
          <Loader />
        ) : (
          hospitalDoctors &&
          hospitalDoctors?.map((el, index) => {
            return (
              <TouchableOpacity
                style={[
                  styles.menuItem,
                  {
                    backgroundColor:
                      state.appointmentData.doctor.id == el.id
                        ? MAIN_COLOR
                        : "#fff",
                  },
                ]}
                key={index}
                onPress={() => {
                  state.setAppointmentData((prevState) => ({
                    ...prevState,
                    doctor: el,
                  }));
                }}
              >
                <Text
                  style={[
                    styles.menuText,
                    {
                      color:
                        state.appointmentData.doctor.id == el.id
                          ? "#fff"
                          : MAIN_COLOR,
                    },
                  ]}
                >
                  {el.lastName?.substr(0, 1) + ". " + el.firstName}
                </Text>
                <Text
                  style={[
                    styles.depText,
                    {
                      color:
                        state.appointmentData.doctor.id == el.id
                          ? "#fff"
                          : TEXT_COLOR_GRAY,
                    },
                  ]}
                >
                  {el.degree?.name}
                </Text>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>

      <View
        style={{
          width: "80%",
          marginRight: "auto",
          marginLeft: "auto",
          marginTop: 10,
          marginBottom: Platform.OS == "ios" ? 20 : 10,
        }}
      >
        <Button
          disabled={state.appointmentData.doctor == ""}
          title="Үргэлжлүүлэх (2/5)"
          color={MAIN_COLOR}
          radius={12}
          onPress={() => {
            props.navigation.navigate("DoctorAppointmentStep2");
          }}
          titleStyle={{
            fontFamily: FONT_FAMILY_BOLD,
          }}
          buttonStyle={{ height: 45 }}
        />
      </View>
    </View>
  );
};

export default DoctorsScreen;

const styles = StyleSheet.create({
  mainScroller: {
    flexGrow: 1,
    flexDirection: "column",
    marginTop: 10,
    paddingBottom: 10,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    width: "90%",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 2,
    marginBottom: 10,
    alignItems: "center",
    height: 60,
    marginLeft: "auto",
    marginRight: "auto",
  },
  menuText: {
    width: "100%",
    color: MAIN_COLOR,
    flex: 1,
    fontWeight: "500",
    lineHeight: 16,
    fontFamily: FONT_FAMILY_BOLD,
  },
  depText: {
    width: "100%",
    color: MAIN_COLOR,
    flex: 1,
  },
});
