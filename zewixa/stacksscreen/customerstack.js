import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTab from "../bottomTab";
import Settings from "../customerScreens/profileScreens/setting";
import PlaceDetails from "../customerScreens/AddyourPlace/placeDetails";
import HostelFirstData from "../customerScreens/AddyourPlace/hostelfirstdata";
import HostelSecondData from "../customerScreens/AddyourPlace/hostelseconddata";
import FinalSubmit from "../customerScreens/AddyourPlace/finalsubmit";

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

      <CustomerBar.Screen name="PlaceDetails" component={PlaceDetails} />
      <CustomerBar.Screen name="HostelFirstData" component={HostelFirstData} />
      <CustomerBar.Screen name="HostelSecondData" component={HostelSecondData} />
      <CustomerBar.Screen name="FinalSubmit" component={FinalSubmit} />
    </CustomerBar.Navigator>
  );
};

export default CustomerStack;
