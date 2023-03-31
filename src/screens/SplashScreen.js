import { StyleSheet, Text, View, LogBox, Image } from "react-native";
import React, { useEffect, useRef, useContext } from "react";
import LottieView from "lottie-react-native";
import { MAIN_COLOR } from "../constant";
import MainContext from "../contexts/MainContext";
import logo_white from "../../assets/logo_white.png";

if (__DEV__) {
  const ignoreWarns = [
    "EventEmitter.removeListener",
    "[fuego-swr-keys-from-collection-path]",
    "Setting a timer for a long period of time",
    "ViewPropTypes will be removed from React Native",
    "AsyncStorage has been extracted from react-native",
    "exported from 'deprecated-react-native-prop-types'.",
    "Non-serializable values were found in the navigation state.",
    "VirtualizedLists should never be nested inside plain ScrollViews",
  ];

  const warn = console.warn;
  console.warn = (...arg) => {
    for (const warning of ignoreWarns) {
      if (arg[0].startsWith(warning)) {
        return;
      }
    }
    warn(...arg);
  };

  LogBox.ignoreLogs(ignoreWarns);
}

const SplashScreen = () => {
  const state = useContext(MainContext);
  const animation = useRef(null);

  useEffect(() => {
    // setFontLoading(true);
  }, []);
  return (
    <View style={styles.animationContainer}>
      <Image
        source={logo_white}
        resizeMode="contain"
        style={{ width: "100%", height: 200 }}
      />
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 80,
          height: 80,
          backgroundColor: "transparent",
        }}
        source={require("../../assets/loader.json")}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  animationContainer: {
    flex: 1,
    backgroundColor: MAIN_COLOR,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
