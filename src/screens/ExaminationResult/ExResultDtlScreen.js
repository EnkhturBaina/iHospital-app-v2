// Эмчийн тэмдэглэл, Өвчний түүх, Өвчтний түүᠬ
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import {
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  MAIN_COLOR_GRAY_BG,
} from "../../constant";
import moment from "moment";
import "moment/locale/mn";
import { Divider } from "@rneui/base";

const ExResultDtlScreen = ({ route, navigation }) => {
  const { dtlData } = route.params;

  useLayoutEffect(() => {
    // TabBar Hide хийх
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
    // TabBar Hide хийх
  }, [navigation]);

  const parseNotes = (key) => {
    // Дамжуулсан key -с тухайн key -н DATA -г авж parse хийх (DATA нь STRING ирж байгаа)
    var parsedData = JSON.parse(dtlData[key]);
    // DATA ны доторх OBJECT
    var renderData = Object.values(parsedData)[0];

    return (
      <View style={styles.eachRowContainer}>
        <Text style={styles.rowTitle}>{Object.keys(parsedData)[0]}</Text>
        <Text style={styles.rowData}>{Object.values(renderData)[0]}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: MAIN_COLOR_GRAY_BG,
      }}
    >
      <ScrollView contentContainerStyle={styles.mainContainer}>
        <View style={styles.cardContainer}>
          <View style={styles.eachRowContainer}>
            <Text style={styles.rowTitle}>Үзлэг хийсэн эмч</Text>
            <Text style={styles.rowData}>
              {dtlData?.employees?.lastName?.substr(0, 1) +
                ". " +
                dtlData?.employees?.firstName}
            </Text>
          </View>
          <View style={styles.eachRowContainer}>
            <Text style={styles.rowTitle}>Үзлэг хийсэн огноо</Text>
            <Text style={styles.rowData}>
              {moment(dtlData.createdAt)
                .locale("mn")
                .format("dddd, YYYY-MM-DD HH:MM")}
            </Text>
          </View>
          <View style={styles.eachRowContainer}>
            <Text style={styles.rowTitle}>Үзлэгийн дугаар</Text>
            <Text style={styles.rowData}>{dtlData.id}</Text>
          </View>
        </View>
        <Text style={styles.containerTitle}>Эмчийн тэмдэглэл</Text>
        <View style={styles.cardContainer}>
          {parseNotes("pain")}
          {parseNotes("question")}
          {parseNotes("inspection")}
          {parseNotes("plan")}
          <View style={styles.eachRowContainer}>
            <Text style={styles.rowTitle}>Онош</Text>
            {dtlData.diagnosis?.length > 0 ? (
              <View>
                {dtlData.diagnosis?.map((el, index) => {
                  return (
                    <Text key={index} style={styles.rowData}>
                      {index + 1}. {el.code} - {el.nameMn}
                    </Text>
                  );
                })}
              </View>
            ) : (
              <Text style={styles.rowData}>Онош олдсонгүй</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExResultDtlScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    backgroundColor: MAIN_COLOR_GRAY_BG,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  cardContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: 5,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 2,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  eachRowContainer: {
    flexDirection: "column",
    marginVertical: 5,
  },
  rowTitle: {
    fontFamily: FONT_FAMILY_BOLD,
  },
  rowData: {
    fontFamily: FONT_FAMILY_LIGHT,
    marginTop: 5,
  },
  containerTitle: {
    fontFamily: FONT_FAMILY_BOLD,
    fontSize: 18,
    marginVertical: 5,
  },
});
