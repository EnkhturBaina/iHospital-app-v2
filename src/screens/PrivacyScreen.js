import { StyleSheet, Text, View, SafeAreaView, Platform } from "react-native";
import React, { useState } from "react";
import { MAIN_BACKGROUND_COLOR_GRAY, MAIN_COLOR } from "../constant";
import { Button, Switch } from "@rneui/themed";

const PrivacyScreen = () => {
  const [checked, setChecked] = useState(false);

  const toggleSwitch = () => {
    setChecked(!checked);
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: MAIN_BACKGROUND_COLOR_GRAY,
        paddingHorizontal: 20,
        justifyContent: "space-between",
        paddingTop: 20,
      }}
    >
      <View
        style={{
          borderRadius: 12,
          backgroundColor: "#fff",
          shadowOpacity: 0.2,
          shadowRadius: 3,
          shadowOffset: {
            height: 1,
            width: 0,
          },
          elevation: 2,
          paddingHorizontal: 10,
        }}
      >
        <View style={styles.eachSection}>
          <Text style={styles.textStyle}>Намайг санах</Text>
          <Switch
            value={checked}
            onValueChange={(value) => setChecked(value)}
            color={MAIN_COLOR}
          />
        </View>
        <View style={styles.eachSection}>
          <Text style={styles.textStyle}>Нүүр таних</Text>
          <Switch
            value={checked}
            onValueChange={(value) => setChecked(value)}
            color={MAIN_COLOR}
          />
        </View>
        <View style={styles.eachSection}>
          <Text style={styles.textStyle}>Хурууны хээ таних</Text>
          <Switch
            value={checked}
            onValueChange={(value) => setChecked(value)}
            color={MAIN_COLOR}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Button
          containerStyle={styles.btnContainer}
          title={
            <Text
              style={{
                fontSize: 16,
                color: MAIN_COLOR,
                fontWeight: "bold",
              }}
            >
              ПИН код өөрчлөх
            </Text>
          }
          color="#fff"
          radius={12}
          onPress={() => {}}
          titleStyle={{
            fontWeight: "bold",
          }}
          buttonStyle={{ height: 45 }}
        />
        <Button
          containerStyle={styles.btnContainer}
          title={
            <Text
              style={{
                fontSize: 16,
                color: MAIN_COLOR,
                fontWeight: "bold",
              }}
            >
              Нууц үг өөрчлөх
            </Text>
          }
          color="#fff"
          radius={12}
          onPress={() => {}}
          titleStyle={{
            fontWeight: "bold",
          }}
          buttonStyle={{ height: 45 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default PrivacyScreen;

const styles = StyleSheet.create({
  eachSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Platform.OS == "ios" ? 10 : 0,
  },
  btnContainer: {
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 20,
    width: "100%",
    borderColor: MAIN_COLOR,
    borderWidth: 2,
  },
  bottomContainer: {
    paddingBottom: 20,
  },
  textStyle: {
    fontSize: 16,
  },
});
