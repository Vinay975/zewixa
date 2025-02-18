import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddHub from "../bottomscreens/addhub";
import HostelDataOne from "../stackscreen/hosteldata-one";     
import { Button } from "react-native-paper";

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
      <View>
        <Button 
            onPress={() => navigation.navigate("HostelDataOne")}
            title="Hostels"
        />
      </View>
    </AddHubStack.Navigator>
    

  );
};

export default AddHubStackScreen;
