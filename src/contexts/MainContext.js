import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import { API_KEY, DEV_URL } from "../constant";

const MainContext = React.createContext();

export const MainStore = (props) => {
  const [email, setEmail] = useState("dorj0501@gmail.com");
  const [rememberEmail, setRememberEmail] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [userData, setUserData] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isIntroShow, setIsIntroShow] = useState(true);
  const [termCheck, setTermCheck] = useState(false);

  const [appointmentData, setAppointmentData] = useState({
    inspectionType: "",
    doctorId: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    getCustomFont();
  }, []);

  const getCustomFont = async () => {
    await Font.loadAsync({
      "Inter-Bold": require("../../assets/fonts/Inter-Bold.ttf"),
      "Inter-Light": require("../../assets/fonts/Inter-Light.ttf"),
    }).then(() => {
      getLocalUserData();
    });
  };

  const login = async (email, password, rememberEmail) => {
    //***** Нэвтрэх
    setIsLoading(true);
    await axios({
      method: "post",
      url: `${DEV_URL}authentication/login`,
      headers: {
        "X-API-KEY": API_KEY,
      },
      data: {
        email: email,
        password: password,
      },
    })
      .then(async (response) => {
        // console.log("responee login", response.data);
        if (response.status == 200) {
          setLoginError("");
          //*** access token хадгалах
          AsyncStorage.setItem(
            "accessToken",
            response.data.response.accessToken
          );
          //*** refresh token хадгалах
          AsyncStorage.setItem(
            "refreshToken",
            response.data.response.refreshToken
          );
          setAccessToken(response.data.response.accessToken);
          setRefreshToken(response.data.response.refreshToken);
          getProfileData(response.data.response.accessToken);
        }
      })
      .catch(function (error) {
        setIsLoading(false);
        // console.log("error login", error.response);
        if (error.response.status == 400) {
          setLoginError("Нэвтрэх нэр эсвэл нууц үг буруу");
        }
      });
  };

  const getProfileData = async (token) => {
    //***** Login хийсэн USER -н мэдээлэл авах
    await axios({
      method: "get",
      url: `${DEV_URL}authentication`,
      headers: {
        "X-API-KEY": API_KEY,
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        console.log("response get ProfileData", response.data);
        if (response.status == 200) {
          //*** user data хадгалах
          AsyncStorage.setItem(
            "userData",
            JSON.stringify(response.data.response)
          );
          setUserData(response.data.response);
          setIsLoggedIn(true);
        }
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsLoading(false);
      });
  };
  const logout = () => {
    AsyncStorage.removeItem("accessToken");
    AsyncStorage.removeItem("refreshToken");
    AsyncStorage.removeItem("userData");
    setIsLoggedIn(false);
  };

  const getLocalUserData = () => {
    //*** LocalStorage -с мэдээлэл уншиж авах
    try {
      //*** access token уншиж авах
      AsyncStorage.getItem("accessToken")
        .then((accessToken_local) => {
          setAccessToken(accessToken_local);
        })
        .then(() => {
          //*** refresh token уншиж авах
          AsyncStorage.getItem("refreshToken")
            .then((refreshToken_local) => {
              setRefreshToken(refreshToken_local);
            })
            .then(() => {
              //*** user data уншиж авах
              AsyncStorage.getItem("userData")
                .then((userData_local) => {
                  setUserData(JSON.parse(userData_local));
                  userData_local ? setIsLoggedIn(true) : setIsLoggedIn(false);
                })
                .then(() => {
                  setIsLoading(false);
                });
            });
        });
    } catch (error) {
      console.log("error");
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  };

  const resetAppontmentData = () => {
    setAppointmentData({
      inspectionType: "",
      doctorId: "",
      date: "",
      time: "",
    });
  };
  return (
    <MainContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        setIsLoading,
        accessToken,
        refreshToken,
        login,
        isIntroShow,
        setIsIntroShow,
        logout,
        appointmentData,
        setAppointmentData,
        resetAppontmentData,
        termCheck,
        setTermCheck,
        email,
        setEmail,
        rememberEmail,
        setRememberEmail,
        loginError,
        userData,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

export default MainContext;
