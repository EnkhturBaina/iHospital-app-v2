import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useContext, useRef } from "react";
import {
  BUTTON_BORDER_RADIUS,
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  MAIN_COLOR,
} from "../constant";
import { Button, CheckBox } from "@rneui/base";
import RBSheet from "react-native-raw-bottom-sheet";
import MainContext from "../contexts/MainContext";

export default function (props) {
  const state = useContext(MainContext);
  const refRBSheet = useRef();
  const screen = Dimensions.get("screen");
  return (
    <View style={styles.termSection}>
      <TouchableOpacity
        style={styles.termContainer}
        onPress={() => refRBSheet.current.open()}
      >
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
          disabled
          iconType="material-community"
          checkedIcon="checkbox-outline"
          uncheckedIcon="checkbox-blank-outline"
          checked={state.termCheck}
          onPress={() => refRBSheet.current.open()}
          checkedColor={MAIN_COLOR}
          uncheckedColor={MAIN_COLOR}
          size={30}
        />
        <Text
          style={{
            fontFamily: FONT_FAMILY_LIGHT,
            width: "90%",
            paddingTop: 10,
            marginLeft: 10,
          }}
        >
          Үйлчилгээний нөхцөл зөвшөөрөх
        </Text>
      </TouchableOpacity>
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
        <View style={styles.bottomSheetContainer}>
          <View style={styles.lookupcontainer}>
            <ScrollView
              contentContainerStyle={{
                paddingBottom: 40,
                marginHorizontal: 20,
              }}
            >
              <Text style={styles.cardTopText}>Ерөнхий заалт</Text>
              <View>
                <Text style={styles.generalText}>aaaaaaaaaaaaaa</Text>
              </View>

              <Button
                title="Зөвшөөрөх"
                containerStyle={styles.loginBtn}
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
            </ScrollView>
          </View>
        </View>
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
});
