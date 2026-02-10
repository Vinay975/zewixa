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
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Picker } from "@react-native-picker/picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { API_CONFIG } from '../../config/api';

const ApartmentData = () => {
  const API_URL = `${API_CONFIG.BASE_URL}/api/create-apartment`;
  const navigation = useNavigation();
  const { ownerData } = useRoute().params || {};

  const [formData, setFormData] = useState({
    photos: {
      building: null,
      livingRoom: null,
      kitchen: null,
      bedroom: null,
      bathroom: null,
      balcony: null,
    },
    bhkUnits: [],
    wifiAvailable: "yes",
    isElectricityIncluded: "no",
    location: "",
    security: {
      cctv: false,
      securityGuards: false,
      gatedCommunity: false,
      fireSafety: false,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const pickImage = (photoType) => {
    Alert.alert("Upload Photo", "Choose an option", [
      { text: "Take Photo", onPress: () => handleImage("camera", photoType) },
      { text: "Choose from Gallery", onPress: () => handleImage("gallery", photoType) },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleImage = async (source, photoType) => {
    const options = { mediaType: "photo", quality: 1 };
    const response = source === "camera" ? await launchCamera(options) : await launchImageLibrary(options);

    if (response?.assets && response.assets.length > 0) {
      setFormData((prev) => ({
        ...prev,
        photos: { ...prev.photos, [photoType]: response.assets[0].uri },
      }));
    }
  };

  const toggleSecurity = (field) => {
    setFormData((prev) => ({
      ...prev,
      security: { ...prev.security, [field]: !prev.security[field] },
    }));
  };

  const addBhkUnit = () => {
    setFormData((prev) => ({
      ...prev,
      bhkUnits: [
        ...prev.bhkUnits,
        { apartmentType: "1BHK", monthlyRent: "", securityDeposit: "", maintenanceCharges: "" },
      ],
    }));
  };

  const updateBhkUnit = (index, field, value) => {
    const updatedUnits = [...formData.bhkUnits];
    updatedUnits[index][field] = value;
    setFormData((prev) => ({ ...prev, bhkUnits: updatedUnits }));
  };

  const handleSubmit = async () => {
    const missing = Object.keys(formData.photos).filter((k) => !formData.photos[k]);
    if (missing.length) {
      Alert.alert("Missing Images", `Please upload: ${missing.join(", ")}`);
      return;
    }

    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append("ownerData", JSON.stringify(ownerData));

    if (ownerData?.profileImage) {
      const uri = ownerData.profileImage;
      const name = uri.split("/").pop();
      const type = `image/${name.split(".").pop()}`;
      formDataToSend.append("ownerPhoto", { uri, name, type });
    }

    formDataToSend.append("location", formData.location);
    formDataToSend.append("wifiAvailable", formData.wifiAvailable);
    formDataToSend.append("isElectricityIncluded", formData.isElectricityIncluded);
    formDataToSend.append("security", JSON.stringify(formData.security));
    formDataToSend.append("bhkUnits", JSON.stringify(formData.bhkUnits));

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
    } finally {
      setIsSubmitting(false);
    }
  };

  const photoTypes = [
    { key: "building", label: "Building", icon: "business" },
    { key: "livingRoom", label: "Living Room", icon: "tv" },
    { key: "kitchen", label: "Kitchen", icon: "restaurant" },
    { key: "bedroom", label: "Bedroom", icon: "bed" },
    { key: "bathroom", label: "Bathroom", icon: "water" },
    { key: "balcony", label: "Balcony", icon: "sunny" },
  ];

  const securityOptions = [
    { key: "cctv", label: "CCTV", icon: "videocam" },
    { key: "securityGuards", label: "Security Guards", icon: "shield-checkmark" },
    { key: "gatedCommunity", label: "Gated Community", icon: "lock-closed" },
    { key: "fireSafety", label: "Fire Safety", icon: "flame" },
  ];

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
    
        {/* Photos */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Property Photos</Text>
          <View style={styles.photoGrid}>
            {photoTypes.map((photo) => (
              <TouchableOpacity key={photo.key} style={styles.photoBox} onPress={() => pickImage(photo.key)}>
                {formData.photos[photo.key] ? (
                  <>
                    <Image source={{ uri: formData.photos[photo.key] }} style={styles.photoImage} />
                    <View style={styles.photoOverlay}>
                      <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                    </View>
                  </>
                ) : (
                  <View style={styles.photoEmpty}>
                    <Ionicons name={photo.icon} size={28} color="#9CA3AF" />
                    <Text style={styles.photoText}>{photo.label}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Location */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Location</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="location" size={20} color="#6846bd" style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter apartment address"
              placeholderTextColor="#9CA3AF"
              value={formData.location}
              onChangeText={(v) => setFormData((p) => ({ ...p, location: v }))}
            />
          </View>
        </View>

        {/* BHK Units */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>BHK Units</Text>
          {formData.bhkUnits.map((unit, index) => (
            <View key={index} style={styles.unitBox}>
              <View style={styles.unitHeader}>
                <Ionicons name="home" size={18} color="#6846bd" />
                <Text style={styles.unitTitle}>Unit {index + 1}</Text>
              </View>
              
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={unit.apartmentType}
                  onValueChange={(v) => updateBhkUnit(index, "apartmentType", v)}
                  style={styles.picker}
                >
                  <Picker.Item label="1 BHK" value="1BHK" />
                  <Picker.Item label="2 BHK" value="2BHK" />
                  <Picker.Item label="3 BHK" value="3BHK" />
                  <Picker.Item label="4 BHK" value="4BHK" />
                </Picker>
              </View>

              <TextInput
                style={styles.unitInput}
                placeholder="Monthly Rent (₹)"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                value={unit.monthlyRent}
                onChangeText={(v) => updateBhkUnit(index, "monthlyRent", v)}
              />
              <TextInput
                style={styles.unitInput}
                placeholder="Security Deposit (₹)"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                value={unit.securityDeposit}
                onChangeText={(v) => updateBhkUnit(index, "securityDeposit", v)}
              />
              <TextInput
                style={styles.unitInput}
                placeholder="Maintenance Charges (₹)"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                value={unit.maintenanceCharges}
                onChangeText={(v) => updateBhkUnit(index, "maintenanceCharges", v)}
              />
            </View>
          ))}

          <TouchableOpacity style={styles.addButton} onPress={addBhkUnit}>
            <Ionicons name="add-circle" size={22} color="#6846bd" />
            <Text style={styles.addButtonText}>Add BHK Unit</Text>
          </TouchableOpacity>
        </View>

        {/* Amenities */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Amenities</Text>
          
          <View style={styles.amenityRow}>
            <View style={styles.amenityLeft}>
              <Ionicons name="wifi" size={20} color="#6846bd" />
              <Text style={styles.amenityLabel}>WiFi Available</Text>
            </View>
            <View style={styles.switchRow}>
              <TouchableOpacity
                style={[styles.switchBtn, formData.wifiAvailable === "yes" && styles.switchBtnActive]}
                onPress={() => setFormData((p) => ({ ...p, wifiAvailable: "yes" }))}
              >
                <Text style={[styles.switchText, formData.wifiAvailable === "yes" && styles.switchTextActive]}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.switchBtn, formData.wifiAvailable === "no" && styles.switchBtnActive]}
                onPress={() => setFormData((p) => ({ ...p, wifiAvailable: "no" }))}
              >
                <Text style={[styles.switchText, formData.wifiAvailable === "no" && styles.switchTextActive]}>No</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.amenityRow}>
            <View style={styles.amenityLeft}>
              <Ionicons name="flash" size={20} color="#6846bd" />
              <Text style={styles.amenityLabel}>Electricity Included</Text>
            </View>
            <View style={styles.switchRow}>
              <TouchableOpacity
                style={[styles.switchBtn, formData.isElectricityIncluded === "yes" && styles.switchBtnActive]}
                onPress={() => setFormData((p) => ({ ...p, isElectricityIncluded: "yes" }))}
              >
                <Text style={[styles.switchText, formData.isElectricityIncluded === "yes" && styles.switchTextActive]}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.switchBtn, formData.isElectricityIncluded === "no" && styles.switchBtnActive]}
                onPress={() => setFormData((p) => ({ ...p, isElectricityIncluded: "no" }))}
              >
                <Text style={[styles.switchText, formData.isElectricityIncluded === "no" && styles.switchTextActive]}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Security */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Security Features</Text>
          {securityOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              style={styles.checkRow}
              onPress={() => toggleSecurity(option.key)}
            >
              <Ionicons
                name={formData.security[option.key] ? "checkbox" : "square-outline"}
                size={24}
                color={formData.security[option.key] ? "#6846bd" : "#9CA3AF"}
              />
              <Ionicons name={option.icon} size={18} color="#636E72" style={styles.checkIcon} />
              <Text style={styles.checkLabel}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.submitButtonText}>{isSubmitting ? "Submitting..." : "Submit Apartment"}</Text>
          {!isSubmitting && <Ionicons name="arrow-forward" size={20} color="#fff" />}
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
  titleSection: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 8,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#2D3436",
    marginBottom: 4,
  },
  mainSubtitle: {
    fontSize: 16,
    color: "#636E72",
    fontWeight: "500",
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D3436",
    marginBottom: 16,
  },
  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  photoBox: {
    width: "31%",
    aspectRatio: 1,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#F8F9FA",
  },
  photoImage: {
    width: "100%",
    height: "100%",
  },
  photoEmpty: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  photoText: {
    fontSize: 11,
    color: "#636E72",
    fontWeight: "600",
    marginTop: 6,
    textAlign: "center",
  },
  photoOverlay: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: "#2D3436",
    fontWeight: "500",
  },
  unitBox: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  unitHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  unitTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2D3436",
    marginLeft: 8,
  },
  pickerWrapper: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 12,
    overflow: "hidden",
  },
  picker: {
    height: 50,
  },
  unitInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: "#2D3436",
    fontWeight: "500",
    marginBottom: 12,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8E3F3",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
  },
  addButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#6846bd",
    marginLeft: 8,
  },
  amenityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F8F9FA",
  },
  amenityLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  amenityLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2D3436",
    marginLeft: 12,
  },
  switchRow: {
    flexDirection: "row",
    gap: 8,
  },
  switchBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  switchBtnActive: {
    backgroundColor: "#6846bd",
    borderColor: "#6846bd",
  },
  switchText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#636E72",
  },
  switchTextActive: {
    color: "#fff",
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  checkIcon: {
    marginLeft: 12,
    marginRight: 8,
  },
  checkLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2D3436",
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6846bd",
    marginHorizontal: 100,
    marginVertical: 30,
     marginBottom: 50,
    paddingVertical: 18,
    borderRadius: 16,
    gap: 10,
    elevation: 4,
    shadowColor: "#6846bd",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  submitButtonDisabled: {
    backgroundColor: "#9CA3AF",
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.5,
  },
});

export default ApartmentData;
