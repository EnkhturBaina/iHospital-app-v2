import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MainContext from "../../contexts/MainContext";
import {
  API_KEY,
  BUTTON_BORDER_RADIUS,
  DEV_URL,
  FONT_FAMILY_BOLD,
  MAIN_COLOR,
  MAIN_COLOR_BG,
  MAIN_COLOR_GRAY_BG,
  MONTHS,
  WEEKDAYS,
} from "../../constant";
import { Button, Icon } from "@rneui/base";
import CalendarPicker from "react-native-calendar-picker";
import Loader from "../../components/Loader";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import CustomSnackbar from "../../components/CustomSnackbar";

const DoctorAppointmentStep2 = (props) => {
  const isFocused = useIsFocused();
  const state = useContext(MainContext);

  const [loadingAction, setLoadingAction] = useState(false);

  const [scheduleList, setScheduleList] = useState([]);
  const [slotList, setSlotList] = useState([]);

  const [customDatesStyles, setCustomDatesStyles] = useState([]); //Боломжит өдрүүд харуулах

  const [loadingSchedules, setLoadingSchedules] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const [visibleSnack, setVisibleSnack] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState("");
  //Snacbkbar харуулах
  const onToggleSnackBar = (msg) => {
    setVisibleSnack(!visibleSnack);
    setSnackBarMsg(msg);
  };

  //Snacbkbar хаах
  const onDismissSnackBar = () => setVisibleSnack(false);

  const getSchedules = async () => {
    setLoadingSchedules(true);
    setScheduleList([]);
    setSlotList([]);
    //***** Эмчийн сул өдөр
    await axios({
      method: "get",
      url: `${DEV_URL}mobile/schedule/`,
      params: {
        hospitalId: state.appointmentData.hospital?.id,
        type: 1,
        doctor: state.appointmentData.doctor.id,
        departmentId: state.appointmentData.structure.id,
        startDate: "2023-01-01",
        endDate: "2023-02-28",
      },
      headers: {
        "X-API-KEY": API_KEY,
        Authorization: `Bearer ${state.accessToken}`,
      },
    })
      .then(async (response) => {
        // console.log(
        //   "responee get Schedules",
        //   JSON.stringify(response.data.response.data)
        // );
        if (response.status == 200) {
          setScheduleList(response.data.response.data);
          response.data.response.data.map((el) => {
            setCustomDatesStyles((customDatesStyles) => [
              ...customDatesStyles,
              {
                date: el.workDate,
                style: { backgroundColor: MAIN_COLOR_BG },
                textStyle: { color: MAIN_COLOR, fontFamily: FONT_FAMILY_BOLD },
              },
            ]);
          });
        }
        setLoadingSchedules(false);
      })
      .catch(function (error) {
        setLoadingSchedules(false);
        console.log("error get Schedules", error.response);
        if (error.response.status == 400) {
        } else if (error?.response?.status == 401) {
          state.setLoginError("Холболт салсан байна дахин нэвтэрнэ үү.");
          state.logout();
        }
      });
  };
  const getSlots = async (schedule_id) => {
    setLoadingSlots(true);
    setSlotList([]);
    //***** Эмчийн сул өдөр
    await axios({
      method: "get",
      url: `${DEV_URL}mobile/slots/`,
      params: {
        hospitalId: state.appointmentData.hospital?.id,
        scheduleId: schedule_id,
        isActive: true,
      },
      headers: {
        "X-API-KEY": API_KEY,
        Authorization: `Bearer ${state.accessToken}`,
      },
    })
      .then(async (response) => {
        // console.log(
        //   "responee getS lots",
        //   JSON.stringify(response.data.response.data)
        // );
        if (response.status == 200) {
          setSlotList(response.data.response.data);
        }
        setLoadingSlots(false);
      })
      .catch(function (error) {
        setLoadingSlots(false);
        console.log("error getS lots", error.response.data);
        if (error.response.status == 400) {
        } else if (error?.response?.status == 401) {
          state.setLoginError("Холболт салсан байна дахин нэвтэрнэ үү.");
          state.logout();
        }
      });
  };

  useEffect(() => {
    getSchedules();
  }, [isFocused]);

  useEffect(() => {
    //*** Боломжит өдөр сонгогдсон үед тухайн өдрийн SLOT авах
    if (state.appointmentData.date) {
      scheduleList?.map((el) => {
        if (el.workDate == state.appointmentData.date) {
          state.setAppointmentData((prevState) => ({
            ...prevState,
            schedule: el,
          }));
          getSlots(el.id);
        }
      });
    }
  }, [state.appointmentData.date]);

  const onDateChange = (date) => {
    state.setAppointmentData((prevState) => ({
      ...prevState,
      time: "",
    }));

    var temp_date = new Date(date);
    var month = temp_date.getMonth() + 1;
    var day = temp_date.getDate();

    //Тухайн сар 1 оронтой бол урд нь 0 залгах
    if (month.toString().length === 1) {
      month = `0${month}`;
    } else {
      month = month;
    }
    //Тухайн өдөр 1 оронтой бол урд нь 0 залгах
    if (day.toString().length === 1) {
      day = `0${day}`;
    } else {
      day = day;
    }
    state.setAppointmentData((prevState) => ({
      ...prevState,
      date: temp_date.getFullYear() + "-" + month + "-" + day,
    }));
  };

  const createInvoice = async () => {
    if (state.appointmentData.date == "") {
      onToggleSnackBar("Үзлэгийн өдөр сонгоно уу.");
    } else if (state.appointmentData.time == "") {
      onToggleSnackBar("Үзлэгийн цаг сонгоно уу.");
    } else {
      setLoadingAction(true);
      await axios({
        method: "post",
        url: `${DEV_URL}mobile/invoice`,
        headers: {
          "X-API-KEY": API_KEY,
          Authorization: `Bearer ${state.accessToken}`,
        },
        data: {
          hospitalId: state.appointmentData.hospital?.id,
          slotId: state.appointmentData.time?.id,
        },
      })
        .then(async (response) => {
          // console.log("create Invoice", response);
          if (response.status == 201) {
            state.setInvoiceData(response.data.response);
            props.navigation.navigate("DoctorAppointmentStep3");
          }
          setLoadingAction(false);
        })
        .catch(function (error) {
          setLoadingAction(false);
          console.log("error create Invoice", error.response);
          if (error.response.status == 400) {
          } else if (error?.response?.status == 401) {
            state.setLoginError("Холболт салсан байна дахин нэвтэрнэ үү.");
            state.logout();
          }
        });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.mainContainer}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <CustomSnackbar
        visible={visibleSnack}
        dismiss={onDismissSnackBar}
        text={snackBarMsg}
        topPos={0}
      />
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={styles.labelText}>Өдөр сонгох</Text>
        {loadingSchedules ? (
          <Loader />
        ) : (
          <>
            <View style={styles.cardContainer}>
              <CalendarPicker
                width={windowWidth - 40}
                onDateChange={onDateChange}
                weekdays={WEEKDAYS}
                months={MONTHS}
                // todayTextStyle={{ fontWeight: "bold", color: "#000" }}
                // todayBackgroundColor={MAIN_COLOR_BG}
                selectedDayColor={MAIN_COLOR}
                selectedDayTextColor="#fff"
                previousTitle="Өмнөх"
                nextTitle="Дараах"
                nextTitleStyle={styles.nextPrevText}
                previousTitleStyle={styles.nextPrevText}
                selectYearTitle="Он сонгох"
                selectMonthTitle="Сар сонгох "
                customDatesStyles={customDatesStyles}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Icon
                name="dot-single"
                type="entypo"
                size={30}
                color={MAIN_COLOR}
              />
              <Text style={styles.attentionText}>Боломжит өдрүүд</Text>
            </View>
          </>
        )}

        {loadingSlots ? (
          <Loader />
        ) : slotList != "" ? (
          <>
            <Text style={styles.labelText}>Цаг сонгох</Text>
            <View style={styles.timesContainer}>
              {slotList.map((el, index) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.cardContainerTime,
                      {
                        borderColor:
                          state.appointmentData.time?.id == el.id
                            ? MAIN_COLOR
                            : null,
                        borderWidth:
                          state.appointmentData.time?.id == el.id ? 1 : 0,
                      },
                    ]}
                    key={index}
                    onPress={() => {
                      state.setAppointmentData((prevState) => ({
                        ...prevState,
                        time: el,
                      }));
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text
                        style={{ fontFamily: FONT_FAMILY_BOLD, fontSize: 12 }}
                      >
                        {el.startTime?.substr(0, 5)}
                      </Text>
                      <Icon
                        name="clock"
                        type="feather"
                        size={15}
                        style={{ marginHorizontal: 5 }}
                      />
                      <Text
                        style={{ fontFamily: FONT_FAMILY_BOLD, fontSize: 12 }}
                      >
                        {el.endTime?.substr(0, 5)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        ) : !loadingSlots &&
          !loadingSchedules &&
          state.appointmentData.date != "" ? (
          <Text
            style={{
              fontFamily: FONT_FAMILY_BOLD,
              textAlign: "center",
              marginVertical: 10,
            }}
          >
            Хуваарь дууссан байна
          </Text>
        ) : null}
        <Button
          disabled={loadingAction}
          containerStyle={styles.btnContainer}
          title={
            <>
              <Text
                style={{
                  fontSize: 16,
                  color: "#fff",
                  fontFamily: FONT_FAMILY_BOLD,
                }}
              >
                Үргэлжүүлэх
              </Text>
              {loadingAction ? (
                <ActivityIndicator style={{ marginLeft: 5 }} color="#fff" />
              ) : null}
            </>
          }
          color={MAIN_COLOR}
          radius={BUTTON_BORDER_RADIUS}
          onPress={() => {
            createInvoice();
            // props.navigation.navigate("DoctorAppointmentStep2");
          }}
          titleStyle={{
            fontFamily: FONT_FAMILY_BOLD,
          }}
          buttonStyle={{ height: 45, borderRadius: 8 }}
        />
      </View>
    </ScrollView>
  );
};

export default DoctorAppointmentStep2;

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    backgroundColor: MAIN_COLOR_GRAY_BG,
    paddingBottom: 20,
  },
  btnContainer: {
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 10,
    width: "100%",
  },
  cardContainer: {
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
  },
  cardContainerTime: {
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
    width: "30%",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginRight: 5,
    marginLeft: 5,
    paddingVertical: 10,
  },
  labelText: {
    fontFamily: FONT_FAMILY_BOLD,
    marginLeft: 5,
    marginVertical: 5,
  },
  attentionText: {
    fontFamily: FONT_FAMILY_BOLD,
    marginVertical: 5,
  },
  timesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  nextPrevText: {
    fontFamily: FONT_FAMILY_BOLD,
    padding: 10,
    color: MAIN_COLOR,
  },
});
