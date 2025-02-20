import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from "./bottomscreens/home";
import Scanner from "./bottomscreens/scanner";
import WatchList from "./bottomscreens/watchlist";
import Profile from "./bottomscreens/profile";
import AddHub from "./bottomscreens/addhub";
import AddHubStackScreen from "./nestednavigation/addhomeonestack";
import MainProfileStack from "./customer/showProfile/profilestack";

const Stack = createStackNavigator();
const BottomTabTab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <BottomTabTab.Navigator
      screenOptions={({ route }) => ({
        // headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          }
          else if (route.name === 'WatchList') {
            iconName = focused ? 'heart-circle' : 'heart-circle-outline';
          }
          else if (route.name === 'Scanner') {
            iconName = focused ? 'qr-code' : 'qr-code';
          }
          else if (route.name === 'Booking') {
            iconName = focused ? 'bookmarks' : 'bookmarks-outline';
          }
          else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }
          return <Ionicons name={iconName} size={30} color={color} />;
        },
        tabBarActiveTintColor: '#6846bd',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          marginTop: 5,
        },
      })}
    >
      <BottomTabTab.Screen name="Home" component={Home}
        options={{
          headerTitle: 'Zewixa',
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold',
            color: '#6846bd',
            marginLeft: 20,
          },
          headerStyle: {
            backgroundColor: '#f0f0f0',
            height: 80,
          },
        }}
      />
       <BottomTabTab.Screen name="WatchList" component={WatchList} />
      <BottomTabTab.Screen name="Scanner" component={Scanner} />
      <BottomTabTab.Screen name="Booking" component={AddHubStackScreen}
        options={{
          headerShown: false,
        }
        }
      />
      <BottomTabTab.Screen name="Profile" component={MainProfileStack} />
    </BottomTabTab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="BottomTab" component={BottomTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
