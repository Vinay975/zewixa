import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [hostInfo, setHostInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLoginState();
  }, []);

  const checkLoginState = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const customer = await AsyncStorage.getItem("customerInfo");
      const host = await AsyncStorage.getItem("hostInfo");

      if (token) {
        setUserToken(token);
        if (customer) setCustomerInfo(JSON.parse(customer));
        if (host) setHostInfo(JSON.parse(host));
      }
    } catch (error) {
      console.log("Error:", error);
    }
    setIsLoading(false);
  };

  const signInCustomer = async (token, user) => {
    setUserToken(token);
    setCustomerInfo(user);
    await AsyncStorage.setItem("userToken", token);
    await AsyncStorage.setItem("customerInfo", JSON.stringify(user));
  };

  const signInHost = async (token, host) => {
    setUserToken(token);
    setHostInfo(host);
    await AsyncStorage.setItem("userToken", token);
    await AsyncStorage.setItem("hostInfo", JSON.stringify(host));
  };

  const signOutCustomer = async () => {
    setUserToken(null);
    setCustomerInfo(null);
    await AsyncStorage.multiRemove(["userToken", "customerInfo"]);
  };

  const signOutHost = async () => {
    setUserToken(null);
    setHostInfo(null);
    await AsyncStorage.multiRemove(["userToken", "hostInfo"]);
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        customerInfo,
        hostInfo,
        isLoading,
        signInCustomer,
        signInHost,
        signOutCustomer,
        signOutHost,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
