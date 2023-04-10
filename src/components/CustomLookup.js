import { Icon } from "@rneui/base";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  MAIN_COLOR_GRAY,
} from "../constant";

const styles = StyleSheet.create({
  container: {},
  containerTouchable: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: MAIN_COLOR_GRAY,
    borderRadius: 12,
    paddingLeft: 15,
    paddingRight: 10,
    marginBottom: 10,
  },
  textInput: {
    fontFamily: FONT_FAMILY_LIGHT,
    fontSize: 16,
    textAlignVertical: "center",
    width: "80%",
  },
  label: {
    fontFamily: FONT_FAMILY_BOLD,
    padding: 5,
  },
});

const CustomLookup = ({ label, value, press, disabled, placeholder }) => (
  <View style={styles.container}>
    {label ? <Text style={styles.label}>{label}</Text> : null}
    <TouchableOpacity
      style={[
        styles.containerTouchable,
        { backgroundColor: disabled ? MAIN_COLOR_GRAY : "#fff" },
      ]}
      onPress={!disabled ? press : null}
    >
      <Text style={styles.textInput} numberOfLines={1}>
        {value ?? placeholder}
      </Text>
      <Icon name="caret-down-outline" type="ionicon" size={15} />
    </TouchableOpacity>
  </View>
);

export default CustomLookup;
