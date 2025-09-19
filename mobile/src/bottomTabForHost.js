import React from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

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
        tabBarStyle: { backgroundColor: "#fff", height: 88 },
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "bold",
          marginTop: 3,
        },
        headerBackground: () => (
          <LinearGradient
            colors={["#6846bd", "#4b0082"]}
            style={{ flex: 1 }}
          />
        ),
        headerTintColor: "#fff",

       
        tabBarIcon: ({ color, focused }) => {
          let iconName;
          let IconComponent = Ionicons;
          let iconSize = 30;

          if (route.name === "Host") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "Message") {
            iconName = focused ? "book-account" : "book-account-outline";
            IconComponent = MaterialCommunityIcons;
          } else if (route.name === "Payment") {
            iconName = "money-check-dollar";
            IconComponent = FontAwesome6;
            iconSize = 27;
          } else if (route.name === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }

          return <IconComponent name={iconName} size={iconSize} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Host"
        component={Host}
        options={{
          headerTitle: () => (
            <View style={styles.brandContainer}>
              <Text style={styles.brandSpot}>Spot</Text>
              <Text style={styles.brandAccomm}>Accom</Text>
            </View>
          ),
          headerRight: () => (
            <Ionicons
              name="notifications-outline"
              size={26}
              color="#fff"
              style={{ marginRight: 16 }}
              onPress={() =>
                Alert.alert("Notifications", "No new notifications")
              }
            />
          ),
        }}
      />

      <Tab.Screen name="Message" component={Message} />
      <Tab.Screen name="Payment" component={Payment} />
      <Tab.Screen name="Profile">
        {(props) => <HostProfile {...props} setIsHost={setIsHost} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default HostBottomBar;

const styles = StyleSheet.create({
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  brandSpot: {
    fontSize: 26,
    fontWeight: "800",
    color: "#ffffff", 
    textShadowColor: "#9BBD46",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginRight: 4,
    transform: [{ translateY: -3 }],
  },
  brandAccomm: {
    fontSize: 26,
    fontWeight: "800",
    color: "#9BBD46", 
    textShadowColor: "#ffffff",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    transform: [{ translateY: 3 }],
  },
});
