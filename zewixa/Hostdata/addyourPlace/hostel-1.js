import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const HostelDataOne = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { ownerData } = route.params || {}; 

  
  const ownerName = ownerData?.name ? `Hello Mr. ${ownerData.name}` : "Hello, Owner!";


  const [hostelName, setHostelName] = useState("");
  const [location, setLocation] = useState("");
  const [floors, setFloors] = useState("");
  const [rooms, setRooms] = useState("");
  const [gender, setGender] = useState(""); 
  const [acType, setAcType] = useState("");

  const handleNext = () => {
    if (!hostelName || !location || !floors || !rooms || !gender || !acType) {
      Alert.alert("Error", "Please fill all the required fields.");
      return;
    }
  
    const hostelData = {
      hostelName,
      location,
      floors,
      rooms,
      gender,
      acType,
      ownerData,
    };
  
    navigation.navigate("AboutHostelTwo", { hostelData });
  };
  

  return (
    <View style={styles.container}>
      {/* Greeting UI */}
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>{ownerName}</Text>
        <Text style={styles.subGreeting}>Let's set up your hostel details.</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Hostel Name"
        value={hostelName}
        onChangeText={setHostelName}
      />

      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />

      <TextInput
        style={styles.input}
        placeholder="Boys / Girls Hostel"
        value={gender} 
        onChangeText={setGender} 
      />

      <TextInput
        style={styles.input}
        placeholder="Ac / Non-Ac / Both"
        value={acType}
        onChangeText={setAcType} 
      />

      <TextInput
        style={styles.input}
        placeholder="Number of Floors"
        keyboardType="numeric"
        value={floors}
        onChangeText={setFloors}
      />

      <TextInput
        style={styles.input}
        placeholder="Number of Rooms"
        keyboardType="numeric"
        value={rooms}
        onChangeText={setRooms}
      />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HostelDataOne;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  greetingContainer: {
    backgroundColor: "#6846bd",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    width: "90%",
  },
  greetingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  subGreeting: {
    fontSize: 14,
    color: "#ddd",
    marginTop: 5,
  },
  input: {
    width: "90%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: "#6846bd",
    borderRadius: 5,
    shadowColor: "#6846bd",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});
