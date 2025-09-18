import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  FlatList,
  Dimensions,
} from "react-native";
import Slider from "@react-native-community/slider";
import { useNavigation, useRoute } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";


const { width } = Dimensions.get("window");

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

  const [totalCapacity, setTotalCapacity] = useState(50);
  const [currentPeople, setCurrentPeople] = useState(20);

  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const [acModalVisible, setAcModalVisible] = useState(false);

  const genderOptions = ["Boys", "Girls", "Co-Ed"];
  const acOptions = ["AC", "Non-AC", "Both"];

  const handleNext = () => {
    if (!hostelName || !location || !floors || !rooms || !gender || !acType) {
      Alert.alert("Error", "Please fill all the required fields.");
      return;
    }

    if (parseInt(rooms) < 1) {
      Alert.alert("Error", "Number of rooms must be at least 1.");
      return;
    }

    if (currentPeople > totalCapacity) {
      Alert.alert("Error", "Current people cannot exceed total capacity.");
      return;
    }

    const hostelData = {
      hostelName,
      location,
      floors,
      rooms,
      gender,
      acType,
      totalCapacity,
      currentPeople,
      ownerData,
    };

    navigation.navigate("AboutHostelTwo", { hostelData });
  };

  return (
    <View style={styles.container}>
      {/* Greeting */}
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>{ownerName}</Text>
        <Text style={styles.subGreeting}>
          Let’s set up your hostel details to welcome your guests.
        </Text>
      </View>

      {/* Basic Inputs */}
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

      <TouchableOpacity style={styles.input} onPress={() => setGenderModalVisible(true)}>
        <Text style={{ color: gender ? "#000" : "#aaa" }}>
          {gender || "Select Gender Type"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.input} onPress={() => setAcModalVisible(true)}>
        <Text style={{ color: acType ? "#000" : "#aaa" }}>
          {acType || "Select AC Type"}
        </Text>
      </TouchableOpacity>

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

      {/* Sliders */}
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Total Capacity: {totalCapacity}</Text>
        <Slider
          style={{ width: "90%" }}
          minimumValue={10}
          maximumValue={500}
          step={1}
          value={totalCapacity}
          minimumTrackTintColor="#6846bd"
          maximumTrackTintColor="#ccc"
          onValueChange={setTotalCapacity}
        />
      </View>

      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Current People: {currentPeople}</Text>
        <Slider
          style={{ width: "90%" }}
          minimumValue={0}
          maximumValue={totalCapacity}
          step={1}
          value={currentPeople}
          minimumTrackTintColor="#ff9800"
          maximumTrackTintColor="#ccc"
          onValueChange={setCurrentPeople}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      {/* Gender Modal */}
      <Modal transparent visible={genderModalVisible} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Gender Type</Text>
            <FlatList
              data={genderOptions}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    setGender(item);
                    setGenderModalVisible(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </Modal>

      {/* AC Modal */}
      <Modal transparent visible={acModalVisible} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select AC Type</Text>
            <FlatList
              data={acOptions}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    setAcType(item);
                    setAcModalVisible(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HostelDataOne;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  greetingContainer: {
    backgroundColor: "#6846bd",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  greetingText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  subGreeting: {
    fontSize: 14,
    color: "#ddd",
    marginTop: 5,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  sliderContainer: {
    width: "100%",
    marginBottom: 20,
  },
  sliderLabel: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  button: {
    paddingVertical: 12,
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
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: width * 0.8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  modalOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalOptionText: {
    fontSize: 16,
    textAlign: "center",
  },
});
