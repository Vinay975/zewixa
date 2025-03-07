import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HostBottomBar from "../bottomTabForHost";
import AboutPlace from "../Hostdata/addyourPlace/aboutpace";
import AboutOwner from "../Hostdata/addyourPlace/ownerdetials";
import HostelDataOne from "../Hostdata/addyourPlace/hostel-1";
import HostelDataTwo from "../Hostdata/addyourPlace/hostel-2";
import FinalSubmit from "../Hostdata/addyourPlace/finalSubmit";

const OwnerBar = createStackNavigator();

const OwnerStack = ({ setIsHost }) => {
  return (
    <OwnerBar.Navigator>
      <OwnerBar.Screen 
        name="Host" 
        options={{ headerShown: false }} 
        children={() => <HostBottomBar setIsHost={setIsHost} />}
      />
      <OwnerBar.Screen name="AboutPlace" component={AboutPlace} />
      <OwnerBar.Screen name="AboutOwner" component={AboutOwner} />
      <OwnerBar.Screen name="AboutHostel" component={HostelDataOne} /> 
      <OwnerBar.Screen name="AboutHostelTwo" component={HostelDataTwo} /> 
      <OwnerBar.Screen name="FinalSubmit" component={FinalSubmit} /> 
    </OwnerBar.Navigator>
  );
};

export default OwnerStack;
