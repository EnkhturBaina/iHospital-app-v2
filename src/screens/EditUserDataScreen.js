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
  Image,
} from "react-native";
import React, { useState, useRef, useContext } from "react";
import { MAIN_COLOR, REG_CHARS, MAIN_COLOR_BG } from "../constant";
import { useHeaderHeight } from "@react-navigation/elements";
import { Button } from "@rneui/base";
import BottomSheetReg from "../components/BottomSheetReg";
import CustomSnackbar from "../components/CustomSnackbar";
import CustomDialog from "../components/CustomDialog";
import MainContext from "../contexts/MainContext";
import CustomLookup from "../components/CustomLookup";
import BottomSheet from "../components/BottomSheet";
import avatar from "../../assets/avatar.png";

const EditUserDataScreen = () => {
  const state = useContext(MainContext);
  const headerHeight = useHeaderHeight();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [regCharA, setRegCharA] = useState("A");
  const [regCharB, setRegCharB] = useState("A");
  const [regNumber, setRegNumber] = useState("");

  const refRBSheet = useRef();
  const refRBSheet2 = useRef();
  const testArr = [
    { id: 1, name: "TEST1" },
    { id: 2, name: "TEST2" },
    { id: 3, name: "TEST3" },
  ];
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

  const [data, setData] = useState(""); //BottomSheet рүү дамжуулах Дата
  const [uselessParam, setUselessParam] = useState(false); //BottomSheet -г дуудаж байгааг мэдэх гэж ашиглаж байгамоо
  const [fieldName, setFieldName] = useState(""); //Context -н аль утгыг OBJECT -с update хийхийг хадгалах
  const [displayName, setDisplayName] = useState(""); //LOOKUP -д харагдах утга (display value)

  const [dialogText, setDialogText] = useState(""); //Dialog -н текст
  const [visibleDialog, setVisibleDialog] = useState(false); //Dialog харуулах
  const [dialogType, setDialogType] = useState("warning"); //Dialog харуулах төрөл

  const [loadingAction, setLoadingAction] = useState(false);

  const setLookupData = (data, field, display) => {
    // console.log("refRBSheet", refRBSheet);
    setData(data); //Lookup -д харагдах дата
    setFieldName(field); //Context -н object -н update хийх key
    setDisplayName(display); //Lookup -д харагдах датаны текст талбар
    setUselessParam(!uselessParam);
  };

  const [userData, setUserData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    region: "",
    phone: "",
    gender: "",
  });

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
        topPos={30}
      />
      <ScrollView bounces={false} contentContainerStyle={styles.mainContainer}>
        <Image
          source={avatar}
          resizeMode="contain"
          style={styles.avatarStyle}
        />
        <View style={styles.sectionStyle}>
          <TextInput
            placeholder="Овог"
            value={userData.lastName}
            onChangeText={(e) =>
              setUserData((prevState) => ({
                ...prevState,
                lastName: e,
              }))
            }
            style={styles.generalInput}
          />
        </View>
        <View style={styles.sectionStyle}>
          <TextInput
            placeholder="Нэр"
            value={userData.firstName}
            onChangeText={(e) =>
              setUserData((prevState) => ({
                ...prevState,
                firstName: e,
              }))
            }
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
          <TextInput
            placeholder="И-мэйл"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.generalInput}
          />
        </View>
        <CustomLookup
          value={userData.region?.name}
          press={() => {
            setLookupData(testArr, "region", "name");
          }}
          placeholder="Улс"
          iconType="ion-icons"
          iconName="flag"
        />
        <View style={styles.sectionStyle}>
          <TextInput
            placeholder="Утасны дугаар"
            value={phone}
            onChangeText={setPhone}
            keyboardType="number-pad"
            style={styles.generalInput}
            maxLength={8}
          />
        </View>
        <CustomLookup
          value={userData.gender?.name}
          press={() => {
            setLookupData(testArr, "gender", "name");
          }}
          placeholder="Хүйс"
          iconType="material-community"
          iconName="heart-multiple"
        />
        <Button
          disabled={loadingAction}
          containerStyle={styles.btnContainer}
          title={
            <>
              <Text
                style={{
                  fontSize: 16,
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Засварлах
              </Text>
              {loadingAction ? (
                <ActivityIndicator style={{ marginLeft: 5 }} color="#fff" />
              ) : null}
            </>
          }
          color={MAIN_COLOR}
          radius={12}
          onPress={() => {}}
          titleStyle={{
            fontWeight: "bold",
          }}
          buttonStyle={{ height: 45 }}
        />
        <CustomDialog
          visible={visibleDialog}
          confirmFunction={() => {
            setVisibleDialog(false);
          }}
          declineFunction={() => {}}
          text={dialogText}
          confirmBtnText="Хаах"
          DeclineBtnText=""
          type={dialogType}
        />
        <BottomSheet
          bodyText={data}
          dragDown={true}
          backClick={true}
          type="lookup"
          fieldName={fieldName}
          displayName={displayName}
          handle={uselessParam}
          action={(e) =>
            setUserData((prevState) => ({
              ...prevState,
              [fieldName]: e,
            }))
          }
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditUserDataScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    backgroundColor: MAIN_COLOR_BG,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  btnContainer: {
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",
  },
  sectionStyle: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",
    marginBottom: 10,
  },
  inputIcon: {
    marginLeft: 15,
    marginHorizontal: 10,
  },
  generalInput: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 20,
  },
  regCharOpacity: {
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    marginRight: 10,
    backgroundColor: "#fff",
  },
  charContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",
    height: 50,
    marginBottom: 10,
  },
  onlyRegNum: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#fff",
  },
  onlyChar: {
    textAlign: "center",
    fontSize: 16,
  },
  avatarStyle: {
    width: 160,
    height: 160,
    borderRadius: 280,
    borderColor: MAIN_COLOR,
    borderWidth: 5,
    alignSelf: "center",
    marginVertical: 10,
  },
});
