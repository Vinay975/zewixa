import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, Text, StyleSheet, Platform } from "react-native";

import Host from "./Hostdata/bottomscreen/host";
import Message from "./Hostdata/bottomscreen/message";
import Payment from "./Hostdata/bottomscreen/payment";
import HostProfile from "./Hostdata/bottomscreen/hostprofile";
import HostDashBoard from "./Hostdata/afterLoginscreens/hostsdashboard";
import PaymentDashboard from "./Hostdata/afterLoginscreens/paymentdashborad"
import { AuthContext } from "./userDetails/userAuth";

const Tab = createBottomTabNavigator();

/* ---------- COMMON HEADER (WhatsApp Style) ---------- */
const commonHeaderOptions = {
  headerStyle: {
    backgroundColor: "#ffffff",
    height: 100,
    elevation: 0,
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    borderBottomWidth: 0,
  },
  headerShadowVisible: false,
};

const HostBottomTab = ({ setIsHost }) => {
  const { hostInfo } = React.useContext(AuthContext);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,

        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "Host") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Message") {
            iconName = focused
              ? "chatbubbles"
              : "chatbubbles-outline";
          } else if (route.name === "Payment") {
            iconName = focused ? "wallet" : "wallet-outline";
          } else {
            iconName = focused ? "person" : "person-outline";
          }

          return (
            <View
              style={[
                styles.iconContainer,
                focused && styles.iconContainerFocused,
              ]}
            >
              <Ionicons name={iconName} size={26} color={color} />
            </View>
          );
        },

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
      {/* ---------- HOST HOME ---------- */}
      <Tab.Screen
        name="Host"
        component={hostInfo ? HostDashBoard : Host}
        options={{
          ...commonHeaderOptions,
          headerTitle: () => (
            <Text style={styles.brandText}>Habita</Text>
          ),
        }}
      />

      {/* ---------- MESSAGE ---------- */}
      <Tab.Screen
        name="Message"
        component={Message}
      />

      {/* ---------- PAYMENT ---------- */}
      <Tab.Screen
        name="Payment"
        component={hostInfo ? PaymentDashboard : Payment}
      />

      {/* ---------- PROFILE ---------- */}
      <Tab.Screen name="Profile">
        {(props) => (
          <HostProfile {...props} setIsHost={setIsHost} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default HostBottomTab;

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
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
