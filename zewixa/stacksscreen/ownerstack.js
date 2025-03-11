import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { createStackNavigator } from "@react-navigation/stack";

import HostBottomBar from "../bottomTabForHost";
import AboutPlace from "../Hostdata/addyourPlace/aboutpace";
import AboutOwner from "../Hostdata/addyourPlace/ownerdetials";
import HostelDataOne from "../Hostdata/addyourPlace/hostel-1";
import HostelDataTwo from "../Hostdata/addyourPlace/hostel-2";
import Apartment from "../Hostdata/addyourPlace/apparement";
import Tolet from "../Hostdata/addyourPlace/to-lets";
import Hotel from "../Hostdata/addyourPlace/hotel";
import FinalSubmit from "../Hostdata/addyourPlace/finalSubmit";

const OwnerBar = createStackNavigator();

const OwnerStack = ({ setIsHost }) => {
  return (
    <OwnerBar.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "transparent", 
      },
      headerBackground: () => (
        <LinearGradient
          colors={["#6846bd", "#3a1c71"]} 
          style={{ flex: 1 }}
        />
      ),
      headerTintColor: "#fff", // Text color
      headerTitleAlign: "center", // Center title
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 18,
      },
    }}
    >
      <OwnerBar.Screen
        name="Host"
        options={{ headerShown: false }}
        children={() => <HostBottomBar setIsHost={setIsHost} />}
      />
      <OwnerBar.Screen name="AboutPlace" component={AboutPlace} />
      <OwnerBar.Screen name="AboutOwner" component={AboutOwner} />
      <OwnerBar.Screen name="AboutHostel" component={HostelDataOne} />
      <OwnerBar.Screen name="AboutHostelTwo" component={HostelDataTwo} />
      <OwnerBar.Screen name="AboutApartment" component={Apartment} />
      <OwnerBar.Screen name="AboutToLets" component={Tolet} />
      <OwnerBar.Screen name="AboutHotel" component={Hotel} />
      <OwnerBar.Screen name="FinalSubmit" component={FinalSubmit} />
    </OwnerBar.Navigator>
  );
};

export default OwnerStack;
