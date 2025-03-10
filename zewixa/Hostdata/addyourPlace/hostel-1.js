import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker"; // Corrected import
import { useNavigation } from "@react-navigation/native";

const HostelDataOne = () => {
  const navigation = useNavigation();

  // State for form fields
  const [hostelName, setHostelName] = useState("");
  const [location, setLocation] = useState("");
  const [floors, setFloors] = useState("");
  const [rooms, setRooms] = useState("");
  const [gender, setGender] = useState("");
  const [sharing, setSharing] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hostel Details</Text>

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

      <Text style={styles.label}>Gender</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Co-Ed" value="Co-Ed" />
        </Picker>
      </View>

      <Text style={styles.label}>Sharing Options</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={sharing}
          onValueChange={(itemValue) => setSharing(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Sharing" value="" />
          <Picker.Item label="1 Sharing" value="1 Sharing" />
          <Picker.Item label="2 Sharing" value="2 Sharing" />
          <Picker.Item label="3 Sharing" value="3 Sharing" />
          <Picker.Item label="4 Sharing" value="4 Sharing" />
          <Picker.Item label="5 Sharing" value="5 Sharing" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AboutHostelTwo")}>
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
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
  label: {
    fontSize: 16,
    color: "#333",
    alignSelf: "flex-start",
    marginLeft: "5%",
    marginBottom: 5,
  },
  pickerContainer: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 15,
    overflow: "hidden",
  },
  picker: {
    width: "100%",
    height: 50,
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
