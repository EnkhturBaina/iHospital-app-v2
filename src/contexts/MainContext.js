import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import { API_KEY, DEV_URL } from "../constant";

const MainContext = React.createContext();

export const MainStore = (props) => {
  const [email, setEmail] = useState("gantuya467@gmail.com");
  const [rememberEmail, setRememberEmail] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [userData, setUserData] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isIntroShow, setIsIntroShow] = useState(true);
  const [termCheck, setTermCheck] = useState(false);

  //Цаг захиалга
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedStructure, setSelectedStructure] = useState("");
  const [invoiceData, setInvoiceData] = useState("");

  const [hospitalList, setHospitalList] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const [loadingHospitals, setLoadingHospitals] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);

  const [appointmentData, setAppointmentData] = useState({
    department: "",
    doctor: "",
    schedule: "",
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

  const getHospitalList = async () => {
    setHospitalList([]);
    setLoadingHospitals(true);
    //***** Эмнэлэгийн жагсаалт авах
    await axios({
      method: "get",
      url: `${DEV_URL}organization/hospital`,
      headers: {
        "X-API-KEY": API_KEY,
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(async (response) => {
        console.log("response get HospitalList", response.data);
        if (response.status == 200) {
          setHospitalList(response.data.response.data);
        }
        setLoadingHospitals(false);
      })
      .catch(function (error) {
        setLoadingHospitals(false);
        console.log("errr", error.response.status);
        if (error?.response?.status == 401) {
          setLoginError("Холболт салсан байна дахин нэвтэрнэ үү.");
          logout();
        }
      });
  };

  const getDoctors = async () => {
    setDoctorList([]);
    setLoadingDoctors(true);
    //***** Эмчийн жагсаалт авах
    await axios({
      method: "get",
      url: `${DEV_URL}mobile/employee`,
      params: {
        hospitalId: selectedHospital ? selectedHospital.id : null,
      },
      headers: {
        "X-API-KEY": API_KEY,
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(async (response) => {
        console.log("response get Doctors", response.data.response);
        if (response.status == 200) {
          setDoctorList(response.data.response);
        }
        setLoadingDoctors(false);
      })
      .catch(function (error) {
        setLoadingDoctors(false);
        console.log("errr", error.response);
        if (error?.response?.status == 401) {
          setLoginError("Холболт салсан байна дахин нэвтэрнэ үү.");
          logout();
        }
      });
  };
  const login = async (userName, password, rememberEmail) => {
    //***** Нэвтрэх
    setIsLoading(true);
    await axios({
      method: "post",
      url: `${DEV_URL}authentication/login`,
      headers: {
        "X-API-KEY": API_KEY,
      },
      data: {
        email: userName,
        password,
      },
    })
      .then(async (response) => {
        if (rememberEmail) {
          //Нэвтрэх нэр сануулах CHECK хийсэн үед тухайн утсан дээр EMAIL хагалах
          await AsyncStorage.setItem("login_email", userName);
        } else {
          //Нэвтрэх нэр сануулах UNCHECK хийсэн үед тухайн утсан дээрээс EMAIL устгах
          await AsyncStorage.removeItem("login_email");
        }
        // console.log("responee login", response.data);
        if (response.status == 200) {
          setLoginError("");
          //*** access token хадгалах
          await AsyncStorage.setItem(
            "refreshToken",
            response.data.response.refreshToken
          ).then(async () => {
            setRefreshToken(response.data.response.refreshToken);
            //*** refresh token хадгалах
            await AsyncStorage.setItem(
              "accessToken",
              response.data.response.accessToken
            ).then(() => {
              setAccessToken(response.data.response.accessToken);
              getProfileData(response.data.response.accessToken);
            });
          });
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
          await AsyncStorage.setItem(
            "userData",
            JSON.stringify(response.data.response)
          ).then(() => {
            setUserData(response.data.response);
            setIsLoggedIn(true);
          });
        }
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsLoading(false);
      });
  };
  const logout = async () => {
    setIsLoading(true);
    await AsyncStorage.multiRemove([
      "accessToken",
      "refreshToken",
      "userData",
    ]).then((res) => {
      setIsLoggedIn(false);
      setIsLoading(false);
    });
  };

  const getLocalUserData = async () => {
    //*** LocalStorage -с мэдээлэл уншиж авах
    try {
      //*** access token уншиж авах
      await AsyncStorage.getItem("introShow").then(
        async (accessToken_local) => {
          if (accessToken_local == "hide") {
            setIsIntroShow(false);
          }
          await AsyncStorage.getItem("accessToken")
            .then((accessToken_local) => {
              setAccessToken(accessToken_local);
            })
            .then(async () => {
              //*** refresh token уншиж авах
              await AsyncStorage.getItem("refreshToken")
                .then((refreshToken_local) => {
                  setRefreshToken(refreshToken_local);
                })
                .then(async () => {
                  //*** user data уншиж авах
                  await AsyncStorage.getItem("userData")
                    .then((userData_local) => {
                      setUserData(JSON.parse(userData_local));
                      userData_local
                        ? setIsLoggedIn(true)
                        : setIsLoggedIn(false);
                    })
                    .then(() => {
                      setIsLoading(false);
                    });
                });
            });
        }
      );
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
        userData,
        selectedHospital,
        setSelectedHospital,
        loginError,
        setLoginError,
        invoiceData,
        setInvoiceData,
        selectedDoctor,
        setSelectedDoctor,
        hospitalList,
        doctorList,
        getHospitalList,
        getDoctors,
        loadingHospitals,
        loadingDoctors,
        selectedStructure,
        setSelectedStructure,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

export default MainContext;
