import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useRef, useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import {
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  MAIN_COLOR,
  MAIN_COLOR_BG,
  TEXT_COLOR_GRAY,
} from "../constant";
import { Icon } from "@rneui/base";

const BannerScreen = () => {
  const [images, setImages] = useState([
    require("../../assets/image11.png"),
    require("../../assets/image11.png"),
    require("../../assets/banner.png"),
    require("../../assets/image13.png"),
    require("../../assets/image14.png"),
  ]);
  const ref = useRef();
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const [filterSpecial, setFilterSpecial] = useState(true);
  const [filterTrend, setFilterTrend] = useState(true);
  const [filterSale, setFilterSale] = useState(false);
  return (
    <View style={{ backgroundColor: MAIN_COLOR_BG, flex: 1 }}>
      <Carousel
        width={width}
        ref={ref}
        data={images}
        pagingEnabled
        style={{
          height: height * 0.25,
        }}
        mode="parallax"
        renderItem={({ item, index }) => (
          <TouchableOpacity activeOpacity={0.6} key={index} style={{ flex: 1 }}>
            <Image
              source={item}
              style={{
                width: width,
                flex: 1,
                borderRadius: 24,
              }}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
        }}
      >
        <TouchableOpacity style={styles.searchContainer} activeOpacity={1}>
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
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            width: 50,
            height: 50,
            backgroundColor: "#fff",
            borderRadius: 12,
            justifyContent: "center",
          }}
        >
          <Icon name="rows" type="octicon" size={20} color={TEXT_COLOR_GRAY} />
        </TouchableOpacity>
      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.eachFilter,
            filterSpecial
              ? {
                  backgroundColor: MAIN_COLOR,
                }
              : null,
          ]}
          onPress={() => setFilterSpecial(!filterSpecial)}
        >
          <Text
            style={[
              styles.filterText,
              filterSpecial
                ? {
                    color: "#fff",
                  }
                : null,
            ]}
          >
            Онцлох
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.eachFilter,
            filterTrend
              ? {
                  backgroundColor: MAIN_COLOR,
                }
              : null,
          ]}
          onPress={() => setFilterTrend(!filterTrend)}
        >
          <Text
            style={[
              styles.filterText,
              filterTrend
                ? {
                    color: "#fff",
                  }
                : null,
            ]}
          >
            Эрэлттэй
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.eachFilter,
            filterSale
              ? {
                  backgroundColor: MAIN_COLOR,
                }
              : null,
          ]}
          onPress={() => setFilterSale(!filterSale)}
        >
          <Text
            style={[
              styles.filterText,
              filterSale
                ? {
                    color: "#fff",
                  }
                : null,
            ]}
          >
            Хямдралтай
          </Text>
        </TouchableOpacity>
      </View>
      {/* <ScrollView contentContainerStyle={styles.gridContainer}></ScrollView> */}
      <View style={{ flex: 1 }}>
        <FlatList
          data={images}
          numColumns={3}
          contentContainerStyle={{ flexGrow: 1 }}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  height: 100,
                  margin: 5,
                }}
              >
                <Image
                  source={item}
                  style={{
                    borderRadius: 24,
                    width: "90%",
                    height: 100,
                  }}
                  resizeMode="cover"
                />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default BannerScreen;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 20,
    width: "80%",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  eachFilter: {
    borderRadius: 15,
    justifyContent: "center",
    height: 35,
    width: "32%",
    textAlign: "center",
    backgroundColor: "#E5E6EB",
    color: "#86909C",
    overflow: "hidden",
    alignItems: "center",
  },
  filterText: {
    fontFamily: FONT_FAMILY_LIGHT,
    color: "#86909C",
  },
  gridContainer: {
    flexGrow: 1,
  },
});
