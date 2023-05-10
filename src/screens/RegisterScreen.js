import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useRef, useContext } from "react";
import LoanTerm from "../components/LoanTerm";
import {
  API_KEY,
  DEV_URL,
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  INPUT_BORDER_RADIUS,
  MAIN_COLOR,
  MAIN_COLOR_GRAY_BG,
  REG_CHARS,
  TEXT_COLOR_GRAY,
} from "../constant";
import { useHeaderHeight } from "@react-navigation/elements";
import { Button, Icon } from "@rneui/base";
import BottomSheetReg from "../components/BottomSheetReg";
import axios from "axios";
import CustomSnackbar from "../components/CustomSnackbar";
import CustomDialog from "../components/CustomDialog";
import MainContext from "../contexts/MainContext";

const RegisterScreen = (props) => {
  const state = useContext(MainContext);
  const headerHeight = useHeaderHeight();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [regCharA, setRegCharA] = useState("A");
  const [regCharB, setRegCharB] = useState("A");
  const [regNumber, setRegNumber] = useState("");

  const refRBSheet = useRef();
  const refRBSheet2 = useRef();

  const regex_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  const [visibleSnack, setVisibleSnack] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState("");
  //Snacbkbar харуулах
  const onToggleSnackBar = (msg) => {
    setVisibleSnack(!visibleSnack);
    setSnackBarMsg(msg);
  };

  //Snacbkbar хаах
  const onDismissSnackBar = () => setVisibleSnack(false);

  const [dialogText, setDialogText] = useState(""); //Dialog -н текст
  const [visibleDialog, setVisibleDialog] = useState(false); //Dialog харуулах
  const [dialogType, setDialogType] = useState("warning"); //Dialog харуулах төрөл

  const [loadingAction, setLoadingAction] = useState(false);

  const registerUser = async () => {
    //***** Хэрэглэгч бүртгэх
    if (lastName == "") {
      onToggleSnackBar("Овог оруулна уу");
    } else if (firstName == "") {
      onToggleSnackBar("Нэр оруулна уу");
    } else if (regCharA == "" || regCharB == "" || regNumber.length != 8) {
      onToggleSnackBar("Регистр оруулна уу");
    } else if (phone == "") {
      onToggleSnackBar("Утасны дугаар оруулна уу");
    } else if (phone.length != 8) {
      onToggleSnackBar("Утасны дугаараа бүрэн оруулна уу");
    } else if (email == "") {
      onToggleSnackBar("И-мэйл оруулна уу");
    } else if (!regex_email.test(email)) {
      onToggleSnackBar("И-мэйл хаягаа зөв оруулна уу.");
    } else if (!state.termCheck) {
      onToggleSnackBar("Үйлчилгээний нөхцөл зөвшөөрнө үү.");
    } else {
      setLoadingAction(true);
      await axios({
        method: "post",
        url: `${DEV_URL}mobile/patient-user`,
        headers: {
          "X-API-KEY": API_KEY,
        },
        data: {
          email: email.toLowerCase(),
          firstName,
          lastName,
          phoneNo: phone,
          registerNumber: `${regCharA}${regCharB}${regNumber}`,
          isGlobalDb: true,
        },
      })
        .then(async (response) => {
          // console.log("responee register User", response.data);
          if (response.status == 201) {
            setDialogType("success");
            setDialogText("Таны нэвтрэх мэдээллийг и-мэйлээр илгээлээ");
            setVisibleDialog(true);
          }
          setLoadingAction(false);
        })
        .catch(function (error) {
          setLoadingAction(false);
          console.log("error register User", error.response);
          if (error.response.data.status == 409) {
            setDialogType("warning");
            setDialogText(error.response.data.message);
            setVisibleDialog(true);
          }
        });
    }
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={headerHeight}
      behavior={Platform.OS == "ios" ? "padding" : ""}
      style={{
        flex: 1,
      }}
    >
      <CustomSnackbar
        visible={visibleSnack}
        dismiss={onDismissSnackBar}
        text={snackBarMsg}
        topPos={0}
      />
      <ScrollView bounces={false} contentContainerStyle={styles.mainContainer}>
        <View style={styles.sectionStyle}>
          <Icon
            name="user"
            type="font-awesome"
            size={20}
            color={TEXT_COLOR_GRAY}
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Овог"
            value={lastName}
            onChangeText={setLastName}
            style={styles.generalInput}
          />
        </View>
        <View style={styles.sectionStyle}>
          <Icon
            name="user"
            type="font-awesome"
            size={20}
            color={TEXT_COLOR_GRAY}
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Нэр"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.generalInput}
          />
        </View>

        <View style={styles.charContainer}>
          <TouchableOpacity
            onPress={() => refRBSheet.current.open()}
            style={styles.regCharOpacity}
          >
            <Text style={styles.onlyChar}>{regCharA}</Text>
            <BottomSheetReg
              sheetRef={refRBSheet}
              bodyText={REG_CHARS}
              sheetheight={320}
              setDataFunction={setRegCharA}
              dragDown={true}
              backClick={true}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => refRBSheet2.current.open()}
            style={styles.regCharOpacity}
          >
            <Text style={styles.onlyChar}>{regCharB}</Text>
            <BottomSheetReg
              sheetRef={refRBSheet2}
              bodyText={REG_CHARS}
              sheetheight={320}
              setDataFunction={setRegCharB}
              dragDown={true}
              backClick={true}
            />
          </TouchableOpacity>

          <TextInput
            placeholder="Регистр"
            value={regNumber}
            onChangeText={setRegNumber}
            keyboardType="number-pad"
            style={styles.onlyRegNum}
            returnKeyType="done"
            maxLength={8}
          />
        </View>
        <View style={styles.sectionStyle}>
          <Icon
            name="mobile"
            type="entypo"
            size={20}
            color={TEXT_COLOR_GRAY}
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Утасны дугаар"
            value={phone}
            onChangeText={setPhone}
            keyboardType="number-pad"
            style={styles.generalInput}
            maxLength={8}
          />
        </View>
        <View style={styles.sectionStyle}>
          <Icon
            name="mail"
            type="entypo"
            size={20}
            color={TEXT_COLOR_GRAY}
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="И-мэйл"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.generalInput}
          />
        </View>
        <LoanTerm />
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
          radius={12}
          onPress={() => registerUser()}
          titleStyle={{
            fontFamily: FONT_FAMILY_BOLD,
          }}
          buttonStyle={{ height: 45 }}
        />
        <CustomDialog
          visible={visibleDialog}
          confirmFunction={() => {
            setVisibleDialog(false);
            dialogType == "success" ? props.navigation.goBack() : null;
          }}
          declineFunction={() => {}}
          text={dialogText}
          confirmBtnText="Хаах"
          DeclineBtnText=""
          type={dialogType}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  btnContainer: {
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 20,
    width: "100%",
  },
  sectionStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: TEXT_COLOR_GRAY,
    height: 50,
    borderRadius: INPUT_BORDER_RADIUS,
    margin: 10,
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",
  },
  inputIcon: {
    marginLeft: 15,
    marginHorizontal: 10,
  },
  generalInput: {
    width: "100%",
    height: 50,
    fontFamily: FONT_FAMILY_LIGHT,
  },
  regCharOpacity: {
    height: 50,
    fontFamily: FONT_FAMILY_LIGHT,
    borderWidth: 1,
    borderRadius: INPUT_BORDER_RADIUS,
    borderColor: TEXT_COLOR_GRAY,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    marginRight: 10,
  },
  charContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",
    height: 50,
    marginVertical: 10,
  },
  onlyRegNum: {
    borderWidth: 0.5,
    borderColor: TEXT_COLOR_GRAY,
    borderRadius: INPUT_BORDER_RADIUS,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontFamily: FONT_FAMILY_LIGHT,
    flex: 1,
  },
  onlyChar: {
    textAlign: "center",
    fontSize: 16,
  },
});
