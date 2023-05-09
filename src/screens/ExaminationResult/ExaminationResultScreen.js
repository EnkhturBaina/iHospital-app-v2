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
  RefreshControl,
} from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  API_KEY,
  DEV_URL,
  FONT_FAMILY_BOLD,
  FONT_FAMILY_LIGHT,
  MAIN_COLOR,
  TEXT_COLOR_GRAY,
  MAIN_COLOR_BG,
  MAIN_COLOR_GRAY_BG,
} from "../../constant";
import Empty from "../../components/Empty";
import axios from "axios";
import MainContext from "../../contexts/MainContext";
import Loader from "../../components/Loader";
import avatar from "../../../assets/avatar.png";
import moment from "moment";
import "moment/locale/mn";
import { Divider, Icon } from "@rneui/base";

const ExaminationResultScreen = (props) => {
  const state = useContext(MainContext);
  const [historyList, setHistoryList] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getHistory();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const getHistory = async () => {
    setHistoryList([]);
    setHistoryLoading(true);
    await axios({
      method: "get",
      url: `${DEV_URL}mobile/inspection-note`,
      headers: {
        "X-API-KEY": API_KEY,
        Authorization: `Bearer ${state.accessToken}`,
      },
    })
      .then(async (response) => {
        // console.log("get History", JSON.stringify(response.data.response));
        if (response.status == 200) {
          setHistoryList(response.data.response);
        }
        setHistoryLoading(false);
      })
      .catch(function (error) {
        console.log("err", error);
        setHistoryLoading(false);
        console.log("error get History", error.response.data);
        if (error?.response?.status == 401) {
          state.setLoginError("Холболт салсан байна дахин нэвтэрнэ үү.");
          state.logout();
        }
      });
  };
  useEffect(() => {
    getHistory();
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: MAIN_COLOR_GRAY_BG,
      }}
    >
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
        {historyLoading ? (
          <Loader />
        ) : !historyLoading && historyList[0]?.inspectionNotes == "" ? (
          <Empty text="Танд захиалга байхгүй байна" subtext="" type="empty" />
        ) : (
          <>
            {historyList &&
              historyList?.map((hospital, index) => {
                return (
                  hospital &&
                  hospital.inspectionNotes?.map((el, index) => {
                    return (
                      <TouchableOpacity
                        style={styles.cardContainer}
                        key={index}
                        activeOpacity={0.8}
                        onPress={() =>
                          props.navigation.navigate("ExResultDtlScreen", {
                            dtlData: el,
                          })
                        }
                      >
                        <View style={styles.topContainer}>
                          <View style={styles.stack1}>
                            <Image
                              source={avatar}
                              resizeMode="contain"
                              style={styles.doctorImg}
                            />
                            <View style={styles.cardText}>
                              <Text style={styles.doctorName}>{el.name}</Text>
                              <Text style={styles.dateText}>
                                {hospital.name}
                              </Text>
                              <Text style={styles.dateText}>
                                {el?.cabinet?.name}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <Divider style={{ marginTop: 10 }} />
                        <View style={styles.bottomContainer}>
                          <Text style={{ fontFamily: FONT_FAMILY_BOLD }}>
                            {moment(el.createdAt)
                              .locale("mn")
                              .format("dddd, YYYY-MM-DD HH:MM")}
                          </Text>
                          <Icon
                            name="arrow-right"
                            type="feather"
                            size={20}
                            color={MAIN_COLOR}
                            style={styles.statIcon}
                          />
                        </View>
                      </TouchableOpacity>
                    );
                  })
                );
              })}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(ExaminationResultScreen);

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    backgroundColor: MAIN_COLOR_GRAY_BG,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  cardContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: 5,
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
    width: 30,
    height: 30,
    backgroundColor: MAIN_COLOR_BG,
    borderRadius: 50,
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
    marginTop: 5,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 5,
    marginTop: 5,
  },
});
