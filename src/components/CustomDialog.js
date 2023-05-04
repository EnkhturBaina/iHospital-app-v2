import { StyleSheet, Text, Image, View } from "react-native";
import React from "react";
import { FONT_FAMILY_BOLD, MAIN_COLOR } from "../constant";
import { Dialog } from "@rneui/themed";

export default function ({
  visible, //Харуулах эсэх
  confirmFunction,
  declineFunction,
  text,
  confirmBtnText,
  DeclineBtnText,
  type, //Dialog харуулах төрөл ['success', 'warning', 'error']
}) {
  var imageType = null;
  if (type == "warning") {
    imageType = require("../../assets/warning.png");
  } else if (type == "error") {
    imageType = require("../../assets/error.png");
  } else {
    imageType = require("../../assets/success.png");
  }

  return (
    <Dialog
      isVisible={visible}
      overlayStyle={{
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 12,
        alignItems: "center",
      }}
    >
      <Image
        source={imageType}
        style={{ width: 150, height: 150 }}
        resizeMode="contain"
      />
      <Text
        style={{
          fontFamily: FONT_FAMILY_BOLD,
          textAlign: "center",
          marginTop: 20,
          marginBottom: 10,
        }}
      >
        {text}
      </Text>
      <Dialog.Actions>
        <View
          style={{
            width: "100%",
            flexDirection: "column",
          }}
        >
          <Dialog.Button
            title={confirmBtnText}
            onPress={() => confirmFunction()}
            containerStyle={styles.dialogBtn}
            radius={12}
            titleStyle={{
              fontFamily: FONT_FAMILY_BOLD,
              color: "#fff",
            }}
          />
          {DeclineBtnText != "" ? (
            <Dialog.Button
              title={DeclineBtnText}
              onPress={() => declineFunction()}
              containerStyle={styles.dialogDeclineBtn}
              radius={12}
              titleStyle={{
                fontFamily: FONT_FAMILY_BOLD,
                color: "#000",
              }}
            />
          ) : null}
        </View>
      </Dialog.Actions>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  dialogBtn: {
    marginBottom: 5,
    marginHorizontal: 20,
    backgroundColor: MAIN_COLOR,
  },
  dialogDeclineBtn: {
    marginHorizontal: 20,
  },
});
