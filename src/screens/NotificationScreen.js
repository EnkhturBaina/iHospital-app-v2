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
} from "../constant";
import { Icon } from "@rneui/base";

const NotificationScreen = (props) => {
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
      contentContainerStyle={{
        backgroundColor: MAIN_COLOR_BG,
        flexGrow: 1,
        paddingHorizontal: 10,
      }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={MAIN_COLOR}
          colors={[MAIN_COLOR]}
        />
      }
    >
      <TouchableOpacity
        style={styles.notificationContainer}
        onPress={() => props.navigation.navigate("NotificationDtlScreen")}
      >
        <Icon
          name="calendar"
          type="feather"
          size={30}
          color={TEXT_COLOR_GRAY}
          style={{ marginHorizontal: 10 }}
        />
        <View style={{ flex: 1, flexDirection: "column", marginLeft: 10 }}>
          <Text
            style={{
              fontFamily: FONT_FAMILY_BOLD,
              color: MAIN_COLOR,
              fontSize: 18,
            }}
          >
            Reminder for Alarm
          </Text>
          <Text style={{ fontFamily: FONT_FAMILY_LIGHT, fontSize: 14 }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </Text>
          <Text style={{ fontFamily: FONT_FAMILY_LIGHT, fontSize: 12 }}>
            2023-01-23
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  notificationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 2,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
  },
});
