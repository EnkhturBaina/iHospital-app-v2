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

const BottomSheet = ({
  bodyText, //sheet -н text
  dragDown, //sheet -г доош чирж хаах
  backClick, //sheet -н гадна дарж хаах
  fieldName, //update хийх талбар
  displayName,
  lookUpType,
  handle,
  action,
}) => {
  const state = useContext(MainContext);
  const sheetRef = useRef(); //Bottomsheet
  const [heightBottomSheet, setHeightBottomSheet] = useState(0);
  useEffect(() => {
    if (bodyText && bodyText.length == 1) {
      setHeightBottomSheet(Platform.OS == "ios" ? 90 : 80);
    } else if (bodyText && bodyText.length == 2) {
      setHeightBottomSheet(130);
    } else if (bodyText && bodyText.length == 3) {
      setHeightBottomSheet(180);
    } else if (bodyText && bodyText.length == 4) {
      setHeightBottomSheet(210);
    } else if (bodyText && bodyText.length > 4) {
      setHeightBottomSheet(400);
    } else {
      setHeightBottomSheet(0);
    }
  }, [handle]);

  useEffect(() => {
    bodyText && heightBottomSheet > 0 ? sheetRef.current.open() : null;
  }, [heightBottomSheet]);

  const functionCombined = (e) => {
    if (action) {
      action(e);
    } else {
      if (lookUpType == "appointment") {
        state.setAppointmentData((prevState) => ({
          ...prevState,
          [fieldName]: e,
        }));
      }
    }
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
          <View style={styles.lookupcontainer}>
            <ScrollView
              contentContainerStyle={{
                backgroundColor: "#fff",
              }}
            >
              {bodyText.length > 1 ? (
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
                <TouchableOpacity onPress={() => functionCombined(bodyText[0])}>
                  <Text style={styles.bottomSheetBodyLookup}>
                    {bodyText[0]?.[displayName]}
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

export default BottomSheet;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
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
