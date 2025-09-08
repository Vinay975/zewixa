import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomePage from "../bottomscreens/home";
import WatchList from "../bottomscreens/watchlist";
import Profile from "../bottomscreens/profile";
import { WatchlistProvider } from "../FecthingData/watchingDetails";



const Tab = createBottomTabNavigator();

const UserBottomTab = ({ setIsHost }) => {
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
          tabBarStyle: { height: 76 },
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: "bold",
            marginTop: 3,
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomePage}
          options={{
            headerTitle: "Habita",
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
        {/* <Tab.Screen name="Scanner" component={Scanner} /> */}
        {/* <Tab.Screen
          name="Booking"
          component={AddHub}
        /> */}
        <Tab.Screen name="Profile">
          {(props) => <Profile {...props} setIsHost={setIsHost} />}
        </Tab.Screen>
      </Tab.Navigator>
    </WatchlistProvider>
  );
};

export default UserBottomTab;