import React, { useRef } from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";

const Loader = () => {
  const animation = useRef(null); //LottieView animation
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 50,
          height: 50,
          backgroundColor: "transparent",
        }}
        source={require("../../assets/loader_colored.json")}
      />
    </View>
  );
};

export default Loader;
