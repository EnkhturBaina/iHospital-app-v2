import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import React, { useLayoutEffect } from "react";
import {
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  MAIN_COLOR,
  MAIN_COLOR_BG,
  TEXT_COLOR_GRAY,
} from "../../constant";

const BlogDtlScreen = (props) => {
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

  return (
    <ScrollView
      contentContainerStyle={styles.mainContainer}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <Text style={styles.title}>Paying the Price for Sun Damage</Text>
      <View style={styles.topInfo}>
        <Text style={styles.tagText} numberOfLines={2}>
          COVID-19
        </Text>
        <Text style={styles.author} numberOfLines={2}>
          by Dr Jamet Kuproy-19
        </Text>
        <Text style={styles.postDate} numberOfLines={2}>
          25 May 2021
        </Text>
      </View>
      <Image
        source={require("../../../assets/image11.png")}
        resizeMode="cover"
        style={styles.blogImg}
      />
      <Text style={styles.bodyText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus
        error sit voluptatem accusantium doloremque laudantium, totam rem
        aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
        beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
        voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
        dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
        est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
        sed quia non numquam eius modi tempora incidunt ut labore et dolore
        magnam aliquam quaerat voluptatem. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
        odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
        quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
        eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
        voluptatem. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde
        omnis iste natus error sit voluptatem accusantium doloremque laudantium,
        totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
        architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
        quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
        magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
        quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
        adipisci velit, sed quia non numquam eius modi tempora incidunt ut
        labore et dolore magnam aliquam quaerat voluptatem.
      </Text>
    </ScrollView>
  );
};

export default BlogDtlScreen;

const styles = StyleSheet.create({
  title: {
    fontFamily: FONT_FAMILY_BOLD,
    fontSize: 20,
  },
  mainContainer: {
    flexGrow: 1,
    backgroundColor: MAIN_COLOR_BG,
    paddingHorizontal: 20,
  },
  topInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  tagText: {
    color: MAIN_COLOR,
    fontFamily: FONT_FAMILY_BOLD,
    backgroundColor: MAIN_COLOR_BG,
    paddingVertical: 3,
    paddingHorizontal: 5,
    alignItems: "flex-start",
    borderRadius: 8,
  },
  author: {
    fontFamily: FONT_FAMILY_BOLD,
    color: TEXT_COLOR_GRAY,
    fontSize: 12,
    marginLeft: 10,
  },
  postDate: {
    fontFamily: FONT_FAMILY_BOLD,
    color: TEXT_COLOR_GRAY,
    fontSize: 12,
    marginLeft: 10,
  },
  blogImg: {
    width: "100%",
    height: 180,
    borderRadius: 8,
  },
  bodyText: {
    marginTop: 10,
    fontFamily: FONT_FAMILY_LIGHT,
    textAlign: "justify",
  },
});
