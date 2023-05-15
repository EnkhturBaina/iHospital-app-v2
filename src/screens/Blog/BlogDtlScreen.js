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
        backgroundColor: MAIN_COLOR,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
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
        source={require("../../../assets/advice.jpg")}
        resizeMode="cover"
        style={styles.blogImg}
      />
      <Text style={styles.bodyText}>
        Насанд хүрсэн хүн биеийн дулааны гуравны нэг хувийг толгой хэсгээрээ
        алддаг бол бага насны хүүхдүүд биеийн дулааны гуравны хоёр хэсгийг
        алддаг байна. Хүний уураг тархинд нэг минутад ойролцоогоор 750 мл
        (зүрхнээс тархи руу урсах цусны 15%) цус урсан тэжээлээр хангадаг бол
        хүйтний улиралд даарах тохиолдолд биеийн дулаанаа алдаж, улмаар гүрээний
        судас нарийсаж цусны урсгалын хурд удааширснаар тархины цусан хангамж
        мууддаг байна. Ингэснээр дараах эрүүл мэндийн сөрөг нөлөөг үзүүлдэг
        байна.
      </Text>
      <Text style={styles.bodyText}>&#8226; Архаг өвчин сэдрэх</Text>
      <Text style={styles.bodyText}>&#8226; Тархиар хатгуулж өвдөх</Text>
      <Text style={styles.bodyText}>&#8226; Хараа, сонсгол муудах</Text>
      <Text style={styles.bodyText}>&#8226; Нулимс гоождог болох</Text>
      <Text style={styles.bodyText}>&#8226; Нойр муудах</Text>
      <Text style={styles.bodyText}>&#8226; Мэдрэлийн суурь өвчин үүсэх</Text>
      <Text style={styles.bodyText}>&#8226; Ой тогтоолт муудах</Text>
      <Text style={styles.bodyText}>
        &#8226; Стресст өртөж ажлын чадвар буурах
      </Text>
      <Text style={styles.bodyText}>&#8226; Хуйхны эрүүл орчин алдагдах</Text>
      <Text style={styles.bodyText}>&#8226; Үс хуурайшиж, өнгөө алдах</Text>
      <Text style={styles.bodyText}>
        Тиймээс өвлийн улиралд малгай өмссөнөөр хүн дээрх өвчлөлөөс өөрийгөө
        хамгаална.
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
