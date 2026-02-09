import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, StyleSheet, Alert, Platform } from "react-native";

import Home from "./bottomscreens/home";
import WatchList from "./bottomscreens/watchlist";
import Profile from "./bottomscreens/profile";
import { WatchlistProvider } from "./FecthingData/watchingDetails";

const Tab = createBottomTabNavigator();

/* ---------- COMMON HEADER (WhatsApp Style) ---------- */
const commonHeaderOptions = {
  headerStyle: {
    backgroundColor: "#ffffff02",
    height: 80,
    elevation: 0, // Android
    shadowColor: "transparent", // iOS
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    borderBottomWidth: 0,
  },
  headerShadowVisible: false,
};

const BottomTab = ({ setIsHost }) => {
  return (
    <WatchlistProvider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,

          tabBarIcon: ({ focused, color }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.iconContainerFocused,
              ]}
            >
              {route.name === "Home" ? (
                <MaterialCommunityIcons
                  name={focused ? "home-city" : "home-city-outline"}
                  size={26}
                  color={color}
                />
              ) : route.name === "WatchList" ? (
                <Ionicons
                  name={focused ? "bookmark" : "bookmark-outline"}
                  size={26}
                  color={color}
                />
              ) : (
                <Ionicons
                  name={focused ? "person-circle" : "person-circle-outline"}
                  size={26}
                  color={color}
                />
              )}
            </View>
          ),

          tabBarActiveTintColor: "#6846bd",
          tabBarInactiveTintColor: "#9CA3AF",

          tabBarStyle: {
            height: 80,
            paddingBottom: Platform.OS === "ios" ? 20 : 10,

            backgroundColor: "#ffffff",
            borderTopWidth: 1,
            borderTopColor: "#E5E7EB",
            elevation: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
          },

          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "600",
            marginTop: -2,
          },
        })}
      >
        {/* ---------- HOME ---------- */}
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            ...commonHeaderOptions,
            headerTitle: () => (
              <View style={styles.brandContainer}>
                <Text style={styles.brandText}>Habita</Text>
              </View>
            ),
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

        {/* ---------- WATCHLIST ---------- */}
        <Tab.Screen
          name="WatchList"
          component={WatchList}
          options={commonHeaderOptions}
        />

        {/* ---------- PROFILE ---------- */}
        <Tab.Screen name="Profile" options={commonHeaderOptions}>
          {(props) => <Profile {...props} setIsHost={setIsHost} />}
        </Tab.Screen>
      </Tab.Navigator>
    </WatchlistProvider>
  );
};

export default BottomTab;

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  brandContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  brandText: {
    fontSize: 28,
    fontWeight: "800",
    color: "#6846bd",
    letterSpacing: 0.5,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
  },
  iconContainerFocused: {
    transform: [{ scale: 1.1 }],
  },
});
