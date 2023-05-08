import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  NativeModules,
  Dimensions,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  API_KEY,
  DEV_URL,
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  MAIN_COLOR,
  MAIN_COLOR_BG,
  MONTHS,
  WEEKDAYS,
} from "../../constant";
import Empty from "../../components/Empty";
import { Icon } from "@rneui/base";
import HeaderUser from "../../components/HeaderUser";
import MyStatusBar from "../../components/CustomStatusBar";
import { SafeAreaProvider } from "react-native-safe-area-context";
const { StatusBarManager } = NativeModules;
import CalendarPicker from "react-native-calendar-picker";
import confirmed from "../../../assets/confirmed.png";
import declined from "../../../assets/declined.png";
import flag from "../../../assets/flag.png";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import MainContext from "../../contexts/MainContext";
import { RefreshControl } from "react-native-gesture-handler";
import moment from "moment";
import "moment/locale/mn";
import Loader from "../../components/Loader";
import { useIsFocused } from "@react-navigation/native";

const MeetScreen = (props) => {
  const state = useContext(MainContext);
  const isFocused = useIsFocused();

  const [loadingMeets, setLoadingMeets] = useState(false);
  const [refundList, setRefundList] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const [customDatesStyles, setCustomDatesStyles] = useState([]); //Боломжит өдрүүд харуулах

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getMeetHistory();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const getMeetHistory = async () => {
    setLoadingMeets(true);
    setRefundList([]);
    await axios({
      method: "get",
      url: `${DEV_URL}mobile/appointment`,
      params: {
        statusis: [1, 2, 3, 4],
      },
      headers: {
        "X-API-KEY": API_KEY,
        Authorization: `Bearer ${state.accessToken}`,
      },
    })
      .then(async (response) => {
        // console.log("getMeet History", JSON.stringify(response.data.response));
        if (response.status == 200) {
          setRefundList(response.data.response);

          response.data.response
            ?.filter(
              (obj) =>
                obj["appointments"] !== undefined && obj.appointments.length > 0
            )
            ?.map((el) => {
              el.appointments?.map((el) => {
                setCustomDatesStyles((customDatesStyles) => [
                  ...customDatesStyles,
                  {
                    date: el.slots?.schedule?.workDate,
                    style: { backgroundColor: MAIN_COLOR },
                    textStyle: {
                      color: "#fff",
                      fontFamily: FONT_FAMILY_BOLD,
                    },
                  },
                ]);
              });
            });
        }
        setLoadingMeets(false);
      })
      .catch(function (error) {
        // console.log("error get MeetHistory", error);
        setLoadingMeets(false);
        if (error.response.status == 400) {
        } else if (error?.response?.status == 401) {
          state.setLoginError("Холболт салсан байна дахин нэвтэрнэ үү.");
          state.logout();
        }
      });
  };

  useEffect(() => {
    getMeetHistory();
  }, [isFocused]);

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
          selectedDayColor="#fff"
          selectedDayTextColor="#000"
          previousTitle="Өмнөх"
          nextTitle="Дараах"
          nextTitleStyle={{ fontFamily: FONT_FAMILY_BOLD, padding: 10 }}
          previousTitleStyle={{ fontFamily: FONT_FAMILY_BOLD, padding: 10 }}
          selectYearTitle="Он сонгох"
          selectMonthTitle="Сар сонгох "
          customDatesStyles={customDatesStyles}
        />
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={MAIN_COLOR}
            colors={[MAIN_COLOR]}
          />
        }
      >
        {refundList == "" && !loadingMeets ? (
          <Empty type="empty" text="Уулзалт олдсонгүй" />
        ) : null}
        {loadingMeets ? (
          <Loader />
        ) : (
          refundList &&
          refundList
            ?.filter(
              (obj) =>
                obj["appointments"] !== undefined && obj.appointments.length > 0
            )
            .map((data, index) => {
              return (
                <View key={index}>
                  {data.appointments?.map((el, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={styles.cardContainer}
                        onPress={() => {
                          props.navigation.navigate("MeetDtlScreen", {
                            hospitalData: data,
                            appointmentData: el,
                          });
                        }}
                      >
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Image
                            source={
                              el.status == 1
                                ? confirmed
                                : el.status == 2
                                ? flag
                                : el.status == 3
                                ? declined
                                : null
                            }
                            style={{ width: 40, height: 40 }}
                            resizeMode="contain"
                          />
                          <View style={{ marginLeft: 10 }}>
                            <Text style={{ fontFamily: FONT_FAMILY_BOLD }}>
                              {data.name}
                            </Text>
                            <Text
                              style={{
                                fontFamily: FONT_FAMILY_LIGHT,
                                color: "#8D9095",
                                fontSize: 12,
                              }}
                            >
                              {el.status == 1
                                ? "Цаг захиалсан"
                                : el.status == 2
                                ? "Цаг сольсон"
                                : el.status == 3
                                ? "Цаг цуцлагдсан"
                                : "-"}
                            </Text>
                          </View>
                        </View>
                        <View style={{ alignItems: "flex-end" }}>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "flex-end",
                            }}
                          >
                            <Icon
                              name="calendar"
                              type="ant-design"
                              size={15}
                              color="#86909C"
                            />
                            <Text style={{ color: "#86909C", marginLeft: 5 }}>
                              {moment(el.slots?.schedule?.workDate)
                                .locale("mn")
                                .format("dddd, YYYY/MM/DD")}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Text style={{ color: "#86909C", marginRight: 5 }}>
                              {el.slots?.startTime?.substr(0, 5)}
                            </Text>
                            <Icon
                              name="clock"
                              type="feather"
                              size={15}
                              color="#86909C"
                            />
                            <Text style={{ color: "#86909C", marginLeft: 5 }}>
                              {el.slots?.endTime?.substr(0, 5)}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
            })
        )}
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
