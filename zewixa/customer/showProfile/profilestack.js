import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../../bottomscreens/profile";
import EditProfile from "./editProfile";

const stack = createStackNavigator();

const MainProfileStack  = () => {
    return(
        <stack.Navigator>
            <stack.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerShown: false,
                }}
            />
            <stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{
                    headerShown: false,
                }}
            />
        </stack.Navigator>

    )
}

export default MainProfileStack;