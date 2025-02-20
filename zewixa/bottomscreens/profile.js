import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import EditProfile from "../customer/showProfile/editProfile";
import { createStackNavigator } from "@react-navigation/stack";

const Profile = () => {
  const navigation = useNavigation();
  const Stack = createStackNavigator();

  return (
    <ScrollView>
      <View style={Mystyle.profile}>
        <View style={Mystyle.profileContainer}></View>
        <View style={Mystyle.profileTextContainer}>
          <Text>userName</Text>
          <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
            <Text style={Mystyle.profileText}>ShowProfile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const Mystyle = StyleSheet.create({
  profile: {
    width: "90%",
    height: 100,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    margin: 10,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 20,
  },
  profileContainer: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "yellow",
    borderRadius: 100,
  },
  profileTextContainer: {
    width: 280,
    height: 80,
    borderWidth: 1,
    borderColor: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start", 
    marginLeft: 20,
  },
  profileText: {
    fontSize: 16,
    color: "black",
    margin: 10,
    textDecorationLine: "underline",
  },
});

export default Profile;