import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import doctor_health from "../../../assets/doctor_health.png";
import {
  API_KEY,
  DEV_URL,
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  MAIN_COLOR,
  MAIN_COLOR_BG,
} from "../../constant";
import { Button, Icon } from "@rneui/base";
import axios from "axios";

const ResetPasswordScreen = (props) => {
  const [selectedType, setSelectedType] = useState("");
  const [loadingAction, setLoadingAction] = useState(false);

  const resetPassword = async () => {
    //***** Нууц үг сэргээх
    setLoadingAction(true);
    await axios({
      method: "post",
      url: `${DEV_URL}authentication/forgotPassword`,
      headers: {
        "X-API-KEY": API_KEY,
      },
      data: {
        email: props.route?.params?.email,
      },
    })
      .then(async (response) => {
        // console.log("responee login", response.data);
        if (response.status == 200) {
        }
        setLoadingAction(false);
      })
      .catch(function (error) {
        // console.log("error login", error.response);
        setLoadingAction(false);
        if (error.response.status == 400) {
        }
      });
  };
  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
    >
      <Image
        source={doctor_health}
        resizeMode="contain"
        style={{ width: "100%", height: 200 }}
      />
      <Text style={styles.mainText}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry
      </Text>
      <TouchableOpacity
        style={[
          styles.cardContainer,
          { borderColor: selectedType == "sms" ? MAIN_COLOR : "#fff" },
        ]}
        activeOpacity={0.6}
        onPress={() => setSelectedType("sms")}
        disabled
      >
        <View style={styles.statContainer}>
          <Icon
            name="message-square"
            type="feather"
            size={25}
            color={MAIN_COLOR}
            style={styles.statIcon}
          />
          <View style={styles.cardTextContainer}>
            <Text style={{ fontFamily: FONT_FAMILY_LIGHT }}>СМС илгээх:</Text>
            <Text style={{ fontFamily: FONT_FAMILY_BOLD }}>
              (+976) 86 ** ** 57
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.cardContainer,
          { borderColor: selectedType == "email" ? MAIN_COLOR : "#fff" },
        ]}
        activeOpacity={0.6}
        onPress={() => setSelectedType("email")}
      >
        <View style={styles.statContainer}>
          <Icon
            name="mail"
            type="feather"
            size={25}
            color={MAIN_COLOR}
            style={styles.statIcon}
          />
          <View style={styles.cardTextContainer}>
            <Text style={{ fontFamily: FONT_FAMILY_LIGHT }}>И-мэйл:</Text>
            <Text style={{ fontFamily: FONT_FAMILY_BOLD }}>
              {props.route?.params?.email}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View>
        <Button
          containerStyle={{ marginTop: 10 }}
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
          onPress={() => {
            props.navigation.navigate("OTPScreen");
          }}
          titleStyle={{
            fontFamily: FONT_FAMILY_BOLD,
          }}
          buttonStyle={{ height: 45 }}
          disabled={selectedType != "" ? false : true || loadingAction}
        />
      </View>
    </ScrollView>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  mainText: {
    fontFamily: FONT_FAMILY_BOLD,
    textAlign: "center",
    marginTop: 20,
  },
  statIcon: {
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: MAIN_COLOR_BG,
    borderRadius: 50,
    marginBottom: 5,
  },
  statContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
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
    borderRadius: 12,
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  cardTextContainer: {
    flexDirection: "column",
    marginLeft: 10,
  },
});
