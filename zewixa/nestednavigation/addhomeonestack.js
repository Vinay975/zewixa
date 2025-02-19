import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddHub from "../bottomscreens/addhub";
import HostelDataOne from "../stackscreen/hosteldata-one";
import HostelDataTwo from "../stackscreen/hosteldata-two";
import FinalSubmit from "../stackscreen/final-submit";

const AddHubStack = createStackNavigator();

const AddHubStackScreen = () => {
  return (
    <AddHubStack.Navigator>
      <AddHubStack.Screen
        name="AddHubMain"
        component={AddHub}
        options={{
          headerTitle: "Add Your Home",
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: "bold",
            color: "#6846bd",
            marginLeft: 20,
          },
          headerStyle: {
            backgroundColor: "#f0f0f0",
            height: 80,
          },
        }}
      />
      <AddHubStack.Screen
        name="HostelDataOne"
        component={HostelDataOne}
        options={{
          headerTitle: "Hostel Data",
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: "bold",
            color: "#6846bd",
            marginLeft: 20,
          },
          headerStyle: {
            backgroundColor: "#f0f0f0",
            height: 80,
          },
        }}
      />
      <AddHubStack.Screen
        name="HostelDataTwo"
        component={HostelDataTwo}
        options={{
          headerTitle: "Hostel Data",
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: "bold",
            color: "#6846bd",
            marginLeft: 20,
          },
          headerStyle: {
            backgroundColor: "#f0f0f0",
            height: 80,
          },
        }}
      />
      <AddHubStack.Screen
        name="FinalsSubmit"
        component={FinalSubmit}
        options={{
          headerTitle: "Final Submit",
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: "bold",
            color: "#6846bd",
            marginLeft: 20,
          },
          headerStyle: {
            backgroundColor: "#f0f0f0",
            height: 80,
          },
        }}
      />
    </AddHubStack.Navigator>
  );
};

export default AddHubStackScreen;
