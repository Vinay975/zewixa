import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTab from "../bottomTab";
import Settings from "../customerScreens/profileScreens/setting";
import FetchingHostelData from "../FecthingData/hosteldata";
import HostelDetails from "../FecthingData/displayingData";


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
       <CustomerBar.Screen
        name="HostelDetails"
        component={HostelDetails}
        options={{ headerShown: true }}
      />
    </CustomerBar.Navigator>

  );
};

export default CustomerStack;
