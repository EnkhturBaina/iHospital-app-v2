import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MainContext from "../../contexts/MainContext";
import avatar from "../../../assets/avatar.png";
import {
  API_KEY,
  BUTTON_BORDER_RADIUS,
  DEV_URL,
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  MAIN_COLOR,
  MAIN_COLOR_GRAY_BG,
} from "../../constant";
import { Divider, Icon, Button } from "@rneui/base";
import axios from "axios";

const DoctorAppointmentStep3 = (props) => {
  const state = useContext(MainContext);
  const [loadingAction, setLoadingAction] = useState(false);
  const createAppointment = async () => {
    setLoadingAction(true);
    await axios({
      method: "post",
      url: `${DEV_URL}mobile/payment-appointment`,
      headers: {
        "X-API-KEY": API_KEY,
        Authorization: `Bearer ${state.accessToken}`,
      },
      data: {
        invoiceId: state.invoiceData.id,
        hospitalId: state.appointmentData.hospital.id,
      },
    })
      .then(async (response) => {
        // console.log("create Invoice", response.status);
        if (response.status == 201) {
          props.navigation.reset({
            index: 0,
            routes: [{ name: "HomeTab" }],
          });
        }
        setLoadingAction(false);
      })
      .catch(function (error) {
        setLoadingAction(false);
        console.log("error create Invoice", error.response);
        if (error.response.status == 400) {
        } else if (error?.response?.status == 401) {
          state.setLoginError("Холболт салсан байна дахин нэвтэрнэ үү.");
          state.logout();
        }
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.mainContainer} bounces={false}>
      <View style={styles.doctorTopContainer}>
        <Image source={avatar} resizeMode="contain" style={styles.avatar} />
        <View style={styles.titleContainer}>
          <Text style={styles.doctorName}>
            {state.appointmentData?.doctor?.lastName?.substr(0, 1) +
              ". " +
              state.appointmentData?.doctor?.firstName}
          </Text>
          <Divider style={{ marginTop: 10, marginRight: 10 }} />
          <Text style={styles.doctorPosition}>
            {state.appointmentData.department?.name}
          </Text>

          <Text style={styles.doctorHospital}>
            {state.selectedHospital?.name}
          </Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.eachRow}>
          <Text style={{ fontFamily: FONT_FAMILY_LIGHT }}>Төрөл</Text>
          <Text style={{ fontFamily: FONT_FAMILY_BOLD }}>
            {state.invoiceData?.name}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text style={{ fontFamily: FONT_FAMILY_LIGHT }}>Цаг авсан</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontFamily: FONT_FAMILY_BOLD }}>
              {`${state.appointmentData.date} - `}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: FONT_FAMILY_BOLD }}>
                {state.appointmentData.time.startTime?.substr(0, 5)}
              </Text>
              <Icon
                name="clock"
                type="feather"
                size={15}
                style={{ marginHorizontal: 5 }}
              />
              <Text style={{ fontFamily: FONT_FAMILY_BOLD }}>
                {state.appointmentData.time.endTime?.substr(0, 5)}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.eachRow}>
          <Text style={{ fontFamily: FONT_FAMILY_LIGHT }}>Өрөө</Text>
          <Text style={{ fontFamily: FONT_FAMILY_BOLD }}>
            {state.appointmentData?.schedule?.room?.roomNumber}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text style={{ fontFamily: FONT_FAMILY_LIGHT }}>Үнийн дүн</Text>
          <Text style={{ fontFamily: FONT_FAMILY_BOLD }}>
            {`${state.invoiceData?.amount
              ?.toString()
              ?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} ₮`}
          </Text>
        </View>
      </View>
      <Button
        disabled={loadingAction}
        containerStyle={styles.btnContainer}
        title={
          <>
            <Text
              style={{
                fontSize: 16,
                color: "#fff",
                fontFamily: FONT_FAMILY_BOLD,
              }}
            >
              Үргэлжүүлэх
            </Text>
            {loadingAction ? (
              <ActivityIndicator style={{ marginLeft: 5 }} color="#fff" />
            ) : null}
          </>
        }
        color={MAIN_COLOR}
        radius={BUTTON_BORDER_RADIUS}
        // onPress={() => props.navigation.navigate("DoctorAppointmentStep4")}
        onPress={() => {
          createAppointment();
        }}
        titleStyle={{
          fontFamily: FONT_FAMILY_BOLD,
        }}
        buttonStyle={{ height: 45 }}
      />
    </ScrollView>
  );
};

export default DoctorAppointmentStep3;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: MAIN_COLOR_GRAY_BG,
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
    padding: 10,
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
  cardContainer: {
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
    paddingVertical: 10,
  },
  eachRow: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: 5,
    paddingHorizontal: 20,
  },
  btnContainer: {
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 10,
    width: "100%",
  },
});
