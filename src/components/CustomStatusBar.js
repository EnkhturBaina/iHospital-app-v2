import { View, SafeAreaView, StatusBar } from "react-native";

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{ backgroundColor }}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

export default MyStatusBar;
