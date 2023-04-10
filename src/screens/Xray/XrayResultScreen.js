import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import {
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  MAIN_COLOR,
  MAIN_COLOR_BG,
  TEXT_COLOR_GRAY,
} from "../../constant";
import { Icon } from "@rneui/base";

//Оношилгооны хариу
const XrayResultScreen = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  useLayoutEffect(() => {
    // TabBar Hide хийх
    props.navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () =>
      props.navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
    // TabBar Hide хийх
  }, [props.navigation]);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    wait(1000).then(() => setRefreshing(false));
  }, []);
  return (
    <ScrollView
      contentContainerStyle={styles.mainContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={MAIN_COLOR}
          colors={[MAIN_COLOR]}
        />
      }
    >
      <TouchableOpacity style={styles.examContainer} onPress={() => {}}>
        <View style={styles.stack1}>
          <Text style={{ fontFamily: FONT_FAMILY_BOLD }}>Эмнэлэгийн нэр</Text>
          <View style={styles.stack1Bottom}>
            <Icon name="clock" type="feather" size={15} />
            <Text style={styles.bottomText}>2022 / 02 / 02 10:00</Text>
          </View>
        </View>
        <View style={styles.stack2}>
          <Icon name="chevron-right" type="feather" size={15} color="#fff" />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default XrayResultScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: MAIN_COLOR_BG,
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  examContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 10,
  },
  stack1: {
    flexDirection: "column",
  },
  stack1Bottom: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  stack2: {
    backgroundColor: "#2D8CFF",
    borderRadius: 50,
    overflow: "hidden",
    padding: 3,
  },
  bottomText: {
    fontFamily: FONT_FAMILY_LIGHT,
    fontSize: 12,
    marginLeft: 5,
  },
});
