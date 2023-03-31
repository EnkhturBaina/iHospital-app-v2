import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  SafeAreaView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import {
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  MAIN_COLOR,
  TEXT_COLOR_GRAY,
} from "../../constant";
import Empty from "../../components/Empty";

const HistoryScreen = () => {
  const scrollFirst = useRef();
  const scrollSecond = useRef();
  const scrollThird = useRef();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Мессеж" },
    { key: "second", title: "Дуудлага" },
    { key: "third", title: "Ведио дуудлага" },
  ]);

  const FirstRoute = useCallback(() => {
    return (
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        bounces={false}
        showsVerticalScrollIndicator={false}
        ref={scrollFirst}
      >
        <Empty
          text="Төлөвлөсөн уулзалт байхгүй байна"
          subtext="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
          type="empty"
        />
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

export default React.memo(HistoryScreen);

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingBottom: Platform.OS == "ios" ? 70 : 60, //Bottom TAB -н өндөр
  },
});
