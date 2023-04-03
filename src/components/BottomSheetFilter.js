import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import React, { useContext, useEffect, useState, useRef } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { FONT_FAMILY_BOLD, MAIN_COLOR, TEXT_COLOR_GRAY } from "../constant";
import MainContext from "../contexts/MainContext";
import { Divider } from "@rneui/base";

const BottomSheetFilter = ({
  bodyText, //sheet -н text
  dragDown, //sheet -г доош чирж хаах
  backClick, //sheet -н гадна дарж хаах
  setFunctionSheet,
  displayName,
  handle,
  title,
  removeFunctionSheet,
}) => {
  const state = useContext(MainContext);
  const sheetRef = useRef(); //Bottomsheet
  const [heightBottomSheet, setHeightBottomSheet] = useState(0);
  useEffect(() => {
    if (bodyText && bodyText.length == 1) {
      setHeightBottomSheet(Platform.OS == "ios" ? 110 : 100);
    } else if (bodyText && bodyText.length == 2) {
      setHeightBottomSheet(190);
    } else if (bodyText && bodyText.length == 3) {
      setHeightBottomSheet(230);
    } else if (bodyText && bodyText.length == 4) {
      setHeightBottomSheet(250);
    } else if (bodyText && bodyText.length > 4) {
      setHeightBottomSheet(330);
    } else {
      setHeightBottomSheet(0);
    }
  }, [handle]);

  useEffect(() => {
    bodyText && heightBottomSheet > 0 ? sheetRef.current.open() : null;
  }, [heightBottomSheet]);

  const functionCombined = (e) => {
    setFunctionSheet && setFunctionSheet(e);
    sheetRef.current.close();
  };
  const functionCombinedRemove = () => {
    removeFunctionSheet && removeFunctionSheet();
    sheetRef.current.close();
  };

  return (
    <View>
      <RBSheet
        ref={sheetRef}
        height={heightBottomSheet}
        closeOnDragDown={dragDown} //sheet -г доош чирж хаах
        closeOnPressMask={backClick} //sheet -н гадна дарж хаах
        customStyles={{
          container: {
            backgroundColor: "#fff",
            flexDirection: "column",
            borderTopEndRadius: 16,
            borderTopStartRadius: 16,
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
        onClose={() => {
          setHeightBottomSheet(0);
        }}
      >
        <View style={styles.bottomSheetContainer}>
          <Text
            style={{
              fontFamily: FONT_FAMILY_BOLD,
              textAlign: "center",
              fontSize: 16,
              color: MAIN_COLOR,
              marginTop: 15,
              marginBottom: 5,
            }}
          >
            {title}
          </Text>
          <Divider />
          <View style={styles.lookupcontainer}>
            <ScrollView
              contentContainerStyle={{
                backgroundColor: "#fff",
              }}
            >
              <TouchableOpacity onPress={() => functionCombinedRemove()}>
                <Text style={styles.bottomSheetBodyLookup}>Бүгд</Text>
              </TouchableOpacity>
              {bodyText && bodyText.length > 1 ? (
                bodyText?.map((el, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => functionCombined(el)}
                    >
                      <Text style={styles.bottomSheetBodyLookup}>
                        {el[displayName]}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <TouchableOpacity
                  onPress={() => bodyText && functionCombined(bodyText[0])}
                >
                  <Text style={styles.bottomSheetBodyLookup}>
                    {bodyText && bodyText[0]?.[displayName]}
                  </Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

export default BottomSheetFilter;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    flex: 1,
  },
  lookupcontainer: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    paddingBottom: Platform.OS == "ios" ? 30 : 25,
  },
  bottomSheetBodyLookup: {
    fontFamily: FONT_FAMILY_BOLD,
    fontSize: 18,
    padding: 10,
    color: TEXT_COLOR_GRAY,
  },
});
