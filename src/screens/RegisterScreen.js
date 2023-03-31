import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import LoanTerm from "../components/LoanTerm";
import {
  BUTTON_BORDER_RADIUS,
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  INPUT_BORDER_RADIUS,
  MAIN_COLOR,
  MAIN_COLOR_GRAY,
  REG_CHARS,
  TEXT_COLOR_GRAY,
} from "../constant";
import { useHeaderHeight } from "@react-navigation/elements";
import { Snackbar } from "react-native-paper";
import { Button, Icon } from "@rneui/base";
import BottomSheetReg from "../components/BottomSheetReg";

const RegisterScreen = () => {
  const headerHeight = useHeaderHeight();
  const [confirmButtonDisabled, setConfirmButtonDisabled] = useState(true);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");

  const [regCharA, setRegCharA] = useState("A");
  const [regCharB, setRegCharB] = useState("A");
  const [regNumber, setRegNumber] = useState("");

  const refRBSheet = useRef();
  const refRBSheet2 = useRef();

  const [visibleSnack, setVisibleSnack] = useState("");
  const onDismiss = () => setVisibleSnack(false);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={headerHeight}
      behavior={Platform.OS == "ios" ? "padding" : ""}
      style={{
        flex: 1,
      }}
    >
      <ScrollView bounces={false} contentContainerStyle={styles.mainContainer}>
        <Snackbar
          visible={visibleSnack}
          onDismiss={onDismiss}
          wrapperStyle={{ top: 0, zIndex: 999 }}
          duration={2000}
          style={{ backgroundColor: "#89898c" }}
        >
          Утасны дугаар оруулна уу.
        </Snackbar>
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
            keyboardType="phone-address"
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
            keyboardType="phone-address"
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
              sheetheight={300}
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
              sheetheight={300}
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
        <LoanTerm />
        <Button
          containerStyle={styles.btnContainer}
          title="Үргэлжүүлэх"
          color={MAIN_COLOR}
          radius={BUTTON_BORDER_RADIUS}
          onPress={() => {}}
          titleStyle={{
            fontFamily: FONT_FAMILY_BOLD,
          }}
          buttonStyle={{ height: 45 }}
          disabled={confirmButtonDisabled}
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
