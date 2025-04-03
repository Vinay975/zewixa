import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";


const HostelDataTwo = () => {

  const API_URL = "http://192.168.181.213:5000/api/hostels";
  const navigation = useNavigation();
  const route = useRoute();
  const { hostelData } = route.params || { hostelData: {} };
  const { ownerData } = hostelData || { ownerData: {} };
  
  const [formData, setFormData] = useState({
    meals: Array(7).fill({ tiffin: "", lunch: "", snacks: "", dinner: "" }),
    photos: {
      main: null,
      messRoom: null,
      topView: null,
      washroom: null,
      roomInterior: null,
      commonArea: null,
      balconyView: null,
      laundryArea: null,
    },
    wifi: "yes",
    rent: {
      OneSharing: "",
      TwoSharing: "",
      ThreeSharing: "",
      FourSharing: "",
      FiveSharing: "",
      Advance: "",
    },
  });

  // Function to handle changes in the meal input fields
  const handleInputChange = (field, value, index, mealType) => {
    setFormData((prev) => {
      const updatedMeals = [...prev.meals];
      updatedMeals[index] = { ...updatedMeals[index], [mealType]: value };
      return { ...prev, meals: updatedMeals };
    });
  };

  axios.get(API_URL)
  .then((response) => console.log(response.data))
  .catch((error) => console.error("API Error:", error));

  const handleSubmit = async () => {
  try {
    const formDataToSend = new FormData(); // Avoid overwriting `formData`

    // Add owner and hostel data as JSON
    formDataToSend.append("ownerData", JSON.stringify(ownerData));
    formDataToSend.append("hostelData", JSON.stringify(hostelData));

    // Ensure we correctly append images
    Object.keys(formData.photos).forEach((key) => {
      if (formData.photos[key]) {
        formDataToSend.append(key, {
          uri: formData.photos[key],
          name: `${key}.jpg`,
          type: "image/jpeg",
        });
      }
    });

    console.log("📤 Sending Data to API:", formDataToSend); // Debugging

    const response = await axios.post(`${API_URL}/api/create-hostel`, formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 201) {
      Alert.alert("Success", "Hostel data saved successfully!");
      navigation.navigate("FinalSubmit");
    }
  } catch (error) {
    console.error("❌ API Error:", error);
    Alert.alert("Error", "Failed to save hostel data.");
  }
};


  // Function to capture or select image
  const pickImage = async (photoType) => {
    // Ask for permissions
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== "granted" || galleryStatus !== "granted") {
      alert("Permission to access camera and gallery is required!");
      return;
    }

    // Show selection prompt
    Alert.alert(
      "Upload Photo",
      "Choose an option",
      [
        { text: "Take Photo", onPress: () => handleImage("camera", photoType) },
        { text: "Choose from Gallery", onPress: () => handleImage("gallery", photoType) },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  // Function to handle image selection or capture
  const handleImage = async (source, photoType) => {
    let result;
    if (source === "camera") {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }

    if (!result.canceled) {
      setFormData((prev) => ({
        ...prev,
        photos: { ...prev.photos, [photoType]: result.assets[0].uri },
      }));
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Hostel Image Upload Section */}
      <Text style={styles.sectionTitle}>Upload Hostel Images</Text>
      {[
        ["main", "messRoom"],
        ["topView", "washroom"],
        ["roomInterior", "commonArea"],
        ["balconyView", "laundryArea"],
      ].map((pair, rowIndex) => (
        <View key={rowIndex} style={styles.photoRow}>
          {pair.map((photoType) => (
            <TouchableOpacity key={photoType} style={styles.photoUpload} onPress={() => pickImage(photoType)}>
              <Ionicons name={getIcon(photoType)} size={40} color="#6846bd" />
              <Text style={styles.photoLabel}>{photoType.replace(/([A-Z])/g, " $1")}</Text>
              {formData.photos[photoType] && (
                <Image source={{ uri: formData.photos[photoType] }} style={styles.previewImage} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      ))}

      {/* Meal Schedule */}
      <Text style={styles.sectionTitle}>Meal Schedule</Text>
      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.dayText}>{day}</Text>
          {["tiffin", "lunch", "snacks", "dinner"].map((mealType) => (
            <TextInput
              key={mealType}
              style={styles.input}
              placeholder={mealType.charAt(0).toUpperCase() + mealType.slice(1)}
              value={formData.meals[index][mealType]}
              onChangeText={(value) => handleInputChange("meals", value, index, mealType)}
            />
          ))}
        </View>
      ))}

      {/* WiFi Selection */}
      <Text style={styles.sectionTitle}>WiFi</Text>
      <Picker
        selectedValue={formData.wifi}
        onValueChange={(value) => setFormData((prev) => ({ ...prev, wifi: value }))}
        style={styles.picker}
      >
        <Picker.Item label="Yes" value="yes" />
        <Picker.Item label="No" value="no" />
      </Picker>

      {/* Rent Details */}
      {[["OneSharing", "TwoSharing"], ["ThreeSharing", "FourSharing"], ["FiveSharing", "Advance"]].map(
        (pair, rowIndex) => (
          <View key={rowIndex} style={styles.rentRow}>
            {pair.map((key) => (
              <View key={key} style={styles.rentItem}>
                <Text style={styles.label}>{key.replace("Sharing", " Sharing")}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Amount"
                  keyboardType="numeric"
                  value={formData.rent[key]}
                  onChangeText={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      rent: { ...prev.rent, [key]: value },
                    }))
                  }
                />
              </View>
            ))}
          </View>
        )
      )}

      {/* Navigation Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HostelDataTwo;

/* Function to get appropriate icons */
const getIcon = (type) => {
  switch (type) {
    case "main":
      return "home-outline"; // Hostel Main Entrance
    case "messRoom":
      return "restaurant-outline"; // Mess / Dining Area
    case "topView":
      return "eye-outline"; // Top View of Hostel
    case "washroom":
      return "water-outline"; // Washroom/Bathroom
    case "roomInterior":
      return "bed-outline"; // Room Interior
    case "commonArea":
      return "people-outline"; // Common Area
    case "balconyView":
      return "cloud-outline"; // Balcony View
    case "laundryArea":
      return "shirt-outline"; // Laundry Area
    default:
      return "image-outline";
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9"
  },

  /* Section Titles */
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 15,
    color: "#000"
  },

  /* Photo Upload Styles */
  photoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",  /* Ensures wrapping in smaller screens */
    marginBottom: 15
  },

  photoUpload: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff"
  },

  photoLabel: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center"
  },

  previewImage: {
    width: 100,
    height: 100,
    marginTop: 5,
    borderRadius: 10
  },

  /* Meal Schedule Row */
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10
  },

  dayText: {
    width: 80,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333"
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: "#fff",
    textAlign: "center"  /* Centers input text */
  },

  /* Dropdown (WiFi Picker) */
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",  /* Prevents picker from expanding */
    marginBottom: 15
  },

  picker: {
    height: 50,
    backgroundColor: "#fff",
  },

  /* Rent Details */
  rentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15
  },

  rentItem: {
    flex: 1,
    marginHorizontal: 5
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000"
  },

  /* Submit Button */
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 40
  },

  button: {
    width: 150,
    paddingVertical: 12,
    backgroundColor: "#6846bd",
    borderRadius: 5,
    alignItems: "center"
  },

  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});
