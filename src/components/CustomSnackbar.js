import { StyleSheet, Text } from "react-native";
import React from "react";
import { Snackbar } from "react-native-paper";
import { FONT_FAMILY_BOLD, MAIN_COLOR } from "../constant";

export default function ({ visible, dismiss, text, topPos }) {
  return (
    <Snackbar
      visible={visible}
      onDismiss={dismiss}
      wrapperStyle={{ top: topPos ?? 0, zIndex: 9999 }}
      duration={20000}
      style={{
        backgroundColor: MAIN_COLOR,
        justifyContent: "center",
        alignItems: "center",
      }}
      action={{
        label: "Хаах",
        onPress: dismiss,
      }}
    >
      <Text
        style={{
          justifyContent: "center",
          fontFamily: FONT_FAMILY_BOLD,
          color: "#fff",
        }}
      >
        {text}
      </Text>
    </Snackbar>
  );
}

const styles = StyleSheet.create({});
