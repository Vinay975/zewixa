import React from "react";
import { View, Text, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HostBottomBar from "../bottomTabForHost";

const OwnerBar = createStackNavigator()

const OwnerStack = ({ setIsHost }) => {
  return (
    <OwnerBar.Navigator screenOptions={{ headerShown: false }}>
        <OwnerBar.Screen name="HostBottomBar">
        {() => <HostBottomBar setIsHost={setIsHost} />}
      </OwnerBar.Screen>
    </OwnerBar.Navigator>
  );
};

export default OwnerStack;
