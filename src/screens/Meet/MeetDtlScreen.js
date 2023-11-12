import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useRef, useState } from "react";
import moment from "moment";
import "moment/locale/mn";
import { Button, Icon } from "@rneui/base";
import {
  API_KEY,
  DEV_URL,
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  MAIN_COLOR,
} from "../../constant";
import RBSheet from "react-native-raw-bottom-sheet";
import { Divider } from "react-native-paper";
import axios from "axios";
import MainContext from "../../contexts/MainContext";
import CustomSnackbar from "../../components/CustomSnackbar";

const MeetDtlScreen = (props) => {
  const state = useContext(MainContext);
  const hospitalData = props.route?.params?.hospitalData;
  const appointmentData = props.route?.params?.appointmentData;
  const refRBSheet = useRef();

  const [visibleSnack, setVisibleSnack] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState("");
  //Snacbkbar харуулах
  const onToggleSnackBar = (msg) => {
    setVisibleSnack(!visibleSnack);
    setSnackBarMsg(msg);
  };

  //Snacbkbar хаах
  const onDismissSnackBar = () => setVisibleSnack(false);

  const changeSlotStatus = async (app_id) => {
    await axios({
      method: "patch",
      url: `${DEV_URL}mobile/return-appointment/${app_id}`,
      headers: {
        "X-API-KEY": API_KEY,
        Authorization: `Bearer ${state.accessToken}`,
      },
      data: {
        hospitalId: hospitalData.id,
      },
    })
      .then(async (response) => {
        // console.log("get History", JSON.stringify(response.data));
        if (response.status == 200) {
          onToggleSnackBar("Уулзалт цуцлагдлаа.");
        }
      })
      .catch(function (error) {
        console.log("err", error);
        console.log("error get History", error.response.data);
        if (error?.response?.status == 401) {
          state.setLoginError("Холболт салсан байна дахин нэвтэрнэ үү.");
          state.logout();
        }
      });
  };
  return (
    <ScrollView contentContainerStyle={styles.mainScroller}>
      <CustomSnackbar
        visible={visibleSnack}
        dismiss={onDismissSnackBar}
        text={snackBarMsg}
        topPos={0}
      />
      <Text style={styles.titleText}>Уулзалтын мэдээлэл</Text>
      <View style={styles.cardContainer}>
        <View style={styles.rowContainer}>
          <Text style={{ fontFamily: FONT_FAMILY_LIGHT }}>Огноо</Text>
          <Text style={{ fontFamily: FONT_FAMILY_BOLD }}>
            {moment(appointmentData.slots?.schedule?.workDate)
              .locale("mn")
              .format("dddd, YYYY/MM/DD")}
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={{ fontFamily: FONT_FAMILY_LIGHT }}>Цаг</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontFamily: FONT_FAMILY_BOLD, marginRight: 5 }}>
              {appointmentData.slot?.startTime?.substr(0, 5)}
            </Text>
            <Icon name="clock" type="feather" size={15} color="#000" />
            <Text style={{ fontFamily: FONT_FAMILY_BOLD, marginLeft: 5 }}>
              {appointmentData.slot?.endTime?.substr(0, 5)}
            </Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <Text style={{ fontFamily: FONT_FAMILY_LIGHT }}>Төлбөр</Text>
          <Text style={{ fontFamily: FONT_FAMILY_BOLD }}>0 ₮</Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.rowContainer}>
          <Text style={{ fontFamily: FONT_FAMILY_LIGHT }}>Эмнэлэг</Text>
          <Text style={{ fontFamily: FONT_FAMILY_BOLD }}>
            {hospitalData.name}
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={{ fontFamily: FONT_FAMILY_LIGHT }}>Холбоо барих</Text>
          <Text style={{ fontFamily: FONT_FAMILY_BOLD }}>
            {hospitalData.phone ?? "-"}
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={{ fontFamily: FONT_FAMILY_LIGHT }}>Эмч</Text>
          <Text style={{ fontFamily: FONT_FAMILY_BOLD }}>
            {appointmentData?.employee?.lastName?.substr(0, 1) +
              ". " +
              appointmentData?.employee?.firstName}
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={{ fontFamily: FONT_FAMILY_LIGHT }}>Өрөө</Text>
          <Text style={{ fontFamily: FONT_FAMILY_BOLD }}>
            {appointmentData.slots?.schedule?.room?.roomNumber ?? "-"}
          </Text>
        </View>
      </View>
      <Text style={styles.titleText}>{hospitalData.address ?? "-"}</Text>
      <Button
        title="Цуцлах"
        color={MAIN_COLOR}
        radius={12}
        onPress={() => refRBSheet.current.open()}
        titleStyle={{
          fontFamily: FONT_FAMILY_BOLD,
        }}
      />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        dragFromTopOnly={true}
        height={300}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(52, 52, 52, 0.8)",
          },
          container: {
            flexDirection: "column",
            borderTopStartRadius: 16,
            borderTopEndRadius: 16,
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            paddingVertical: Platform.OS == "ios" ? 20 : 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: FONT_FAMILY_BOLD,
              fontSize: 24,
              color: "#E34935",
            }}
          >
            Уулзалт цуцлах
          </Text>
          <Divider style={{ marginVertical: 10 }} />
          <Text
            style={{
              fontFamily: FONT_FAMILY_LIGHT,
              marginTop: 20,
              textAlign: "center",
            }}
          >
            Уулзалт цуцлахдаа та итгэлтэй байна уу?
          </Text>
          <Text
            style={{
              fontFamily: FONT_FAMILY_LIGHT,
              textAlign: "center",
              marginVertical: 20,
              marginHorizontal: 40,
            }}
          >
            Төлбөрийн 50% ийг зөвхөн буцааж таны дансруу шилжүүлэх болхыг
            анхаарна уу!
          </Text>
          <Divider style={{ marginTop: 10, marginBottom: 20 }} />
          <View style={styles.bottomBtns}>
            <Button
              title="Буцах"
              containerStyle={{ width: "48%" }}
              color="#c9d9ec"
              radius={12}
              onPress={() => {
                refRBSheet.current.close();
              }}
              titleStyle={{
                fontFamily: FONT_FAMILY_LIGHT,
                color: MAIN_COLOR,
              }}
            />
            <Button
              title={
                appointmentData.status != 3
                  ? "Уулзалт цуцлах"
                  : "Уулзалт цуцлагдсан"
              }
              containerStyle={{ width: "48%" }}
              color="#E34935"
              radius={12}
              onPress={() => {
                appointmentData.status != 3
                  ? changeSlotStatus(appointmentData.id)
                  : null;
                refRBSheet.current.close();
              }}
              titleStyle={{
                fontFamily: FONT_FAMILY_LIGHT,
              }}
            />
          </View>
        </View>
      </RBSheet>
    </ScrollView>
  );
};

export default MeetDtlScreen;

const styles = StyleSheet.create({
  mainScroller: {
    flexGrow: 1,
    marginHorizontal: 20,
    paddingBottom: 20,
  },
  cardContainer: {
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 2,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  titleText: {
    fontFamily: FONT_FAMILY_BOLD,
    marginTop: 10,
    marginLeft: 5,
  },
  bottomBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
});
