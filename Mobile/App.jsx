import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import CustomerStack from "./src/stacksscreen/customerstack";
import OwnerStack from "./src/stacksscreen/ownerstack";
import { AuthProvider } from "./src/userDetails/userAuth";

export default function App() {
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
}

// import { View, Text } from 'react-native';

// export default function App() {
//   return (
//     <View>
//       <Text>App Running ✅</Text>
//     </View>
//   );
// }
