import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import BottomTab from "./bottomTab";

import Home from "./bottomscreens/home";


// Import All Profile Screens
import Settings from "./customerScreens/profileScreens/setting";

// Import All Add Your Place Screens
import PlaceDetails from "./customerScreens/AddyourPlace/placeDetails";
import HostelFirstData from "./customerScreens/AddyourPlace/hostelfirstdata";
import HostelSecondData from "./customerScreens/AddyourPlace/hostelseconddata";
import FinalSubmit from "./customerScreens/AddyourPlace/finalsubmit";


const MainStack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        <MainStack.Screen name="BottomTab" component={BottomTab} />
        <MainStack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: true,
            headerTitle: "Settings",
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: "bold",
              color: "#6846bd",
              marginLeft: 10,
            },
            headerStyle: { backgroundColor: "#f0f0f0", height: 80 },
          }}
        />
        <MainStack.Screen
          name="PlaceDetails"
          component={PlaceDetails}
          options={{
            headerShown: true,
            headerTitle: "Add Your Place",
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: "bold",
              color: "#6846bd",
              marginLeft: 10,
            },
            headerStyle: { backgroundColor: "#f0f0f0", height: 80 },
          }}
        />
        <MainStack.Screen
          name="HostelFirstData"
          component={HostelFirstData}
          options={{
            headerShown: true,
            headerTitle: "Zewixa",
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: "bold",
              color: "#6846bd",
              marginLeft: 10,
            },
            headerStyle: { backgroundColor: "#f0f0f0", height: 80 },
          }}
        />
        <MainStack.Screen
          name="HostelSecondData"
          component={HostelSecondData}
          options={{
            headerShown: true,
            headerTitle: "Zewixa",
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: "bold",
              color: "#6846bd",
              marginLeft: 10,
            },
            headerStyle: { backgroundColor: "#f0f0f0", height: 80 },
          }}
        />
         <MainStack.Screen
          name="FinalSubmit"
          component={FinalSubmit}
          options={{
            headerShown: true,
            headerTitle: "Zewixa",
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: "bold",
              color: "#6846bd",
              marginLeft: 10,
            },
            headerStyle: { backgroundColor: "#f0f0f0", height: 80 },
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
