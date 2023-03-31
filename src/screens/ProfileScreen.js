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
  TEXT_COLOR_GRAY,
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
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <SafeAreaView>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <Image
            source={avatar}
            resizeMode="contain"
            style={{ width: 140, height: 140, borderRadius: 280 }}
          />
          <Text
            style={{
              fontFamily: FONT_FAMILY_BOLD,
              fontSize: 24,
              marginTop: 10,
            }}
          >
            {state.userData
              ? state.userData?.lastName?.substr(0, 1) +
                ". " +
                state.userData?.firstName
              : null}
          </Text>
          <Text style={{ fontFamily: FONT_FAMILY_LIGHT }}>
            ID дугаар: {state.userData ? state.userData?.id : null}
          </Text>
        </View>
        <Divider style={{ marginTop: 10 }} />
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.profileMenuContainer}
            onPress={() => props.navigation.navigate("EditUserDataScreen")}
          >
            <View style={styles.stack1}>
              <Icon
                name="user-o"
                type="font-awesome"
                style={{ marginRight: 5 }}
              />
              <Text style={styles.cardText}>Профайл засах</Text>
            </View>
            <Icon name="keyboard-arrow-right" type="material-icons" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileMenuContainer}
            onPress={() => props.navigation.navigate("AccountScreen")}
          >
            <View style={styles.stack1}>
              <Icon
                name="newspaper-outline"
                type="ionicon"
                style={{ marginRight: 5 }}
              />
              <Text style={styles.cardText}>Дансны мэдээлэл</Text>
            </View>
            <Icon name="keyboard-arrow-right" type="material-icons" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileMenuContainer}
            onPress={() => props.navigation.navigate("PrivacyScreen")}
          >
            <View style={styles.stack1}>
              <Icon
                name="shield-check"
                type="octicon"
                style={{ marginRight: 5 }}
              />
              <Text style={styles.cardText}>Нууцлал</Text>
            </View>
            <Icon name="keyboard-arrow-right" type="material-icons" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileMenuContainer}
            onPress={() => props.navigation.navigate("QAScreen")}
          >
            <View style={styles.stack1}>
              <Icon name="question" type="octicon" style={{ marginRight: 5 }} />
              <Text style={styles.cardText}>Түгээмэл асуулт</Text>
            </View>
            <Icon name="keyboard-arrow-right" type="material-icons" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileMenuContainer}
            onPress={() => setVisibleDialog(true)}
          >
            <View style={styles.stack1}>
              <Icon name="log-out" type="feather" style={{ marginRight: 5 }} />
              <Text style={styles.cardText}>Системээс гарах</Text>
            </View>
            <Icon name="keyboard-arrow-right" type="material-icons" />
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
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  menuContainer: {
    marginTop: 10,
  },
  profileMenuContainer: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  icon: {
    height: 40,
    width: 40,
    resizeMode: "contain",
  },
  cardText: {
    fontFamily: FONT_FAMILY_BOLD,
    marginLeft: 10,
  },
  stack1: { flexDirection: "row", alignItems: "center" },
});
