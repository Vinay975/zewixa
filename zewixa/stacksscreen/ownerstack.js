import React from "react";
import { View, Text, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HostBottomBar from "../bottomTabForHost";

import AboutPlace from "../Hostdata/addyourPlace/aboutpace";
import AboutOwner from "../Hostdata/addyourPlace/ownerdetials";

const OwnerBar = createStackNavigator()

const OwnerStack = ({ setIsHost }) => {
  return (
    <OwnerBar.Navigator>
        <OwnerBar.Screen name="Host"  screenOptions={{ headerShown: false }}>
        {() => <HostBottomBar setIsHost={setIsHost} />}
      </OwnerBar.Screen>
      <OwnerBar.Screen name="AboutPlace" component={AboutPlace}/>
      <OwnerBar.Screen name="AboutOwner" component={AboutOwner}/>
    </OwnerBar.Navigator>
  );
};

export default OwnerStack;
