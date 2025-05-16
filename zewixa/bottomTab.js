import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import Home from "./bottomscreens/home";
import Scanner from "./bottomscreens/scanner";
import WatchList from "./bottomscreens/watchlist";
import AddHub from "./bottomscreens/addhub";
import Profile from "./bottomscreens/profile";
import { WatchlistProvider } from "./FecthingData/watchingDetails";



const Tab = createBottomTabNavigator();

const BottomTab = ({ setIsHost }) => {
  return (
    <WatchlistProvider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "WatchList") {
              iconName = focused ? "heart-circle" : "heart-circle-outline";
            } else if (route.name === "Scanner") {
              iconName = focused ? "qr-code" : "qr-code";
            } else if (route.name === "Booking") {
              iconName = focused ? "bookmarks" : "bookmarks-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person-circle" : "person-circle-outline";
            }
            return <Ionicons name={iconName} size={30} color={color} />;
          },
          tabBarActiveTintColor: "#6846bd",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { height: 60 },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
            marginTop: 5,
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: "Zewixa",
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: "bold",
              color: "#6846bd",
              marginLeft: 20,
            },
            headerStyle: { backgroundColor: "#f0f0f0", height: 80 },
          }}
        />
        <Tab.Screen name="WatchList" component={WatchList} />
        <Tab.Screen name="Scanner" component={Scanner} />
        <Tab.Screen
          name="Booking"
          component={AddHub}
        />
        <Tab.Screen name="Profile">
          {(props) => <Profile {...props} setIsHost={setIsHost} />}
        </Tab.Screen>
      </Tab.Navigator>
    </WatchlistProvider>
  );
};

export default BottomTab;