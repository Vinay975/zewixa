import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, Text, StyleSheet, Alert } from "react-native";

import Home from "./bottomscreens/home";
import WatchList from "./bottomscreens/watchlist";
import Profile from "./bottomscreens/profile";
import { WatchlistProvider } from "./FecthingData/watchingDetails";

const Tab = createBottomTabNavigator();

const BottomTab = ({ setIsHost }) => {
  return (
    <WatchlistProvider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "WatchList") {
              iconName = focused ? "heart-circle" : "heart-circle-outline";
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
          component={Home}
          options={{
            headerTitle: () => (
              <View style={styles.brandContainer}>
                <Text style={styles.brandText}>Habita</Text>
              </View>
            ),
            headerStyle: { backgroundColor: "#ffffff", height: 80 },
            headerRight: () => (
              <Ionicons
                name="notifications-outline"
                size={26}
                color="#6846bd"
                style={{ marginRight: 16 }}
                onPress={() =>
                  Alert.alert("Notifications", "No new notifications")
                }
              />
            ),
          }}
        />

        <Tab.Screen name="WatchList" component={WatchList} />
        <Tab.Screen name="Profile">
          {(props) => <Profile {...props} setIsHost={setIsHost} />}
        </Tab.Screen>
      </Tab.Navigator>
    </WatchlistProvider>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  brandText: {
    fontSize: 28,
    fontWeight: "800",
    color: "#6846bd",
    letterSpacing: 0.5,
  },
});
