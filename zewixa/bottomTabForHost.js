import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import Host from "./Hostdata/bottomscreen/host";
import Message from "./Hostdata/bottomscreen/message";
import Payment from "./Hostdata/bottomscreen/payment";
import HostProfile from "./Hostdata/bottomscreen/hostprofile";

const Tab = createBottomTabNavigator();
const activeColor = "#6846bd";
const inactiveColor = "gray";

const HostBottomBar = ({ setIsHost }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: "#fff", height: 60 },
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        headerShown: false,
        // screenOptions={{ headerShown: false }}
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
          marginTop: 5,
        },

        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          let IconComponent = Ionicons;

          if (route.name === "Host") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "Message") {
            iconName = focused ? "chatbubbles" : "chatbubbles-outline";
          } else if (route.name === "Payment") {
            iconName = "credit-card";
            IconComponent = FontAwesome5;
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <IconComponent name={iconName} size={30} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Host" component={Host} />
      <Tab.Screen name="Message" component={Message} />
      <Tab.Screen name="Payment" component={Payment} />
      <Tab.Screen name="Profile">
        {(props) => <HostProfile {...props} setIsHost={setIsHost} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default HostBottomBar;
