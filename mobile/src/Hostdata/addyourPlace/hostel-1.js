import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Slider from "@react-native-community/slider";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const HostelDataOne = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { ownerData } = route.params || {};

  const [hostelName, setHostelName] = useState("");
  const [location, setLocation] = useState("");
  const [floors, setFloors] = useState("");
  const [rooms, setRooms] = useState("");
  const [gender, setGender] = useState("");
  const [acType, setAcType] = useState("");
  const [totalCapacity, setTotalCapacity] = useState(50);
  const [currentPeople, setCurrentPeople] = useState(20);

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
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <StatusBar backgroundColor="#F8F9FA" barStyle="dark-content" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Hostel Details</Text>
          <Text style={styles.subtitle}>Step 1 of 2</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>BASIC INFORMATION</Text>
          
          <View style={styles.inputCard}>
            <Ionicons name="business" size={18} color="#6846bd" />
            <TextInput
              style={styles.input}
              placeholder="Hostel Name"
              placeholderTextColor="#9CA3AF"
              value={hostelName}
              onChangeText={setHostelName}
            />
          </View>

          <View style={styles.inputCard}>
            <Ionicons name="location" size={18} color="#6846bd" />
            <TextInput
              style={styles.input}
              placeholder="Location"
              placeholderTextColor="#9CA3AF"
              value={location}
              onChangeText={setLocation}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputCard, { flex: 1, marginRight: 8 }]}>
              <Ionicons name="layers" size={18} color="#6846bd" />
              <TextInput
                style={styles.input}
                placeholder="Floors"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                value={floors}
                onChangeText={setFloors}
              />
            </View>
            <View style={[styles.inputCard, { flex: 1 }]}>
              <Ionicons name="grid" size={18} color="#6846bd" />
              <TextInput
                style={styles.input}
                placeholder="Rooms"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                value={rooms}
                onChangeText={setRooms}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>GENDER TYPE</Text>
          <View style={styles.chipRow}>
            {genderOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.chip, gender === option && styles.chipActive]}
                onPress={() => setGender(option)}
              >
                <Text style={[styles.chipText, gender === option && styles.chipTextActive]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>AC TYPE</Text>
          <View style={styles.chipRow}>
            {acOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.chip, acType === option && styles.chipActive]}
                onPress={() => setAcType(option)}
              >
                <Text style={[styles.chipText, acType === option && styles.chipTextActive]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>CAPACITY</Text>
          
          <View style={styles.sliderCard}>
            <View style={styles.sliderHeader}>
              <Text style={styles.sliderTitle}>Total Capacity</Text>
              <Text style={styles.sliderValue}>{totalCapacity}</Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={10}
              maximumValue={500}
              step={1}
              value={totalCapacity}
              minimumTrackTintColor="#6846bd"
              maximumTrackTintColor="#E5E7EB"
              thumbTintColor="#6846bd"
              onValueChange={setTotalCapacity}
            />
          </View>

          <View style={styles.sliderCard}>
            <View style={styles.sliderHeader}>
              <Text style={styles.sliderTitle}>Current Occupancy</Text>
              <Text style={[styles.sliderValue, { color: "#F59E0B" }]}>{currentPeople}</Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={totalCapacity}
              step={1}
              value={currentPeople}
              minimumTrackTintColor="#F59E0B"
              maximumTrackTintColor="#E5E7EB"
              thumbTintColor="#F59E0B"
              onValueChange={setCurrentPeople}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleNext}>
          <Text style={styles.submitButtonText}>Continue</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2D3436",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#636E72",
    letterSpacing: 1,
    marginBottom: 12,
  },
  inputCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    gap: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#2D3436",
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
  },
  chipRow: {
    flexDirection: "row",
    gap: 10,
  },
  chip: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
  },
  chipActive: {
    backgroundColor: "#6846bd",
    borderColor: "#6846bd",
  },
  chipText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#636E72",
  },
  chipTextActive: {
    color: "#fff",
  },
  sliderCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  sliderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sliderTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2D3436",
  },
  sliderValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#6846bd",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6846bd",
    marginHorizontal: 20,
    // marginVertical: 24,
    marginBottom:50,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    elevation: 3,
    shadowColor: "#6846bd",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
});

export default HostelDataOne;
