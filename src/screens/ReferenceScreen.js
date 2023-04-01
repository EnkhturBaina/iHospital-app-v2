import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import {
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  MAIN_COLOR,
  MAIN_COLOR_BG,
} from "../constant";
import { Icon } from "@rneui/base";
import HeaderUser from "../components/HeaderUser";

export default function ReferenceScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: MAIN_COLOR_BG }}>
      <HeaderUser isContent={false} />
      <TouchableOpacity style={styles.cardContainer}>
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Text style={styles.phoneText}>7077 7111</Text>
          <Text style={styles.labelText}>Платформын лавлах</Text>
        </View>
        <Icon
          name="phone"
          type="feather"
          color="#fff"
          style={styles.iconStyle}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.cardContainer}>
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Text style={styles.phoneText}>7077 7111</Text>
          <Text style={styles.labelText}>Платформын лавлах</Text>
        </View>
        <Icon
          name="phone"
          type="feather"
          color="#fff"
          style={styles.iconStyle}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.cardContainer}>
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Text style={styles.phoneText}>7077 7111</Text>
          <Text style={styles.labelText}>Платформын лавлах</Text>
        </View>
        <Icon
          name="phone"
          type="feather"
          color="#fff"
          style={styles.iconStyle}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
    backgroundColor: MAIN_COLOR,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  iconStyle: {
    borderRadius: 50,
    borderColor: "#fff",
    borderWidth: 2,
    padding: 8,
  },
  labelText: {
    fontFamily: FONT_FAMILY_LIGHT,
    color: "#fff",
  },
  phoneText: {
    fontFamily: FONT_FAMILY_BOLD,
    color: "#fff",
  },
});
