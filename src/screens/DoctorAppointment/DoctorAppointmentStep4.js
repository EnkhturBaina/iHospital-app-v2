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
import CustomDialog from "../../components/CustomDialog";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const DoctorAppointmentStep4 = (props) => {
  const state = useContext(MainContext);
  const navigation = useNavigation();
  const [loadingAction, setLoadingAction] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [dialogText, setDialogText] = useState(""); //Dialog -н текст
  const [visibleDialog, setVisibleDialog] = useState(false); //Dialog харуулах
  const [dialogType, setDialogType] = useState("warning"); //Dialog харуулах төрөл

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
        invoiceId: state.invoiceData?.id,
        hospitalId: state.selectedHospital?.id,
      },
    })
      .then(async (response) => {
        console.log("responee register User", response.status);
        if (response.status == 201) {
          setIsSuccess(true);
          setDialogType("success");
          setDialogText("Амжилттай");
          setVisibleDialog(true);
        }
        setLoadingAction(false);
      })
      .catch(function (error) {
        setLoadingAction(false);
        console.log("error register User", error);
        if (error.response.data.status == 409) {
          setDialogType("warning");
          setDialogText(error.response.data.message);
          setVisibleDialog(true);
        }
      });
  };
  return (
    <ScrollView contentContainerStyle={styles.mainContainer} bounces={false}>
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
        onPress={() => createAppointment()}
        titleStyle={{
          fontFamily: FONT_FAMILY_BOLD,
        }}
        buttonStyle={{ height: 45 }}
      />
      <CustomDialog
        visible={visibleDialog}
        confirmFunction={() => {
          setVisibleDialog(false);
          isSuccess && navigation.navigate("HomeNavtab");
        }}
        declineFunction={() => {}}
        text={dialogText}
        confirmBtnText="Хаах"
        DeclineBtnText=""
        type={dialogType}
      />
    </ScrollView>
  );
};

export default DoctorAppointmentStep4;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: MAIN_COLOR_GRAY_BG,
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  btnContainer: {
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 10,
    width: "100%",
  },
});
