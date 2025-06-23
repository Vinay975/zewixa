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

const HostelDataTwo = () => {
 const API_URL = "https://zewixa-backend.onrender.com/api/create-hostel";
  const navigation = useNavigation();
  const { hostelData } = useRoute().params || {};
  const { ownerData } = hostelData || {};

  const [formData, setFormData] = useState({
    photos: {
      main: null,
      messRoom: null,
      topView: null,
      washroom: null,
      roomInterior: null,
      commonArea: null,
      balconyView: null,
      laundryArea: null,
      messMenu: null,
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

  // Pulse animation for messMenu icon
  const pulse = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.1, duration: 800, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1,   duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, [pulse]);

  // Image picker common logic
  const pickImage = async (photoType) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Allow gallery access.");
      return;
    }
    Alert.alert("Upload Photo", "Choose an option", [
      { text: "Take Photo",          onPress: () => handleImage("camera", photoType) },
      { text: "Choose from Gallery", onPress: () => handleImage("gallery", photoType) },
      { text: "Cancel",              style: "cancel" },
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

  // Rent input handler
  const handleRentChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      rent: { ...prev.rent, [field]: value },
    }));
  };

  // Submit all data + images
  const handleSubmit = async () => {
    // validate all photos
    const missing = Object.keys(formData.photos).filter((k) => !formData.photos[k]);
    if (missing.length) {
      Alert.alert("Missing Images", `Please upload: ${missing.join(", ")}`);
      return;
    }

    const fd = new FormData();
    // JSON fields
    fd.append("ownerData", JSON.stringify(ownerData));
    fd.append("hostelData", JSON.stringify(hostelData));
    fd.append("wifi", formData.wifi);
    fd.append("rent", JSON.stringify(formData.rent));

    // append ownerImage
    if (ownerData.profileImage) {
      const uriParts = ownerData.profileImage.split("/");
      const name = uriParts[uriParts.length - 1];
      const type = `image/${name.split(".").pop()}`;
      fd.append("ownerImage", { uri: ownerData.profileImage, name, type });
    }

    // append hostel photos
    Object.entries(formData.photos).forEach(([key, uri]) => {
      const name = uri.split("/").pop();
      const type = `image/${name.split(".").pop()}`;
      fd.append(key, { uri, name, type });
    });

    try {
      const res = await axios.post(API_URL, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.status === 201) {
        Alert.alert("Success", "Hostel data saved!");
        navigation.navigate("FinalSubmit");
      }
    } catch (err) {
      console.error("Submission Error:", err);
      Alert.alert("Error", "Failed to submit hostel data.");
    }
  };

  // Icon mapping
  const getIcon = (t) =>
    ({
      main:         "home-outline",
      messRoom:     "restaurant-outline",
      topView:      "images-outline",
      washroom:     "water-outline",
      roomInterior: "bed-outline",
      commonArea:   "people-outline",
      balconyView:  "sunny-outline",
      laundryArea:  "shirt-outline",
      messMenu:     "fast-food-outline",
    }[t] || "image-outline");

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Upload Hostel Images</Text>

      {/* Standard hostel photos */}
      {[
        ["main", "messRoom"],
        ["topView", "washroom"],
        ["roomInterior", "commonArea"],
        ["balconyView", "laundryArea"],
      ].map((row, i) => (
        <View key={i} style={styles.photoRow}>
          {row.map((type) => (
            <TouchableOpacity
              key={type}
              style={styles.photoUpload}
              onPress={() => pickImage(type)}
            >
              <Ionicons name={getIcon(type)} size={36} color="#6846bd" />
              <Text style={styles.photoLabel}>{type.replace(/([A-Z])/g, " $1")}</Text>
              {formData.photos[type] && (
                <Image source={{ uri: formData.photos[type] }} style={styles.previewImage} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      ))}

      {/* Mess Menu with pulse */}
      <Text style={styles.sectionTitle}>Upload Mess Menu Photo</Text>
      <View style={styles.photoRow}>
        <TouchableOpacity style={styles.photoUpload} onPress={() => pickImage("messMenu")}>
          <Animated.View style={{ transform: [{ scale: pulse }] }}>
            <Ionicons name={getIcon("messMenu")} size={36} color="#6846bd" />
          </Animated.View>
          <Text style={styles.photoLabel}>Mess Menu</Text>
          {formData.photos.messMenu && (
            <Image source={{ uri: formData.photos.messMenu }} style={styles.previewImage} />
          )}
        </TouchableOpacity>
      </View>

      {/* WiFi */}
      <Text style={styles.sectionTitle}>WiFi</Text>
      <Picker
        selectedValue={formData.wifi}
        onValueChange={(v) => setFormData((p) => ({ ...p, wifi: v }))}
        style={styles.picker}
      >
        <Picker.Item label="Yes" value="yes" />
        <Picker.Item label="No" value="no" />
      </Picker>

      {/* Rent details */}
      <Text style={styles.sectionTitle}>Rent Details</Text>
      {[
        ["OneSharing", "TwoSharing"],
        ["ThreeSharing", "FourSharing"],
        ["FiveSharing", "Advance"],
      ].map((pair, idx) => (
        <View key={idx} style={styles.rentRow}>
          {pair.map((k) => (
            <TextInput
              key={k}
              style={styles.input}
              placeholder={`${k} Rent`}
              keyboardType="numeric"
              value={formData.rent[k]}
              onChangeText={(v) => handleRentChange(k, v)}
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
  container: { padding: 15, backgroundColor: "#fff" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 12, color: "#333" },
  photoRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
  photoUpload: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
  photoLabel: { marginTop: 6, fontSize: 12, textAlign: "center" },
  previewImage: { width: 80, height: 80, marginTop: 5, borderRadius: 8 },
  picker: { marginVertical: 10 },
  rentRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  input: { flex: 1, borderWidth: 1, borderColor: "#ccc", padding: 8, margin: 5, borderRadius: 5 },
  submitBtn: { backgroundColor: "#6846bd", padding: 12, marginVertical: 20, borderRadius: 10, alignItems: "center" },
  submitText: { color: "#fff", fontSize: 16 },
});

export default HostelDataTwo;
