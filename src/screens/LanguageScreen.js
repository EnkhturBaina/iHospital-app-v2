import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button } from "@rneui/base";
import CustomLookup from "../components/CustomLookup";
import BottomSheet from "../components/BottomSheet";
import { MAIN_COLOR, MAIN_COLOR_BG } from "../constant";

const LanguageScreen = () => {
  const [language, setLanguage] = useState("");

  const [data, setData] = useState(""); //BottomSheet рүү дамжуулах Дата
  const [uselessParam, setUselessParam] = useState(false); //BottomSheet -г дуудаж байгааг мэдэх гэж ашиглаж байгамоо
  const [fieldName, setFieldName] = useState(""); //Context -н аль утгыг OBJECT -с update хийхийг хадгалах
  const [displayName, setDisplayName] = useState(""); //LOOKUP -д харагдах утга (display value)

  const [loadingAction, setLoadingAction] = useState(false);

  const langList = [
    { id: 1, name: "Монгол" },
    { id: 2, name: "Англи" },
    { id: 3, name: "Орос" },
  ];
  const setLookupData = (data, field, display) => {
    // console.log("refRBSheet", refRBSheet);
    setData(data); //Lookup -д харагдах дата
    setFieldName(field); //Context -н object -н update хийх key
    setDisplayName(display); //Lookup -д харагдах датаны текст талбар
    setUselessParam(!uselessParam);
  };

  return (
    <View style={{ flex: 1, backgroundColor: MAIN_COLOR_BG, padding: 20 }}>
      <CustomLookup
        value={language.name}
        press={() => {
          setLookupData(langList, "gender", "name");
        }}
        placeholder="Сонгох"
        iconType="material-community"
        iconName="heart-multiple"
      />
      <Button
        disabled={loadingAction}
        containerStyle={styles.btnContainer}
        title={
          <>
            <Text
              style={{
                fontSize: 16,
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Сонгох
            </Text>
            {loadingAction ? (
              <ActivityIndicator style={{ marginLeft: 5 }} color="#fff" />
            ) : null}
          </>
        }
        color={MAIN_COLOR}
        radius={12}
        onPress={() => {}}
        titleStyle={{
          fontWeight: "bold",
        }}
        buttonStyle={{ height: 45 }}
      />
      <BottomSheet
        bodyText={data}
        dragDown={true}
        backClick={true}
        type="lookup"
        fieldName={fieldName}
        displayName={displayName}
        handle={uselessParam}
        action={(e) => {
          setLanguage(e);
        }}
      />
    </View>
  );
};

export default LanguageScreen;

const styles = StyleSheet.create({
  btnContainer: {
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",
  },
});
