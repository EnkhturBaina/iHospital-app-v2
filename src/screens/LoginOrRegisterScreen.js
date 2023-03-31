import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import moduleName from "../../assets/login-or-register.png";
import {
  BUTTON_BORDER_RADIUS,
  FONT_FAMILY_BOLD,
  MAIN_COLOR,
  TEXT_COLOR_GRAY,
} from "../constant";
import facebook from "../../assets/facebook.png";
import google from "../../assets/google.png";
import apple from "../../assets/apple.png";
import { Button } from "@rneui/base";

const LoginOrRegisterScreen = (props) => {
  return (
    <View style={styles.container}>
      <Image source={moduleName} style={styles.img} />
      <Text style={styles.title}>Нэвтрэх хэсэг</Text>
      <TouchableOpacity style={styles.socialContainer}>
        <Image source={facebook} style={styles.socialIcon} />
        <Text style={styles.socialTitle}>Facebook хаягаар нэвтрэх</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialContainer}>
        <Image source={google} style={styles.socialIcon} />
        <Text style={styles.socialTitle}>Google хаягаар нэвтрэх</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialContainer}>
        <Image source={apple} style={styles.socialIcon} />
        <Text style={styles.socialTitle}>Apple хаягаар нэвтрэх</Text>
      </TouchableOpacity>
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <View>
          <Text style={{ width: 50, textAlign: "center" }}>Эсвэл</Text>
        </View>
        <View style={styles.dividerLine} />
      </View>

      <Button
        title="Нэвтрэх"
        containerStyle={styles.loginBtn}
        color={MAIN_COLOR}
        radius={BUTTON_BORDER_RADIUS}
        onPress={() => props.navigation.navigate("LoginScreen")}
        titleStyle={{
          fontFamily: FONT_FAMILY_BOLD,
        }}
      />
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Та бүртгэл үүсэгсэн үү? </Text>
        <Text style={styles.register}>Бүртгүүлэх</Text>
      </View>
    </View>
  );
};

export default LoginOrRegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  img: {
    width: "50%",
    height: "30%",
    resizeMode: "contain",
  },
  title: {
    fontFamily: FONT_FAMILY_BOLD,
    marginVertical: 20,
    fontSize: 30,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: TEXT_COLOR_GRAY,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "80%",
    marginTop: 10,
  },
  socialIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  socialTitle: {
    fontFamily: FONT_FAMILY_BOLD,
    marginLeft: 10,
  },
  dividerContainer: {
    width: "80%",
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: TEXT_COLOR_GRAY,
  },
  loginBtn: {
    width: "80%",
  },
  registerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  registerText: {
    color: TEXT_COLOR_GRAY,
  },
  register: {
    color: MAIN_COLOR,
    textDecorationLine: "underline",
  },
});
