import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  SafeAreaView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import {
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  INPUT_BORDER_RADIUS,
  MAIN_COLOR,
  MAIN_COLOR_BG,
  TEXT_COLOR_GRAY,
} from "../../constant";
import Empty from "../../components/Empty";
import avatar from "../../../assets/avatar.png";
import { Divider, Icon } from "@rneui/base";

const MeetScreen = () => {
  const scrollFirst = useRef();
  const scrollSecond = useRef();
  const scrollThird = useRef();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Төлөвлөсөн" },
    { key: "second", title: "Уулзсан" },
    { key: "third", title: "Цуцалсан" },
  ]);

  const FirstRoute = useCallback(() => {
    return (
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        bounces={false}
        showsVerticalScrollIndicator={false}
        ref={scrollFirst}
      >
        {/* <Empty
          text="Төлөвлөсөн уулзалт байхгүй байна"
          subtext="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
          type="empty"
        /> */}
        <View style={styles.cardContainer}>
          <View style={styles.topContainer}>
            <View style={styles.stack1}>
              <Image
                source={avatar}
                resizeMode="contain"
                style={styles.doctorImg}
              />
              <View style={styles.cardText}>
                <Text style={styles.doctorName}>Б. Баатар</Text>
                <Text style={styles.dateText}>2022/02/02 16:00</Text>
              </View>
            </View>
            <Icon
              name="mail"
              type="feather"
              size={30}
              color={MAIN_COLOR}
              style={styles.statIcon}
            />
          </View>
          <Divider style={{ marginVertical: 10 }} />
          <View style={styles.bottomContainer}>
            <TouchableOpacity style={{ width: "48%" }}>
              <Text style={styles.btn1Text}>Уулзалтыг цуцлах</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: "48%" }}>
              <Text style={styles.btn2Text}>Дахин хувиарлах</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }, []);

  const SecondRoute = useCallback(() => {
    return <View style={{ flex: 1, backgroundColor: "#673ab7" }} />;
  }, []);

  const ThirdRoute = useCallback(() => {
    return <View style={{ flex: 1, backgroundColor: "red" }} />;
  }, []);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const layout = useWindowDimensions();

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: MAIN_COLOR }}
      pressColor="transparent"
      style={{ backgroundColor: "#fff", elevation: 0 }}
      renderLabel={({ route, focused, color }) => (
        <Text
          style={{
            color: focused ? MAIN_COLOR : TEXT_COLOR_GRAY,
            fontFamily: focused ? FONT_FAMILY_BOLD : FONT_FAMILY_LIGHT,
            fontSize: 12,
            width: 200,
            textAlign: "center",
          }}
        >
          {route.title}
        </Text>
      )}
      onTabPress={({ route, preventDefault }) => {
        if (route.key === "first") {
          scrollFirst.current?.scrollTo({
            y: 0,
            animated: true,
          });
        } else if (route.key === "second") {
          scrollSecond.current?.scrollTo({
            y: 0,
            animated: true,
          });
        } else if (route.key === "third") {
          scrollThird.current?.scrollTo({
            y: 0,
            animated: true,
          });
        }
      }}
    />
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </SafeAreaView>
  );
};

export default React.memo(MeetScreen);

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingBottom: Platform.OS == "ios" ? 40 : 30, //Bottom TAB -н өндөр
  },
  cardContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: 10,
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
  statIcon: {
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: MAIN_COLOR_BG,
    borderRadius: 50,
    marginRight: 20,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stack1: {
    flexDirection: "row",
    alignItems: "center",
  },
  doctorImg: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  cardText: {
    flexDirection: "column",
    marginLeft: 10,
  },
  doctorName: {
    fontFamily: FONT_FAMILY_BOLD,
    fontSize: 18,
  },
  dateText: {
    fontFamily: FONT_FAMILY_LIGHT,
    fontSize: 14,
    marginTop: 10,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  btn1Text: {
    borderRadius: INPUT_BORDER_RADIUS,
    borderColor: MAIN_COLOR,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    textAlign: "center",
    fontFamily: FONT_FAMILY_LIGHT,
    color: MAIN_COLOR,
    paddingVertical: 10,
  },
  btn2Text: {
    borderRadius: INPUT_BORDER_RADIUS,
    backgroundColor: MAIN_COLOR,
    paddingVertical: 5,
    paddingHorizontal: 10,
    textAlign: "center",
    color: "#fff",
    fontFamily: FONT_FAMILY_LIGHT,
    paddingVertical: 10,
  },
});
