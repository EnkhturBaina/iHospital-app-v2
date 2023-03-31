import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import BottomSheet from "../../components/BottomSheet";
import MainContext from "../../contexts/MainContext";
import CustomLookup from "../../components/CustomLookup";
import {
  BUTTON_BORDER_RADIUS,
  FONT_FAMILY_BOLD,
  MAIN_COLOR,
} from "../../constant";
import { Button } from "@rneui/base";

const DoctorAppointmentStep1 = (props) => {
  const state = useContext(MainContext);
  const [data, setData] = useState(""); //BottomSheet рүү дамжуулах Дата
  const [uselessParam, setUselessParam] = useState(false); //BottomSheet -г дуудаж байгааг мэдэх гэж ашиглаж байгамоо
  const [fieldName, setFieldName] = useState(""); //Context -н аль утгыг OBJECT -с update хийхийг хадгалах
  const [displayName, setDisplayName] = useState(""); //LOOKUP -д харагдах утга (display value)
  const [lookUpType, setLookUpType] = useState(""); //Update хийж буй OBJECT

  const [confirmButtonDisabled, setConfirmButtonDisabled] = useState(true);

  const setLookupData = (data, field, display, type) => {
    // console.log("refRBSheet", refRBSheet);
    setData(data); //Lookup -д харагдах дата
    setFieldName(field); //Context -н object -н update хийх key
    setDisplayName(display); //Lookup -д харагдах датаны текст талбар
    setLookUpType(type); //Update хийж буй OBJECT -н төрөл
    setUselessParam(!uselessParam);
  };
  const inspection = [
    { id: 0, name: "Үзлэг 1" },
    { id: 1, name: "Үзлэг 2" },
    { id: 2, name: "Үзлэг 3" },
  ];
  useEffect(() => {
    //Баталгаажуулах код, Нууц үг Validation БҮГД таарсан үед ҮРГЭЛЖЛҮҮЛЭХ button Идэвхтэй болгох
    setConfirmButtonDisabled(
      state.appointmentData.inspectionType != "" &&
        state.appointmentData.doctorId != ""
        ? false
        : true
    );
  }, [state.appointmentData]);
  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <CustomLookup
        label="Үзлэгийн төрөл"
        value={state.appointmentData?.inspectionType?.name}
        press={() => {
          setLookupData(inspection, "inspectionType", "name", "appointment");
        }}
      />
      <CustomLookup
        label="Үзлэгийн эмч"
        value={state.appointmentData?.doctorId?.name}
        press={() => {
          setLookupData(inspection, "doctorId", "name", "appointment");
        }}
      />
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
        buttonStyle={{ height: 45 }}
        // disabled={confirmButtonDisabled}
      />
      <BottomSheet
        bodyText={data}
        dragDown={true}
        backClick={true}
        type="lookup"
        fieldName={fieldName}
        displayName={displayName}
        lookUpType={lookUpType}
        handle={uselessParam}
      />
    </ScrollView>
  );
};

export default DoctorAppointmentStep1;

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  btnContainer: {
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 10,
    width: "100%",
  },
});
