import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import {
  BUTTON_BORDER_RADIUS,
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  MAIN_COLOR,
} from "../constant";
import { Button, CheckBox } from "@rneui/base";
import RBSheet from "react-native-raw-bottom-sheet";
import MainContext from "../contexts/MainContext";
import Loader from "./Loader";
import { WebView } from "react-native-webview";

export default function (props) {
  const state = useContext(MainContext);
  const refRBSheet = useRef();
  const webview = useRef();
  const screen = Dimensions.get("screen");
  const [visibleDialogLoader, setVisibleDialogLoader] = useState(false);
  return (
    <View style={styles.termSection}>
      <View style={styles.termContainer}>
        <CheckBox
          containerStyle={{
            marginLeft: 0,
            paddingLeft: 0,
            marginRight: 20,
          }}
          wrapperStyle={{
            position: "absolute",
          }}
          title=""
          iconType="material-community"
          checkedIcon="checkbox-outline"
          uncheckedIcon="checkbox-blank-outline"
          checked={state.termCheck}
          onPress={() => state.setTermCheck(!state.termCheck)}
          checkedColor={MAIN_COLOR}
          uncheckedColor={MAIN_COLOR}
          size={30}
        />
        <TouchableOpacity onPress={() => refRBSheet.current.open()}>
          <Text
            style={{
              fontFamily: FONT_FAMILY_LIGHT,
              width: "100%",
              paddingTop: 10,
              marginLeft: 10,
            }}
          >
            Үйлчилгээний нөхцөл зөвшөөрөх
          </Text>
        </TouchableOpacity>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        dragFromTopOnly={true}
        height={screen.height - 200}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(52, 52, 52, 0.8)",
          },
          container: {
            flexDirection: "column",
            borderTopStartRadius: 16,
            borderTopEndRadius: 16,
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
      >
        <WebView
          style={{
            width: screen.width,
            overflow: "hidden",
          }}
          source={{
            uri: "https://ihospital.mn/privacy",
          }}
          ref={webview}
          onLoadStart={() => setVisibleDialogLoader(true)}
          onLoad={() => setVisibleDialogLoader(false)}
        />
        {visibleDialogLoader ? <Loader /> : null}
        <Button
          title="Зөвшөөрөх"
          containerStyle={styles.confirmButton}
          color={MAIN_COLOR}
          radius={BUTTON_BORDER_RADIUS}
          onPress={() => {
            state.setTermCheck(true);
            refRBSheet.current.close();
          }}
          titleStyle={{
            fontFamily: FONT_FAMILY_BOLD,
          }}
        />
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  lookupcontainer: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
  },
  termSection: {},
  termContainer: {
    width: "100%",
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
  },
  cardTopText: {
    fontFamily: FONT_FAMILY_BOLD,
    fontSize: 18,
    marginBottom: 10,
    color: MAIN_COLOR,
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
  },
  generalText: {
    fontFamily: FONT_FAMILY_BOLD,
    textAlign: "justify",
    marginBottom: 10,
  },
  confirmButton: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});
