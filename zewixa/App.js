import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import CustomerStack from "./stacksscreen/customerstack";
import OwnerStack from "./stacksscreen/ownerstack";

const App = () => {
  const [isHost, setIsHost] = useState(true);

  return (
    <NavigationContainer>
      {isHost ? (
        <CustomerStack setIsHost={setIsHost} />
      ) : (
        <OwnerStack setIsHost={setIsHost} />
      )}
    </NavigationContainer>
  );
};

export default App;
