import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);     // Common if needed
  const [customerInfo, setCustomerInfo] = useState(null);
  const [hostInfo, setHostInfo] = useState(null);

  const signInCustomer = (token, user) => {
    setUserToken(token);
    setCustomerInfo(user); // { username, email }
  };

  const signInHost = (token, host) => {
    setUserToken(token);
    setHostInfo(host); // { username, email }
  };

  const signOutCustomer = () => {
    setUserToken(null);
    setCustomerInfo(null);
  };

  const signOutHost = () => {
    setUserToken(null);
    setHostInfo(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        customerInfo,
        hostInfo,
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
