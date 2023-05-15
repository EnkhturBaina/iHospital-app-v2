import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import avatar from "../../assets/avatar.png";
import {
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  MAIN_COLOR,
  MAIN_COLOR_BG,
} from "../constant";
import { Icon } from "@rneui/base";
import { Divider } from "react-native-paper";
import CustomDialog from "../components/CustomDialog";
import MainContext from "../contexts/MainContext";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = (props) => {
  const state = useContext(MainContext);
  const navigation = useNavigation();
  const [visibleDialog, setVisibleDialog] = useState(false); //Dialog харуулах
  const [dialogType, setDialogType] = useState("warning"); //Dialog харуулах төрөл
  return (
    <ScrollView contentContainerStyle={styles.mainContainer} bounces={false}>
      <SafeAreaView>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <Image
            source={avatar}
            resizeMode="contain"
            style={styles.avatarStyle}
          />
          <Text
            style={{
              fontFamily: FONT_FAMILY_BOLD,
              fontSize: 24,
              marginTop: 10,
            }}
          >
            {state.userData?.globalPatient
              ? state.userData?.globalPatient?.lastName?.substr(0, 1) +
                ". " +
                state.userData?.globalPatient?.firstName
              : null}
          </Text>
          <Text style={{ fontFamily: FONT_FAMILY_LIGHT }}>
            ID дугаар:{" "}
            {state.userData?.globalPatient
              ? state.userData?.globalPatient?.id
              : null}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontFamily: FONT_FAMILY_BOLD }}>И-мэйл</Text>
            <Text style={{ fontFamily: FONT_FAMILY_LIGHT, color: "#86909C" }}>
              {state.userData?.globalPatient
                ? state.userData?.globalPatient?.email
                : null}
            </Text>
          </View>
          <Divider orientation="vertical" style={{ width: 1, height: "60%" }} />
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontFamily: FONT_FAMILY_BOLD }}>Утасны дугаар</Text>
            <Text style={{ fontFamily: FONT_FAMILY_LIGHT, color: "#86909C" }}>
              {state.userData?.globalPatient
                ? state.userData?.globalPatient?.phoneNo
                : null}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.resultContainer}
          onPress={() => props.navigation.navigate("XrayResultScreen")}
        >
          <Text style={{ fontSize: 18, color: "#fff" }}>
            Шинжилгээ/Оношилгооны хариу
          </Text>
        </TouchableOpacity>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.profileMenuContainer}
            onPress={() => props.navigation.navigate("EditUserDataScreen")}
          >
            <View style={styles.stack1}>
              <Text style={styles.cardText}>Профайл засах</Text>
            </View>
            <Icon
              name="keyboard-arrow-right"
              type="material-icons"
              color="#86909C"
            />
          </TouchableOpacity>
          <Divider style={{ marginHorizontal: 20 }} />
          {/* <TouchableOpacity
            style={styles.profileMenuContainer}
            onPress={() => props.navigation.navigate("AccountScreen")}
          >
            <View style={styles.stack1}>
              <Text style={styles.cardText}>И-Баримтны хялбар бүртгэл</Text>
            </View>
            <Icon
              name="keyboard-arrow-right"
              type="material-icons"
              color="#86909C"
            />
          </TouchableOpacity>
          <Divider style={{ marginHorizontal: 20 }} /> */}
          {/* <TouchableOpacity
            style={styles.profileMenuContainer}
            onPress={() => props.navigation.navigate("PrivacyScreen")}
          >
            <View style={styles.stack1}>
              <Text style={styles.cardText}>Нууцлал</Text>
            </View>
            <Icon
              name="keyboard-arrow-right"
              type="material-icons"
              color="#86909C"
            />
          </TouchableOpacity>
          <Divider style={{ marginHorizontal: 20 }} /> 
          <TouchableOpacity
            style={styles.profileMenuContainer}
            onPress={() => props.navigation.navigate("LanguageScreen")}
          >
            <View style={styles.stack1}>
              <Text style={styles.cardText}>Хэл солих (Монгол хэл MN)</Text>
            </View>
            <Icon
              name="keyboard-arrow-right"
              type="material-icons"
              color="#86909C"
            />
          </TouchableOpacity>*/}
          <Divider style={{ marginHorizontal: 20 }} />
          <TouchableOpacity
            style={styles.profileMenuContainer}
            onPress={() => setVisibleDialog(true)}
          >
            <View style={styles.stack1}>
              <Text style={styles.cardTextLogout}>Системээс гарах</Text>
            </View>
            <Icon
              name="keyboard-arrow-right"
              type="material-icons"
              color="#86909C"
            />
          </TouchableOpacity>
        </View>

        <CustomDialog
          visible={visibleDialog}
          confirmFunction={() => {
            setVisibleDialog(false);
            state.logout();
          }}
          declineFunction={() => {
            setVisibleDialog(false);
          }}
          text="Системээс гарах уу?"
          confirmBtnText="Гарах"
          DeclineBtnText="Хаах"
          type={dialogType}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    backgroundColor: MAIN_COLOR_BG,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  menuContainer: {
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  profileMenuContainer: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 15,
  },
  icon: {
    height: 40,
    width: 40,
    resizeMode: "contain",
  },
  cardText: {
    fontFamily: FONT_FAMILY_LIGHT,
    marginLeft: 10,
  },
  cardTextLogout: {
    fontFamily: FONT_FAMILY_BOLD,
    marginLeft: 10,
    color: "red",
  },
  stack1: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarStyle: {
    width: 140,
    height: 140,
    borderRadius: 280,
    borderColor: MAIN_COLOR,
    borderWidth: 3,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 14,
    alignItems: "center",
    height: 60,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  resultContainer: {
    backgroundColor: MAIN_COLOR,
    borderRadius: 14,
    alignItems: "center",
    height: 50,
    justifyContent: "center",
  },
});
