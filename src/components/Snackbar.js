import { StyleSheet } from "react-native";
import React from "react";
import { Snackbar } from "react-native-paper";

export default function ({ visible, dismiss, text }) {
  return (
    <Snackbar
      visible={visible}
      onDismiss={dismiss}
      wrapperStyle={{ top: 0, zIndex: 999 }}
      duration={2000}
      style={{ backgroundColor: "#89898c" }}
    >
      {text}
    </Snackbar>
  );
}

const styles = StyleSheet.create({});
