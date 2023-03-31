import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import avatar from "../../assets/avatar.png";
import { Icon } from "@rneui/base";
import { FONT_FAMILY_BOLD, FONT_FAMILY_LIGHT } from "../constant";
import { useNavigation } from "@react-navigation/native";
import MainContext from "../contexts/MainContext";

const HeaderUser = () => {
  const navigation = useNavigation();
  const state = useContext(MainContext);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 20,
      }}
    >
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center" }}
        onPress={() => navigation.navigate("ProfileTab")}
      >
        <View>
          <Image
            source={avatar}
            style={{ width: 50, height: 50, borderRadius: 50 }}
            resizeMode="contain"
          />
        </View>
        <View style={{ flexDirection: "column", marginLeft: 10 }}>
          <Text style={{ fontFamily: FONT_FAMILY_BOLD }}>
            {state.userData
              ? state.userData?.lastName?.substr(0, 1) +
                ". " +
                state.userData?.firstName
              : null}
          </Text>
          <Text style={{ fontFamily: FONT_FAMILY_LIGHT }}>
            ID дугаар: {state.userData ? state.userData?.id : null}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("NotificationScreen")}
        >
          <Icon
            name="notifications-outline"
            type="ionicon"
            size={25}
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ChatScreen")}>
          <Icon name="chatbox-ellipses-outline" type="ionicon" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderUser;

const styles = StyleSheet.create({});
