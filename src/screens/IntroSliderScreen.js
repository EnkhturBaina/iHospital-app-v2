import { StyleSheet, Text, View, Image } from "react-native";
import React, { useContext, useState } from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import { CheckBox } from "@rneui/themed";
import { FONT_FAMILY_BOLD, FONT_FAMILY_LIGHT, MAIN_COLOR } from "../constant";
import MainContext from "../contexts/MainContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function IntroSliderScreen(props) {
  const [check2, setCheck2] = useState(false);
  const state = useContext(MainContext);

  const _renderNextButton = () => {
    return (
      <View style={styles.introButton}>
        <Text style={styles.generalText}>Дараах</Text>
      </View>
    );
  };
  const _renderDoneButton = () => {
    if (check2) {
      //Нэвтрэх нэр сануулах CHECK хийсэн үед тухайн утсан дээр EMAIL хагалах
      AsyncStorage.setItem("introShow", "hide");
    } else {
      AsyncStorage.setItem("introShow", "show");
    }
    return (
      <View style={styles.introButton}>
        <Text style={styles.generalText}>Болсон</Text>
      </View>
    );
  };
  const _renderSkipButton = () => {
    return (
      <View style={styles.introButton}>
        <Text style={styles.generalText}>Алгасах</Text>
      </View>
    );
  };

  const checkHandle = () => {
    setCheck2(!check2);
  };
  const _renderItem = ({ item, index }) => {
    return (
      <View style={{ alignItems: "center" }}>
        <Image
          style={{
            width: "90%",
            height: 250,
            resizeMode: "contain",
            marginTop: 100,
          }}
          source={item.img}
        />
        {/* <FastImage
          img_url={`${IMAGE_URL}${item.text_1}`}
          index={`introImgs${index}`}
          style={{
            width: "100%",
            height: 200,
            marginTop: 50,
            resizeMode: "contain",
          }}
        /> */}
        <Text
          style={{
            textAlign: "center",
            fontSize: 24,
            fontFamily: FONT_FAMILY_BOLD,
            paddingHorizontal: 20,
            marginTop: 50,
            color: MAIN_COLOR,
          }}
        >
          {item.title}
        </Text>
      </View>
    );
  };

  const DATA = [
    {
      value: 0,
      title: "1 Lorem Ipsum is simply dummy text ",
      img: require("../../assets/hospitalbg.png"),
    },
    {
      value: 1,
      title: "2 Lorem Ipsum is simply dummy text ",
      img: require("../../assets/hospitalbg.png"),
    },
    {
      value: 1,
      title: "3 Lorem Ipsum is simply dummy text ",
      img: require("../../assets/hospitalbg.png"),
    },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <AppIntroSlider
        data={DATA}
        renderItem={_renderItem}
        renderSkipButton={_renderSkipButton}
        renderDoneButton={_renderDoneButton}
        renderNextButton={_renderNextButton}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        showSkipButton
        onDone={() => {
          state.setIsIntroShow(false);
          props.navigation.navigate("LoginScreen");
        }}
      />
      <View style={styles.checkShow}>
        <CheckBox
          center
          textStyle={{ fontFamily: FONT_FAMILY_LIGHT, fontWeight: "normal" }}
          title="Энэ хуудсыг ахин харуулахгүй байх"
          iconType="material-community"
          checkedIcon="checkbox-outline"
          uncheckedIcon="checkbox-blank-outline"
          checked={check2}
          onPress={checkHandle}
          checkedColor={MAIN_COLOR}
          uncheckedColor={MAIN_COLOR}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  checkShow: {
    position: "absolute",
    bottom: 100,
  },
  dotStyle: {
    backgroundColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  activeDotStyle: {
    backgroundColor: MAIN_COLOR,
    width: 40,
    marginBottom: 15,
  },
  introButton: {
    backgroundColor: MAIN_COLOR,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  nextButton: {
    backgroundColor: MAIN_COLOR,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  generalText: {
    fontFamily: FONT_FAMILY_BOLD,
    color: "#fff",
  },
  generalTextNextButton: {
    color: "#fff",
    fontFamily: FONT_FAMILY_BOLD,
  },
});
