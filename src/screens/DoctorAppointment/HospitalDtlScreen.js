import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, {
  useLayoutEffect,
  useRef,
  useEffect,
  useState,
  useContext,
} from "react";
import hospitalbg from "../../../assets/hospitalbg.png";
import hospital from "../../../assets/hospital.png";
import {
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  MAIN_COLOR,
  TEXT_COLOR_GRAY,
} from "../../constant";
import { Icon } from "@rneui/base";
import avatar from "../../../assets/avatar.png";
import card_bg from "../../../assets/card-bg.png";
import MainContext from "../../contexts/MainContext";

const HEADER_HEIGHT = 250;

const HospitalDtlScreen = (props) => {
  const state = useContext(MainContext);
  const [tabIndex, setIndex] = useState(0);
  useLayoutEffect(() => {
    // TabBar Hide хийх
    props.navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    // TabBar Hide хийх
  }, [props.navigation]);

  return (
    <View>
      <Text>asd</Text>
    </View>
  );
};

export default HospitalDtlScreen;

const styles = StyleSheet.create({
  hospitalDtlContainer: {
    flexDirection: "column",
    width: "100%",
    paddingRight: 20,
    justifyContent: "flex-start",
    flex: 1,
  },
  hospitalContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingVertical: 10,
  },
  logo: {
    width: 30,
    height: 30,
    marginHorizontal: 20,
  },
  title: {
    fontFamily: FONT_FAMILY_BOLD,
    color: MAIN_COLOR,
  },
  type: {
    fontFamily: FONT_FAMILY_LIGHT,
    fontSize: 12,
  },
  addressContainer: {
    flexDirection: "column",
    marginTop: 10,
  },
  scheduleContainer: {
    flexDirection: "row",
  },
  address: {
    fontFamily: FONT_FAMILY_LIGHT,
    color: TEXT_COLOR_GRAY,
    marginLeft: 5,
  },
  menus: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  menuContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderColor: MAIN_COLOR,
    borderRadius: 8,
    borderWidth: 1,
    padding: 15,
    backgroundColor: MAIN_COLOR,
    justifyContent: "center",
  },
  menuText: {
    fontFamily: FONT_FAMILY_BOLD,
    marginLeft: 10,
    color: "#fff",
  },
  doctorContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    padding: 5,
  },
  tab2Container: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    marginVertical: 5,
  },
});
