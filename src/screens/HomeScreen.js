import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  Platform,
  NativeModules,
  Dimensions,
} from "react-native";
const { StatusBarManager } = NativeModules;
import React, { useContext, useLayoutEffect, useRef, useState } from "react";
import MainContext from "../contexts/MainContext";
import { Icon } from "@rneui/base";
import {
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  MAIN_COLOR,
  MAIN_COLOR_BG,
  TEXT_COLOR_GRAY,
} from "../constant";
import HeaderUser from "../components/HeaderUser";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Carousel from "react-native-reanimated-carousel";
import MyStatusBar from "../components/CustomStatusBar";

const HomeScreen = (props) => {
  const state = useContext(MainContext);

  const ref = useRef();
  const [images, setImages] = useState([
    require("../../assets/istocl.jpg"),
    require("../../assets/Prime_Hospital.jpg"),
  ]);

  useLayoutEffect(() => {
    // TabBar Hide хийх
    props.navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "flex",
      },
    });
    return () =>
      props.navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
    // TabBar Hide хийх
  }, [props.navigation]);
  const menus = [
    {
      img: require("../../assets/homeMenus/receiptsearch.png"),
      label: "Оношилгооны хариу",
      nav: "XrayResultScreen",
      active: true,
    },
    {
      img: require("../../assets/homeMenus/receiptitem.png"),
      label: "Шинжилгээний хариу",
      nav: "ExaminationResultScreen",
      active: true,
    },
    {
      img: require("../../assets/homeMenus/buliding.png"),
      label: "Эмнэлэг",
      nav: "HospitalListScreen",
      active: true,
    },
    // ,
    // {
    //   img: require("../../assets/homeMenus/hospital.png"),
    //   label: "Эмийн сан",
    //   nav: "",
    //   active: false,
    // },
    // {
    //   img: require("../../assets/homeMenus/profile.png"),
    //   label: "Цахим эмч",
    //   nav: "",
    //   active: false,
    // },
    // {
    //   img: require("../../assets/homeMenus/profile2user.png"),
    //   label: "Сувилагч",
    //   nav: "",
    //   active: false,
    // },
  ];
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  return (
    <SafeAreaProvider
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
        backgroundColor: MAIN_COLOR_BG,
      }}
    >
      <MyStatusBar backgroundColor={MAIN_COLOR} barStyle="light-content" />

      <HeaderUser isContent={true} />
      <TouchableOpacity
        style={styles.searchContainer}
        activeOpacity={1}
        onPress={() => props.navigation.navigate("SearchScreen")}
      >
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <Icon
            name="search"
            type="feather"
            size={20}
            color={TEXT_COLOR_GRAY}
          />
          <Text
            style={{
              fontFamily: FONT_FAMILY_BOLD,
              color: TEXT_COLOR_GRAY,
              marginLeft: 10,
            }}
          >
            Хайх
          </Text>
        </View>
        <Icon name="sliders" type="feather" size={20} color={TEXT_COLOR_GRAY} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.mainContainer}>
        <Carousel
          width={width - 42}
          ref={ref}
          data={images}
          pagingEnabled
          style={{
            borderRadius: 12,
            height: height * 0.2,
            marginVertical: 10,
          }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.6}
              key={index}
              onPress={() => {
                // props.navigation.navigate("BannerScreen");
                props.navigation.navigate("BlogScreenDrawer");
              }}
              style={{ flex: 1 }}
            >
              <Image
                source={item}
                style={{
                  width: width - 42,
                  flex: 1,
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontFamily: FONT_FAMILY_BOLD }}>Бидний үйлчилгээ</Text>
          <Text style={styles.seeAll}>Бүгдийг харах</Text>
        </View>
        <View style={styles.menusContainer}>
          {menus.map((el, index) => {
            return (
              <TouchableOpacity
                style={[styles.menuItem, { opacity: !el.active ? 0.3 : 1 }]}
                key={index}
                onPress={() =>
                  el.nav ? props.navigation.navigate(el.nav) : null
                }
                disabled={!el.active}
              >
                <Image source={el.img} style={{ width: 25, height: 25 }} />
                <Text style={styles.menuText}>{el.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {/* <Image
          source={require("../../assets/bannersmall.png")}
          style={{ width: "100%", height: 85, borderRadius: 12 }}
          resizeMode="cover"
        /> */}
        <View style={styles.showRow}>
          <Text style={{ fontFamily: FONT_FAMILY_BOLD }}>
            Мэдээ, мэдээлэл (Зөвлөгөө)
          </Text>
          <Text style={styles.seeAll}>Бүгдийг харах</Text>
        </View>
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.newsScrollContainer}
          showsHorizontalScrollIndicator={false}
        >
          <TouchableOpacity
            style={styles.newsContainer}
            onPress={() => props.navigation.navigate("BlogDtlScreenDrawer")}
          >
            <Image
              source={require("../../assets/advice.jpg")}
              style={styles.newsImg}
              resizeMode="cover"
            />
            <Text numberOfLines={3} style={styles.newsText}>
              Хүйтний эрч чанга байгаа эдгээр өдрүүдэд малгайгаа өмсөж, дулаан
              хувцаслаарай.
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    backgroundColor: MAIN_COLOR_BG,
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: -20,
  },
  menusContainer: {
    flexWrap: "wrap",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "flex-start", // if you want to fill rows left to right
    marginTop: 10,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: -50,
    marginBottom: 5,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 2,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    backgroundColor: "#fff",
    width: "48%",
    flexDirection: "row",
    justifyContent: "center",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 2,
    marginBottom: 10,
    alignItems: "center",
  },
  menuText: {
    color: "#86909C",
    marginLeft: 10,
    flex: 1,
    fontWeight: "500",
    lineHeight: 16,
  },
  newsScrollContainer: {
    paddingVertical: 5,
  },
  newsContainer: {
    width: 160,
    height: 160,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 2,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginRight: 10,
  },
  newsImg: {
    width: "100%",
    height: 100,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  newsText: {
    padding: 10,
    fontFamily: FONT_FAMILY_LIGHT,
    fontSize: 12,
  },
  seeAll: {
    fontFamily: FONT_FAMILY_LIGHT,
    color: "#4A7FC1",
    opacity: 0.8,
  },
  showRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
});
