import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTab from "../bottomTab";
import Settings from "../customerScreens/profileScreens/setting";


const CustomerBar = createStackNavigator();

const CustomerStack = ({ setIsHost }) => {
  return (
    <CustomerBar.Navigator screenOptions={{ headerShown: false }}>
      <CustomerBar.Screen name="BottomTab">
        {() => <BottomTab setIsHost={setIsHost} />}
      </CustomerBar.Screen>
      
      {/* 👇 Show the header only for Settings */}
      <CustomerBar.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: true }}
      />
    </CustomerBar.Navigator>
  );
};

export default CustomerStack;
