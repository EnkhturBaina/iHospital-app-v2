import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { API_KEY, DEV_URL, FONT_FAMILY_BOLD, MAIN_COLOR } from "../../constant";
import { Button } from "@rneui/themed";
import axios from "axios";
import MainContext from "../../contexts/MainContext";
import Loader from "../../components/Loader";
import Empty from "../../components/Empty";

const HospitalStructuresScreen = (props) => {
  const state = useContext(MainContext);
  const [hospitalStructures, setHospitalStructures] = useState("");
  const [loadingStructures, setLoadingStructures] = useState(false);

  const getStructureList = async () => {
    setHospitalStructures([]);
    setLoadingStructures(true);
    //***** Эмнэлэгийн тасагийн жагсаалт
    await axios({
      method: "get",
      url: `${DEV_URL}mobile/department/${state.appointmentData.hospital.id}`,
      params: {
        type: 2, //type == 2 тасаг
      },
      headers: {
        "X-API-KEY": API_KEY,
        Authorization: `Bearer ${state.accessToken}`,
      },
    })
      .then(async (response) => {
        // console.log("response get HospitalList", response.data);
        if (response.status == 200) {
          setHospitalStructures(response.data.response.data);
        }
        setLoadingStructures(false);
      })
      .catch(function (error) {
        setLoadingStructures(false);
        console.log("errr", error.response.status);
        if (error?.response?.status == 401) {
          state.setLoginError("Холболт салсан байна дахин нэвтэрнэ үү.");
          state.logout();
        }
      });
  };
  useEffect(() => {
    getStructureList();
    return () => {
      state.setAppointmentData((prevState) => ({
        ...prevState,
        structure: "",
      }));
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {hospitalStructures == "" && !loadingStructures ? (
        <Empty type="empty" text="Тасаг олдсонгүй" />
      ) : null}
      <ScrollView contentContainerStyle={styles.mainScroller} bounces={false}>
        {loadingStructures ? (
          <Loader />
        ) : (
          hospitalStructures &&
          hospitalStructures?.map((el, index) => {
            return (
              <TouchableOpacity
                style={[
                  styles.menuItem,
                  {
                    backgroundColor:
                      state.appointmentData.structure.id == el.id
                        ? MAIN_COLOR
                        : "#fff",
                  },
                ]}
                key={index}
                onPress={() => {
                  state.setAppointmentData((prevState) => ({
                    ...prevState,
                    structure: el,
                  }));
                }}
              >
                <Text
                  style={[
                    styles.menuText,
                    {
                      color:
                        state.appointmentData.structure.id == el.id
                          ? "#fff"
                          : MAIN_COLOR,
                    },
                  ]}
                  numberOfLines={2}
                >
                  {el.name}
                </Text>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>

      <View
        style={{
          width: "80%",
          marginRight: "auto",
          marginLeft: "auto",
          marginTop: 10,
          marginBottom: Platform.OS == "ios" ? 20 : 10,
        }}
      >
        <Button
          disabled={state.appointmentData.structure == ""}
          title="Үргэлжлүүлэх (1/5)"
          color={MAIN_COLOR}
          radius={12}
          onPress={() => {
            props.navigation.navigate("DoctorsScreen");
          }}
          titleStyle={{
            fontFamily: FONT_FAMILY_BOLD,
          }}
          buttonStyle={{ height: 45 }}
        />
      </View>
    </View>
  );
};

export default HospitalStructuresScreen;

const styles = StyleSheet.create({
  mainScroller: {
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "flex-start", // if you want to fill rows left to right
    marginTop: 10,
    paddingBottom: 10,
  },
  menuItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
    width: "45%",
    flexDirection: "row",
    justifyContent: "center",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 2,
    marginBottom: 10,
    alignItems: "center",
    height: 60,
  },
  menuText: {
    color: MAIN_COLOR,
    marginLeft: 10,
    flex: 1,
    fontWeight: "500",
  },
});
