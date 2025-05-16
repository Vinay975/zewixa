import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import CustomerStack from "./stacksscreen/customerstack";
import OwnerStack from "./stacksscreen/ownerstack";
import { AuthProvider } from "./userDetails/userAuth";

const App = () => {
  const [isHost, setIsHost] = useState(true);

  return (
    <AuthProvider>
      <NavigationContainer>
        {isHost ? (
          <CustomerStack setIsHost={setIsHost} />
        ) : (
          <OwnerStack setIsHost={setIsHost} />
        )}
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
