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
import { useRoute, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const HostelDataTwo = () => {
  const API_URL = "http://192.168.30.213:5000/api/create-hostel";
  const navigation = useNavigation();
  const route = useRoute();
  const { hostelData } = route.params || { hostelData: {} };
  const { ownerData } = hostelData || { ownerData: {} };

  const [formData, setFormData] = useState({
    meals: [
      { day: "Monday", tiffin: "", lunch: "", snacks: "", dinner: "" },
      { day: "Tuesday", tiffin: "", lunch: "", snacks: "", dinner: "" },
      { day: "Wednesday", tiffin: "", lunch: "", snacks: "", dinner: "" },
      { day: "Thursday", tiffin: "", lunch: "", snacks: "", dinner: "" },
      { day: "Friday", tiffin: "", lunch: "", snacks: "", dinner: "" },
      { day: "Saturday", tiffin: "", lunch: "", snacks: "", dinner: "" },
      { day: "Sunday", tiffin: "", lunch: "", snacks: "", dinner: "" },
    ],    
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

  const handleInputChange = (field, value, index, mealType) => {
    setFormData((prev) => {
      const updatedMeals = [...prev.meals];
      updatedMeals[index] = { ...updatedMeals[index], [mealType]: value };
      return { ...prev, meals: updatedMeals };
    });
  };

  const handleRentChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      rent: {
        ...prev.rent,
        [field]: value,
      },
    }));
  };

  const pickImage = async (photoType) => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== "granted" || galleryStatus !== "granted") {
      Alert.alert("Permission required", "Allow camera and gallery access.");
      return;
    }

    Alert.alert("Upload Photo", "Choose an option", [
      { text: "Take Photo", onPress: () => handleImage("camera", photoType) },
      { text: "Choose from Gallery", onPress: () => handleImage("gallery", photoType) },
      { text: "Cancel", style: "cancel" },
    ]);
  };

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
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }

    if (!result.canceled) {
      setFormData((prev) => ({
        ...prev,
        photos: {
          ...prev.photos,
          [photoType]: result.assets[0].uri,
        },
      }));
    }
  };

  const getIcon = (type) => {
    const iconMap = {
      main: "home-outline",
      messRoom: "restaurant-outline",
      topView: "images-outline",
      washroom: "water-outline",
      roomInterior: "bed-outline",
      commonArea: "people-outline",
      balconyView: "sunny-outline",
      laundryArea: "shirt-outline",
    };
    return iconMap[type] || "image-outline";
  };

  const handleSubmit = async () => {
    try {
      // Step 1: Validate that at least main image is uploaded
      const requiredPhotos = ["main", "messRoom", "topView", "washroom", "roomInterior", "commonArea", "balconyView", "laundryArea"];
      const missingPhotos = requiredPhotos.filter((key) => !formData.photos[key]);
  
      if (missingPhotos.length > 0) {
        Alert.alert("Missing Images", `Please upload the following images: ${missingPhotos.join(", ")}`);
        return;
      }
  
      // Step 2: Show preview log (for debugging)
      console.log("All image URIs:");
      Object.entries(formData.photos).forEach(([key, uri]) => {
        console.log(`${key}: ${uri}`);
      });
  
      // Step 3: Construct FormData
      const formDataToSend = new FormData();
      formDataToSend.append("ownerData", JSON.stringify(ownerData));
      formDataToSend.append("hostelData", JSON.stringify(hostelData));
      formDataToSend.append("meals", JSON.stringify(formData.meals));
      formDataToSend.append("wifi", formData.wifi);
      formDataToSend.append("rent", JSON.stringify(formData.rent));
  
      // Append images to formData
      Object.entries(formData.photos).forEach(([key, uri]) => {
        if (uri) {
          const fileUriParts = uri.split("/");
          const fileName = fileUriParts[fileUriParts.length - 1];
          const fileType = fileName.split(".").pop();
      
          formDataToSend.append(key, {
            uri,
            name: fileName,
            type: `image/${fileType === "jpg" ? "jpeg" : fileType}`,
          });
        }
      });
      // Step 4: Submit to backend
      const response = await axios.post(API_URL, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",  // Ensure the content type is multipart/form-data
          "Accept": "application/json",
        },
      });
  
      if (response.status === 201) {
        Alert.alert("Success", "Hostel data saved successfully!");
        navigation.navigate("FinalSubmit");
      }
    } catch (error) {
      console.error("Submission Error:", error.response?.data || error.message);
      Alert.alert("Error", "Failed to submit hostel data.");
    }
  };
    

  return (
    <ScrollView style={styles.container}>
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
              <Ionicons name={getIcon(photoType)} size={36} color="#6846bd" />
              <Text style={styles.photoLabel}>{photoType.replace(/([A-Z])/g, " $1")}</Text>
              {formData.photos[photoType] && (
                <Image source={{ uri: formData.photos[photoType] }} style={styles.previewImage} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <Text style={styles.sectionTitle}>Meal Schedule</Text>
      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.dayText}>{day}</Text>
          {["tiffin", "lunch", "snacks", "dinner"].map((mealType) => (
            <TextInput
              key={mealType}
              style={styles.input}
              placeholder={mealType}
              value={formData.meals[index][mealType]}
              onChangeText={(value) => handleInputChange("meals", value, index, mealType)}
            />
          ))}
        </View>
      ))}

      <Text style={styles.sectionTitle}>WiFi</Text>
      <Picker
        selectedValue={formData.wifi}
        onValueChange={(value) => setFormData((prev) => ({ ...prev, wifi: value }))}
        style={styles.picker}
      >
        <Picker.Item label="Yes" value="yes" />
        <Picker.Item label="No" value="no" />
      </Picker>

      <Text style={styles.sectionTitle}>Rent Details</Text>
      {[
        ["OneSharing", "TwoSharing"],
        ["ThreeSharing", "FourSharing"],
        ["FiveSharing", "Advance"],
      ].map((pair, index) => (
        <View key={index} style={styles.rentRow}>
          {pair.map((key) => (
            <TextInput
              key={key}
              style={styles.input}
              placeholder={`${key} Rent`}
              keyboardType="numeric"
              value={formData.rent[key]}
              onChangeText={(value) => handleRentChange(key, value)}
            />
          ))}
        </View>
      ))}

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 12,
    color: "#333",
  },
  row: {
    marginBottom: 10,
  },
  rentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    margin: 5,
    borderRadius: 5,
  },
  picker: {
    marginVertical: 10,
  },
  photoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  photoUpload: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
  photoLabel: {
    marginTop: 6,
    fontSize: 12,
    textAlign: "center",
  },
  previewImage: {
    width: 80,
    height: 80,
    marginTop: 5,
    borderRadius: 8,
  },
  dayText: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  submitBtn: {
    backgroundColor: "#6846bd",
    padding: 12,
    marginVertical: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default HostelDataTwo;
