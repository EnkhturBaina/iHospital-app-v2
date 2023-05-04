import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Button, CheckBox } from "@rneui/themed";
import {
  INPUT_BORDER_RADIUS,
  MAIN_COLOR,
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  TEXT_COLOR_GRAY,
} from "../constant";
import { TouchableOpacity } from "react-native";
import { Icon } from "@rneui/base";
import MainContext from "../contexts/MainContext";
import logo_blue from "../../assets/logo_blue.png";
import { useHeaderHeight } from "@react-navigation/elements";
import CustomSnackbar from "../components/CustomSnackbar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = (props) => {
  const state = useContext(MainContext);
  const headerHeight = useHeaderHeight();

  const regex_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  const [password, setPassword] = useState("WETITr");
  const [hidePassword, setHidePassword] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [borderColor, setBorderColor] = useState("");
  const [selectedInput, setSelectedInput] = useState("");

  const [visibleSnack, setVisibleSnack] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState("");
  //Snacbkbar харуулах
  const onToggleSnackBar = (msg) => {
    setVisibleSnack(!visibleSnack);
    setSnackBarMsg(msg);
  };

  //Snacbkbar хаах
  const onDismissSnackBar = () => setVisibleSnack(false);

  const hideShowPassword = () => {
    setHidePassword(!hidePassword);
  };
  useEffect(() => {
    AsyncStorage.getItem("login_email").then((res) => {
      if (res != null) {
        state.setEmail(res);
        state.setRememberEmail(true);
      }
    });
  }, []);

  const login = () => {
    if (state.email == "") {
      onToggleSnackBar("И-мэйл оруулна уу.");
    } else if (!regex_email.test(state.email)) {
      onToggleSnackBar("И-мэйл хаягаа зөв оруулна уу.");
    } else if (password == "") {
      onToggleSnackBar("Нууц үг оруулна уу.");
    } else {
      state.login(state.email, password, state.rememberEmail);
    }
    // state.login(state.email, password, state.rememberEmail);
  };
  const onFocus = (type) => {
    setSelectedInput(type == "email" ? "email" : "password");
    setBackgroundColor("#ECF5FF");
    setBorderColor(MAIN_COLOR);
  };
  const onBlur = (type) => {
    setSelectedInput("");
    setBackgroundColor("#fff");
    setBorderColor(TEXT_COLOR_GRAY);
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={headerHeight}
      behavior={Platform.OS == "ios" ? "padding" : ""}
      style={{
        flex: 1,
      }}
    >
      <ScrollView bounces={false} contentContainerStyle={styles.loginContainer}>
        <CustomSnackbar
          visible={visibleSnack}
          dismiss={onDismissSnackBar}
          text={snackBarMsg}
          topPos={30}
        />
        <Image source={logo_blue} style={styles.logo} />
        {state.loginError != "" ? (
          <Text
            style={{
              textAlign: "center",
              color: "red",
              fontFamily: FONT_FAMILY_BOLD,
            }}
          >
            {state.loginError}
          </Text>
        ) : null}
        <View
          style={[
            styles.sectionStyle,
            {
              backgroundColor:
                selectedInput == "email" ? backgroundColor : "#fff",
              borderColor:
                selectedInput == "email" ? borderColor : TEXT_COLOR_GRAY,
            },
          ]}
        >
          <Icon
            name="mail"
            type="entypo"
            size={20}
            color={selectedInput == "email" ? MAIN_COLOR : TEXT_COLOR_GRAY}
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="И-мэйл"
            value={state.email}
            onChangeText={state.setEmail}
            keyboardType="email-address"
            style={styles.generalInput}
            onFocus={() => onFocus("email")}
            onBlur={() => onBlur("email")}
          />
        </View>
        <View
          style={[
            styles.sectionStyle,
            {
              backgroundColor:
                selectedInput == "password" ? backgroundColor : "#fff",
              borderColor:
                selectedInput == "password" ? borderColor : TEXT_COLOR_GRAY,
            },
          ]}
        >
          <Icon
            name="key"
            type="ionicon"
            size={20}
            color={selectedInput == "password" ? MAIN_COLOR : TEXT_COLOR_GRAY}
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Нууц үг"
            value={password}
            onChangeText={setPassword}
            style={styles.generalInput}
            returnKeyType="done"
            secureTextEntry={hidePassword}
            onFocus={() => onFocus("password")}
            onBlur={() => onBlur("password")}
          />
          <TouchableOpacity
            style={styles.imageStyle}
            onPress={() => hideShowPassword()}
          >
            <Icon
              name={hidePassword ? "eye" : "eye-closed"}
              type="octicon"
              color={selectedInput == "password" ? MAIN_COLOR : TEXT_COLOR_GRAY}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.stackView}>
          <CheckBox
            title="Сануулах"
            checked={state.rememberEmail}
            onPress={() => state.setRememberEmail(!state.rememberEmail)}
            containerStyle={styles.checkbox}
            uncheckedIcon="checkbox-blank-outline"
            checkedIcon="checkbox-outline"
            iconType="material-community"
            checkedColor={MAIN_COLOR}
            textStyle={{
              fontFamily: FONT_FAMILY_BOLD,
              fontWeight: "normal",
            }}
          />
          <TouchableOpacity
            onPress={() => {
              if (state.email == "") {
                onToggleSnackBar("И-мэйл оруулна уу.");
              } else if (!regex_email.test(state.email)) {
                onToggleSnackBar("И-мэйл хаягаа зөв оруулна уу.");
              } else {
                props.navigation.navigate("ResetPasswordScreen", {
                  email: state.email,
                });
              }
            }}
          >
            <Text
              style={{
                fontFamily: FONT_FAMILY_LIGHT,
              }}
            >
              Нууц үг мартсан
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "80%",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <Button
            title="Нэвтрэх"
            color={MAIN_COLOR}
            radius={12}
            onPress={login}
            titleStyle={{
              fontFamily: FONT_FAMILY_BOLD,
            }}
            buttonStyle={{ height: 45 }}
          />
        </View>
        {/* <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <View>
            <Text style={{ width: 50, textAlign: "center" }}>Эсвэл</Text>
          </View>
          <View style={styles.dividerLine} />
        </View>
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialIconContainer}>
            <Image source={facebook} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIconContainer}>
            <Image source={google} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIconContainer}>
            <Image source={apple} style={styles.socialIcon} />
          </TouchableOpacity>
        </View> */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Та бүртгэл үүсгэсэн үү? </Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("RegisterScreen")}
          >
            <Text style={styles.register}>Бүртгүүлэх</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    justifyContent: "center",
  },
  logo: {
    resizeMode: "contain",
    width: "100%",
    height: 250,
    marginTop: 20,
    marginBottom: 20,
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
    width: "80%",
  },
  loginError: {
    color: "red",
    fontFamily: FONT_FAMILY_BOLD,
    textAlign: "center",
  },
  inputIcon: {
    marginLeft: 15,
    marginHorizontal: 10,
  },
  generalInput: {
    width: "80%",
    height: 50,
    fontFamily: FONT_FAMILY_LIGHT,
  },
  stackView: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    // backgroundColor: "red",
    marginRight: "auto",
    marginLeft: "auto",
  },
  checkbox: {
    marginLeft: 0,
    paddingLeft: 0,
    // paddingTop: 0,
    marginTop: 0,
    marginBottom: 0,
  },
  imageStyle: {
    position: "absolute",
    zIndex: 999,
    right: "5%",
  },
  headerLeftContainer: {
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  dividerContainer: {
    width: "80%",
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginRight: "auto",
    marginLeft: "auto",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: TEXT_COLOR_GRAY,
  },
  registerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    marginRight: "auto",
    marginLeft: "auto",
  },
  registerText: {
    color: TEXT_COLOR_GRAY,
  },
  socialContainer: {
    width: "70%",
    marginRight: "auto",
    marginLeft: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  socialIconContainer: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: INPUT_BORDER_RADIUS,
    borderWidth: 1,
    borderColor: TEXT_COLOR_GRAY,
  },
  socialIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  register: {
    color: MAIN_COLOR,
    textDecorationLine: "underline",
  },
});
