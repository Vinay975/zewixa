import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar, Platform } from "react-native";

import CustomerStack from "./src/stacksscreen/customerstack";
import OwnerStack from "./src/stacksscreen/ownerstack";
import { AuthProvider } from "./src/userDetails/userAuth";

export default function App() {
  const [isHost, setIsHost] = useState(true);

  return (
    <AuthProvider>
      {/* 🔥 Hide status bar completely */}
      <StatusBar
        hidden
        translucent
        backgroundColor="transparent"
      />

      <NavigationContainer>
        {isHost ? (
          <CustomerStack setIsHost={setIsHost} />
        ) : (
          <OwnerStack setIsHost={setIsHost} />
        )}
      </NavigationContainer>
    </AuthProvider>
  );
}
