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
import React, { useState, useContext, useEffect } from "react";
import { API_KEY, DEV_URL, MAIN_COLOR, MAIN_COLOR_BG } from "../constant";
import { useHeaderHeight } from "@react-navigation/elements";
import { Button, Icon } from "@rneui/base";
import CustomSnackbar from "../components/CustomSnackbar";
import CustomDialog from "../components/CustomDialog";
import MainContext from "../contexts/MainContext";
import BottomSheet from "../components/BottomSheet";
import avatar from "../../assets/avatar.png";
import axios from "axios";

const EditUserDataScreen = () => {
  const state = useContext(MainContext);
  const headerHeight = useHeaderHeight();
  const [editableData, setEditableData] = useState("");

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

  useEffect(() => {
    setEditableData(state.userData?.globalPatient);
  }, []);

  const editUserData = async () => {
    if (editableData.email == "") {
      onToggleSnackBar("И-мэйл оруулна уу.");
    } else if (!regex_email.test(editableData.email)) {
      onToggleSnackBar("И-мэйл хаягаа зөв оруулна уу.");
    } else if (editableData.phoneNo == "") {
      onToggleSnackBar("Утасны дугаараа оруулна уу.");
    } else {
      setLoadingAction(true);
      await axios({
        method: "patch",
        url: `${DEV_URL}mobile/patient-user`,
        headers: {
          "X-API-KEY": API_KEY,
          Authorization: `Bearer ${state.accessToken}`,
        },
        data: {
          id: editableData?.id,
          email: editableData?.email,
          phoneNo: editableData?.phoneNo,
        },
      })
        .then(async (response) => {
          if (response.status == 201) {
            state.setUserData((prevState) => ({
              ...prevState,
              globalPatient: editableData,
            }));
            setDialogText("Мэдээлэл амжилттай засварлагдлаа");
            setDialogType("success");
            setVisibleDialog(true);
          }
          setLoadingAction(false);
        })
        .catch(function (error) {
          setLoadingAction(false);
          console.log("err", error);
          console.log("error get History", error.response.data);
          if (error?.response?.status == 401) {
            state.setLoginError("Холболт салсан байна дахин нэвтэрнэ үү.");
            state.logout();
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
        <Image
          source={avatar}
          resizeMode="contain"
          style={styles.avatarStyle}
        />
        <View style={styles.sectionStyle}>
          <TextInput
            editable={false}
            placeholder="Овог"
            value={editableData.lastName}
            style={styles.generalInput}
          />
        </View>
        <View style={styles.sectionStyle}>
          <TextInput
            editable={false}
            placeholder="Нэр"
            value={editableData.firstName}
            style={styles.generalInput}
          />
        </View>

        <View style={styles.charContainer}>
          <TouchableOpacity style={styles.regCharOpacity} disabled>
            <Text style={styles.onlyChar}>
              {editableData?.registerNumber?.substr(0, 1)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity disabled style={styles.regCharOpacity}>
            <Text style={styles.onlyChar}>
              {editableData?.registerNumber?.substr(1, 1)}
            </Text>
          </TouchableOpacity>

          <TextInput
            editable={false}
            placeholder="Регистр"
            value={editableData?.registerNumber?.substr(2, 8)}
            keyboardType="number-pad"
            style={styles.onlyRegNum}
            returnKeyType="done"
            maxLength={8}
          />
        </View>
        <View style={styles.sectionStyle}>
          <Icon
            style={styles.inputIcon}
            name="edit"
            type="feather"
            size={20}
            color="#000"
          />
          <TextInput
            placeholder="И-мэйл"
            value={editableData?.email}
            onChangeText={(e) =>
              setEditableData((prevState) => ({
                ...prevState,
                email: e,
              }))
            }
            keyboardType="email-address"
            style={styles.generalInputIcon}
          />
        </View>
        {/* <CustomLookup
          value={userData.region?.name}
          press={() => {
            setLookupData(testArr, "region", "name");
          }}
          placeholder="Улс"
          iconType="ion-icons"
          iconName="flag"
        /> */}
        <View style={styles.sectionStyle}>
          <Icon
            style={styles.inputIcon}
            name="edit"
            type="feather"
            size={20}
            color="#000"
          />
          <TextInput
            placeholder="Утасны дугаар"
            value={editableData?.phoneNo}
            onChangeText={(e) =>
              setEditableData((prevState) => ({
                ...prevState,
                phoneNo: e,
              }))
            }
            keyboardType="number-pad"
            style={styles.generalInputIcon}
            maxLength={8}
            returnKeyType={"done"}
          />
        </View>
        {/* <CustomLookup
          value={userData.gender?.name}
          press={() => {
            setLookupData(testArr, "gender", "name");
          }}
          placeholder="Хүйс"
          iconType="material-community"
          iconName="heart-multiple"
        /> */}
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
          onPress={() => editUserData()}
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
  inputIcon: {
    marginLeft: 15,
    marginHorizontal: 10,
  },
  generalInputIcon: {
    width: "80%",
    height: 50,
    paddingHorizontal: 10,
  },
  generalInput: {
    width: "80%",
    height: 50,
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
    borderWidth: 3,
    alignSelf: "center",
    marginVertical: 10,
  },
  sectionStyle: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  inputIcon: {
    marginLeft: 15,
    marginHorizontal: 10,
  },
});
