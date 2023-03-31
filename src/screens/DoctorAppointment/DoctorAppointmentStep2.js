import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import BottomSheet from "../../components/BottomSheet";
import MainContext from "../../contexts/MainContext";
import CustomLookup from "../../components/CustomLookup";
import {
  BUTTON_BORDER_RADIUS,
  FONT_FAMILY_BOLD,
  MAIN_COLOR,
  MAIN_COLOR_BG,
} from "../../constant";
import { Button } from "@rneui/base";
import CalendarPicker from "react-native-calendar-picker";

const DoctorAppointmentStep2 = () => {
  const state = useContext(MainContext);
  const [confirmButtonDisabled, setConfirmButtonDisabled] = useState(true);
  const [selectedStartDate, setSelectedStartDate] = useState("");

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const WEEKDAYS = ["Да", "Мя", "Лх", "Пү", "Ба", "Бя", "Ня"];
  const MONTHS = [
    "1 сар",
    "2 сар",
    "3 сар",
    "4 сар",
    "5 сар",
    "6 сар",
    "7 сар",
    "8 сар",
    "9 сар",
    "10 сар",
    "11 сар",
    "12 сар",
  ];

  const onDateChange = (date) => {
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
    setSelectedStartDate(temp_date.getFullYear() + "-" + month + "-" + day);
  };

  const startDate = selectedStartDate ? selectedStartDate.toString() : "";
  return (
    <ScrollView
      contentContainerStyle={styles.mainContainer}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <Text style={styles.labelText}>Өдөр сонгох</Text>
      <View style={styles.cardContainer}>
        <CalendarPicker
          width={windowWidth - 40}
          onDateChange={onDateChange}
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
      <Text style={styles.labelText}>SELECTED DATE: {selectedStartDate}</Text>
      <Text style={styles.labelText}>Цаг сонгох</Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <TouchableOpacity style={styles.cardContainerTime}>
          <Text style={{ textAlign: "center" }}>12:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardContainerTime}>
          <Text style={{ textAlign: "center" }}>12:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardContainerTime}>
          <Text style={{ textAlign: "center" }}>12:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardContainerTime}>
          <Text style={{ textAlign: "center" }}>12:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardContainerTime}>
          <Text style={{ textAlign: "center" }}>12:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardContainerTime}>
          <Text style={{ textAlign: "center" }}>12:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardContainerTime}>
          <Text style={{ textAlign: "center" }}>12:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardContainerTime}>
          <Text style={{ textAlign: "center" }}>12:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardContainerTime}>
          <Text style={{ textAlign: "center" }}>12:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardContainerTime}>
          <Text style={{ textAlign: "center" }}>12:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardContainerTime}>
          <Text style={{ textAlign: "center" }}>12:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardContainerTime}>
          <Text style={{ textAlign: "center" }}>12:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardContainerTime}>
          <Text style={{ textAlign: "center" }}>12:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardContainerTime}>
          <Text style={{ textAlign: "center" }}>12:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardContainerTime}>
          <Text style={{ textAlign: "center" }}>12:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardContainerTime}>
          <Text style={{ textAlign: "center" }}>12:00</Text>
        </TouchableOpacity>
      </View>
      <Button
        containerStyle={styles.btnContainer}
        title="Үргэлжлүүлэх"
        color={MAIN_COLOR}
        radius={BUTTON_BORDER_RADIUS}
        onPress={() => {
          props.navigation.navigate("DoctorAppointmentStep2");
        }}
        titleStyle={{
          fontFamily: FONT_FAMILY_BOLD,
        }}
        buttonStyle={{ height: 45, borderRadius: 8 }}
        disabled={confirmButtonDisabled}
      />
    </ScrollView>
  );
};

export default DoctorAppointmentStep2;

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
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
    width: "22%",
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
});
