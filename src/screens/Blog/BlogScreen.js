import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  Dimensions,
  ImageBackground,
  RefreshControl,
} from "react-native";
import React, { useRef, useState, useCallback } from "react";
import {
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  MAIN_COLOR,
  MAIN_COLOR_BG,
  MAIN_COLOR_GRAY,
  TEXT_COLOR_GRAY,
} from "../../constant";
import { Icon } from "@rneui/base";
import Carousel from "react-native-reanimated-carousel";
import HeaderUser from "../../components/HeaderUser";

const BlogScreen = (props) => {
  const [text, setText] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const ref = useRef();
  const [images, setImages] = useState([
    require("../../../assets/image11.png"),
    require("../../../assets/image11.png"),
    require("../../../assets/image11.png"),
  ]);

  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  return (
    <View style={styles.mainContainer}>
      <HeaderUser isContent={true} />
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 10 }}>
        <View style={styles.searchContainer}>
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
          <Icon
            name="sliders"
            type="feather"
            size={20}
            color={TEXT_COLOR_GRAY}
          />
        </View>
        <Carousel
          width={width - 24}
          ref={ref}
          data={images}
          pagingEnabled
          style={{
            borderRadius: 8,
            height: height * 0.2,
            marginVertical: 10,
          }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.6}
              key={index}
              onPress={() => {
                props.navigation.navigate("BlogDtlScreen");
              }}
              style={{ flex: 1 }}
            >
              <Image
                source={item}
                style={{
                  width: width - 24,
                  flex: 1,
                }}
                resizeMode="cover"
              />
              <Text style={styles.horizontalTagText} numberOfLines={2}>
                COVID-19
              </Text>
              <View
                style={{
                  alignSelf: "flex-start",
                }}
              >
                <Text style={styles.horizontalNewsText} numberOfLines={2}>
                  Paying the Price for Sun Damage
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <ScrollView
          contentContainerStyle={styles.blogScrollContainer}
          bounces={false}
          showsVerticalScrollIndicator={false}
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
            style={styles.blogContainer}
            activeOpacity={0.6}
            onPress={() => {
              props.navigation.navigate("BlogDtlScreen");
            }}
          >
            <ImageBackground
              source={require("../../../assets/image13.png")}
              resizeMode="cover"
              style={styles.blogImg}
              imageStyle={{ borderRadius: 8 }}
            >
              <View
                style={{
                  alignSelf: "flex-start",
                }}
              >
                <Text style={styles.imageText} numberOfLines={1}>
                  Personal Health
                </Text>
              </View>
            </ImageBackground>
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={2}>
                Paying the Price for Sun Damage
              </Text>
              <Text style={styles.body} numberOfLines={2}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit....
                Lorem ipsum dolor sit amet, consectetur adipiscing elit....
                Lorem ipsum dolor sit amet, consectetur adipiscing elit....
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default BlogScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    backgroundColor: MAIN_COLOR_BG,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: "95%",
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
  blogScrollContainer: {
    flexGrow: 1,
    marginTop: 10,
    paddingBottom: 10,
  },
  blogImg: {
    width: 140,
    height: 140,
    borderRadius: 8,
  },
  imageText: {
    color: MAIN_COLOR,
    fontFamily: FONT_FAMILY_BOLD,
    backgroundColor: MAIN_COLOR_BG,
    paddingVertical: 3,
    paddingHorizontal: 5,
    margin: 5,
    alignItems: "flex-start",
    borderRadius: 8,
  },
  textContainer: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-around",
    padding: 10,
  },
  title: {
    fontFamily: FONT_FAMILY_BOLD,
    fontSize: 24,
  },
  body: {
    fontFamily: FONT_FAMILY_LIGHT,
    fontSize: 14,
  },
  blogContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  horizontalNewsText: {
    position: "absolute",
    color: "#fff",
    width: "100%",
    bottom: 0,
    left: 0,
    padding: 5,
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    shadowOpacity: 0.5,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    overflow: "hidden",
    fontSize: 20,
    fontFamily: FONT_FAMILY_BOLD,
  },
  horizontalTagText: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: 5,
    color: MAIN_COLOR,
    fontFamily: FONT_FAMILY_BOLD,
    backgroundColor: MAIN_COLOR_BG,
    paddingVertical: 3,
    paddingHorizontal: 5,
    margin: 5,
    alignItems: "flex-start",
    borderRadius: 8,
  },
});
