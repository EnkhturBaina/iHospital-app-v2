import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import avatar from "../../assets/avatar.png";
import { Icon } from "@rneui/base";
import {
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  MAIN_COLOR,
  MAIN_COLOR_GRAY,
  TEXT_COLOR_GRAY,
} from "../constant";
import { useNavigation } from "@react-navigation/native";
import MainContext from "../contexts/MainContext";

const HeaderUser = ({ isContent }) => {
  const navigation = useNavigation();
  const state = useContext(MainContext);
  return (
    <View
      style={[
        styles.headerContainer,
        {
          height: isContent ? 110 : 80,
        },
      ]}
    >
      <View style={styles.stack1}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() =>
            navigation.navigate("ProfileStack", {
              screen: "ProfileScreen",
            })
          }
        >
          <View>
            <Image
              source={avatar}
              style={{ width: 50, height: 50, borderRadius: 50 }}
              resizeMode="contain"
            />
          </View>
          <View style={{ flexDirection: "column", marginLeft: 10 }}>
            <Text style={{ fontFamily: FONT_FAMILY_BOLD, color: "#fff" }}>
              {state.userData?.globalPatient
                ? state.userData?.globalPatient.lastName?.substr(0, 1) +
                  ". " +
                  state.userData?.globalPatient?.firstName
                : null}
            </Text>
            <Text style={{ fontFamily: FONT_FAMILY_LIGHT, color: "#fff" }}>
              ID дугаар:{" "}
              {state.userData ? state.userData?.globalPatient?.id : null}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("NotificationStack", {
                screen: "NotificationScreen",
              })
            }
          >
            <Icon
              name="notifications-outline"
              type="ionicon"
              size={30}
              style={{ marginRight: 20 }}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ChatStack", {
                screen: "ChatScreen",
              })
            }
          >
            <Icon
              name="chatbox-ellipses-outline"
              type="ionicon"
              size={30}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HeaderUser;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "column",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: MAIN_COLOR,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 20,
    alignItems: "center",
  },
  stack1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
});
