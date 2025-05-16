// userAuth.js
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const signIn = (token, user) => {
    setUserToken(token);
    setUserInfo(user);
  };

  const signOut = () => {
    setUserToken(null);
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        userInfo,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
