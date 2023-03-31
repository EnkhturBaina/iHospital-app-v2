import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { FONT_FAMILY_BOLD, FONT_FAMILY_LIGHT } from "../constant";

const Empty = ({ text, type, subtext }) => {
  var imageType = type;
  if (type == "warning") {
    imageType = require("../../assets/warning.png");
  } else if (type == "error") {
    imageType = require("../../assets/error.png");
  } else if (type == "empty") {
    imageType = require("../../assets/empty.png");
  } else {
    imageType = require("../../assets/success.png");
  }
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      {type ? (
        <Image
          source={imageType}
          style={{ width: "60%", height: "60%" }}
          resizeMode="contain"
        />
      ) : null}
      <Text style={styles.emptyText}>{text}</Text>
      {subtext ? <Text style={styles.emptySubText}>{subtext}</Text> : null}
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({
  emptyText: {
    fontFamily: FONT_FAMILY_BOLD,
    textAlign: "center",
    marginTop: 10,
  },
  emptySubText: {
    fontFamily: FONT_FAMILY_LIGHT,
    textAlign: "center",
    marginTop: 10,
  },
});
