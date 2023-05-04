import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  NativeModules,
  Dimensions,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import {
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  INPUT_BORDER_RADIUS,
  MAIN_COLOR,
  MAIN_COLOR_BG,
  MONTHS,
  TEXT_COLOR_GRAY,
  WEEKDAYS,
} from "../../constant";
import Empty from "../../components/Empty";
import avatar from "../../../assets/avatar.png";
import { Divider, Icon } from "@rneui/base";
import HeaderUser from "../../components/HeaderUser";
import MyStatusBar from "../../components/CustomStatusBar";
import { SafeAreaProvider } from "react-native-safe-area-context";
const { StatusBarManager } = NativeModules;
import CalendarPicker from "react-native-calendar-picker";
import confirmed from "../../../assets/confirmed.png";
import declined from "../../../assets/declined.png";
import flag from "../../../assets/flag.png";
import { useNavigation } from "@react-navigation/native";

const MeetScreen = () => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  return (
    <SafeAreaProvider
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
        backgroundColor: MAIN_COLOR_BG,
      }}
    >
      <MyStatusBar backgroundColor={MAIN_COLOR} barStyle="light-content" />
      <HeaderUser isContent={true} />
      <View style={styles.calendarCardContainer}>
        <CalendarPicker
          width={windowWidth - 50}
          onDateChange={() => {}}
          weekdays={WEEKDAYS}
          months={MONTHS}
          todayTextStyle={{ fontWeight: "bold", color: "#000" }}
          todayBackgroundColor={MAIN_COLOR_BG}
          selectedDayColor={MAIN_COLOR}
          selectedDayTextColor="#fff"
          previousTitle="Өмнөх"
          nextTitle="Дараах"
          nextTitleStyle={{ fontFamily: FONT_FAMILY_BOLD, padding: 10 }}
          previousTitleStyle={{ fontFamily: FONT_FAMILY_BOLD, padding: 10 }}
          selectYearTitle="Он сонгох"
          selectMonthTitle="Сар сонгох "
        />
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableOpacity
          style={styles.cardContainer}
          onPress={() => navigation.navigate("MeetDtlScreen")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={confirmed}
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontFamily: FONT_FAMILY_BOLD }}>
                Universal Med
              </Text>
              <Text
                style={{
                  fontFamily: FONT_FAMILY_LIGHT,
                  color: "#8D9095",
                  fontSize: 12,
                }}
              >
                Уулзалт цуцлагдсан
              </Text>
            </View>
          </View>
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon
                name="calendar"
                type="ant-design"
                size={15}
                color="#86909C"
              />
              <Text style={{ color: "#86909C", marginLeft: 5 }}>
                2023/04/02
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="clock" type="feather" size={15} color="#86909C" />
              <Text style={{ color: "#86909C", marginLeft: 5 }}>09:00</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default React.memo(MeetScreen);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: MAIN_COLOR_BG,
    paddingBottom: 20,
  },
  calendarCardContainer: {
    marginTop: 10,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 2,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingBottom: 10,
    marginHorizontal: 20,
    marginTop: -50,
    marginBottom: 5,
  },
  cardContainer: {
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 2,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginHorizontal: 20,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
