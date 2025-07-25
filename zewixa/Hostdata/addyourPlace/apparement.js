import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Animated,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const ApartmentData = () => {
  const API_URL = "https://myapp-kida.onrender.com/api/create-apartment";
  const navigation = useNavigation();

  const { ownerData } = useRoute().params || {};
  // console.log(ownerData)

  const [formData, setFormData] = useState({
    photos: {
      building: null,
      livingRoom: null,
      kitchen: null,
      bedroom: null,
      bathroom: null,
      balcony: null,
    },
    rent: {
      oneBHK: "",
      twoBHK: "",
      threeBHK: "",
      fourBHK: "",
    },
    advancePayment: "",
    wifiAvailable: "yes",
    security: {
      cctv: false,
      securityGuards: false,
      gatedCommunity: false,
      fireSafety: false,
    },
  });

  // Image picker function
  const pickImage = async (photoType) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Allow gallery access.");
      return;
    }
    Alert.alert("Upload Photo", "Choose an option", [
      { text: "Take Photo", onPress: () => handleImage("camera", photoType) },
      { text: "Choose from Gallery", onPress: () => handleImage("gallery", photoType) },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleImage = async (source, photoType) => {
    const result =
      source === "camera"
        ? await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 1 })
        : await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 1 });

    if (!result.canceled) {
      setFormData((prev) => ({
        ...prev,
        photos: { ...prev.photos, [photoType]: result.assets[0].uri },
      }));
    }
  };

  // Rent input change handler
  const handleRentChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      rent: { ...prev.rent, [field]: value },
    }));
  };

  // Security checkbox toggle
  const toggleSecurity = (field) => {
    setFormData((prev) => ({
      ...prev,
      security: { ...prev.security, [field]: !prev.security[field] },
    }));
  };

  // Submit function
  const handleSubmit = async () => {
    const missing = Object.keys(formData.photos).filter((k) => !formData.photos[k]);
    if (missing.length) {
      Alert.alert("Missing Images", `Please upload: ${missing.join(", ")}`);
      return;
    }

    const formDataToSend = new FormData();

    // 1. Append owner data
    formDataToSend.append("ownerData", JSON.stringify(ownerData));

    // 2. Append owner image
    if (ownerData?.profileImage) {
      const uri = ownerData.profileImage;
      const name = uri.split("/").pop();
      const type = `image/${name.split(".").pop()}`;
      formDataToSend.append("ownerPhoto", { uri, name, type });
    }

    // 3. Other fields
    formDataToSend.append("rent", JSON.stringify(formData.rent));
    formDataToSend.append("advancePayment", formData.advancePayment);
    formDataToSend.append("wifiAvailable", formData.wifiAvailable);
    formDataToSend.append("security", JSON.stringify(formData.security));

    // 4. Apartment photos
    Object.entries(formData.photos).forEach(([key, uri]) => {
      const name = uri.split("/").pop();
      const type = `image/${name.split(".").pop()}`;
      formDataToSend.append(key, { uri, name, type });
    });

    try {
      const res = await axios.post(API_URL, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 201) {
        Alert.alert("Success", "Apartment data saved!");
        navigation.navigate("FinalSubmit");
      }
    } catch (err) {
      console.error("Submission Error:", err);
      Alert.alert("Error", "Failed to submit apartment data.");
    }
  };

  // Icon map for photo types
  const getIcon = (type) =>
  ({
    building: "business-outline",
    livingRoom: "ios-tv-outline",
    kitchen: "restaurant-outline",
    bedroom: "bed-outline",
    bathroom: "water-outline",
    balcony: "sunny-outline",
  }[type] || "image-outline");

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Upload Apartment Photos</Text>

      {Object.keys(formData.photos).map((photoType) => (
        <TouchableOpacity
          key={photoType}
          style={styles.photoUpload}
          onPress={() => pickImage(photoType)}
        >
          <Ionicons name={getIcon(photoType)} size={36} color="#6846bd" />
          <Text style={styles.photoLabel}>{photoType.charAt(0).toUpperCase() + photoType.slice(1)}</Text>
          {formData.photos[photoType] && (
            <Image source={{ uri: formData.photos[photoType] }} style={styles.previewImage} />
          )}
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionTitle}>Rent Details</Text>
      <View style={styles.rentRow}>
        <TextInput
          style={styles.input}
          placeholder="1 BHK Rent"
          keyboardType="numeric"
          value={formData.rent.oneBHK}
          onChangeText={(v) => handleRentChange("oneBHK", v)}
        />
        <TextInput
          style={styles.input}
          placeholder="2 BHK Rent"
          keyboardType="numeric"
          value={formData.rent.twoBHK}
          onChangeText={(v) => handleRentChange("twoBHK", v)}
        />
      </View>
      <View style={styles.rentRow}>
        <TextInput
          style={styles.input}
          placeholder="3 BHK Rent"
          keyboardType="numeric"
          value={formData.rent.threeBHK}
          onChangeText={(v) => handleRentChange("threeBHK", v)}
        />
        <TextInput
          style={styles.input}
          placeholder="4 BHK Rent"
          keyboardType="numeric"
          value={formData.rent.fourBHK}
          onChangeText={(v) => handleRentChange("fourBHK", v)}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Advance Payment"
        keyboardType="numeric"
        value={formData.advancePayment}
        onChangeText={(v) => setFormData((p) => ({ ...p, advancePayment: v }))}
      />

      <Text style={styles.sectionTitle}>WiFi Available</Text>
      <Picker
        selectedValue={formData.wifiAvailable}
        onValueChange={(v) => setFormData((p) => ({ ...p, wifiAvailable: v }))}
        style={styles.picker}
      >
        <Picker.Item label="Yes" value="yes" />
        <Picker.Item label="No" value="no" />
      </Picker>

      <Text style={styles.sectionTitle}>Security Features</Text>
      {Object.keys(formData.security).map((key) => (
        <TouchableOpacity
          key={key}
          style={styles.checkboxContainer}
          onPress={() => toggleSecurity(key)}
        >
          <Ionicons
            name={formData.security[key] ? "checkbox-outline" : "square-outline"}
            size={24}
            color="#6846bd"
          />
          <Text style={styles.checkboxLabel}>
            {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit Apartment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: "#fff" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 12, color: "#333" },
  photoUpload: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
  photoLabel: { marginTop: 6, fontSize: 14, textAlign: "center" },
  previewImage: { width: 120, height: 120, marginTop: 5, borderRadius: 8 },
  rentRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    margin: 5,
    borderRadius: 5,
    fontSize: 14,
  },
  picker: { marginVertical: 10 },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: "#444",
  },
  submitBtn: {
    backgroundColor: "#6846bd",
    padding: 14,
    marginVertical: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ApartmentData;
