import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  RefreshControl,
} from "react-native";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";
import hospital from "../../../assets/hospital.png";
import {
  API_KEY,
  BUTTON_BORDER_RADIUS,
  DEV_URL,
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  MAIN_COLOR,
  MAIN_COLOR_BG,
  MAIN_COLOR_GRAY,
  TEXT_COLOR_GRAY,
} from "../../constant";
import { Icon, Button } from "@rneui/themed";
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
      url: `${DEV_URL}organization/structure`,
      params: {
        hospitalId: state.selectedHospital ? state.selectedHospital.id : null,
      },
      headers: {
        "X-API-KEY": API_KEY,
        Authorization: `Bearer ${state.accessToken}`,
      },
    })
      .then(async (response) => {
        console.log("response get HospitalList", response.data);
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
  }, []);

  return (
    <View>
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
                      state.selectedStructure.id == el.id ? MAIN_COLOR : "#fff",
                  },
                ]}
                key={index}
                onPress={() => {
                  state.setSelectedStructure(el);
                }}
              >
                <Text
                  style={[
                    styles.menuText,
                    {
                      color:
                        state.selectedStructure.id == el.id
                          ? "#fff"
                          : MAIN_COLOR,
                    },
                  ]}
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
          marginTop: 20,
        }}
      >
        <Button
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
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
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
    lineHeight: 16,
  },
});
