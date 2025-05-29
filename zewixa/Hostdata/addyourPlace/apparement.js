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
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/MaterialIcons";

const Apartment = () => {
  const [formData, setFormData] = useState({
    photos: Array(6).fill(null), // each item: null or {uri}
    rent: { "1BHK": "", "2BHK": "", "3BHK": "", "4BHK": "" },
    advancePayment: "",
    wifiAvailable: false,  // boolean now
    security: {
      cctv: false,
      securityGuards: false,
      gatedCommunity: false,
      fireSafety: false,
    },
  });

  const photoItems = [
    { label: "Building", icon: "apartment" },
    { label: "Living Room", icon: "weekend" },
    { label: "Kitchen", icon: "kitchen" },
    { label: "Bedroom", icon: "king-bed" },
    { label: "Bathroom", icon: "bathtub" },
    { label: "Balcony", icon: "balcony" },
  ];

  const pickImage = async (index) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Please allow gallery access to select images.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0].uri) {
      const uri = result.assets[0].uri;
      setFormData((prev) => {
        const updatedPhotos = [...prev.photos];
        updatedPhotos[index] = { uri };
        return { ...prev, photos: updatedPhotos };
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* PHOTO SELECTION */}
      <Text style={styles.label}>Upload Photos</Text>
      <View style={styles.photoGrid}>
        {photoItems.map((item, index) => {
          const photo = formData.photos[index];
          return (
            <TouchableOpacity
              key={index}
              style={styles.photoUpload}
              onPress={() => pickImage(index)}
            >
              {photo ? (
                <>
                  <Image source={{ uri: photo.uri }} style={styles.image} />
                  <Text style={styles.photoLabel}>{item.label}</Text>
                </>
              ) : (
                <>
                  <Icon name={item.icon} size={40} color="#6846bd" />
                  <Text style={styles.photoLabel}>{item.label}</Text>
                </>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* RENT DETAILS */}
      <Text style={styles.sectionTitle}>Rent Details</Text>
      {["1BHK", "2BHK", "3BHK", "4BHK"].map((type) => {
        const val = formData.rent[type];
        const showNotAvailable = val === "" || val === "0";
        return (
          <View key={type} style={styles.inputRow}>
            <Text style={styles.label}>{type} Rent (₹):</Text>
            <View style={{ flex: 1 }}>
              <TextInput
                style={[styles.input, { marginLeft: 10 }]}
                placeholder={`Enter ${type} Rent`}
                keyboardType="numeric"
                value={val}
                onChangeText={(text) =>
                  setFormData((prev) => ({
                    ...prev,
                    rent: { ...prev.rent, [type]: text.replace(/[^0-9]/g, "") },
                  }))
                }
              />
              {showNotAvailable && (
                <Text style={styles.notAvailableText}>Not Available</Text>
              )}
            </View>
          </View>
        );
      })}

      <View style={styles.inputRow}>
        <Text style={styles.label}>Advance Payment (₹):</Text>
        <TextInput
          style={styles.input}
          placeholder="Advance Amount"
          keyboardType="numeric"
          value={formData.advancePayment}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, advancePayment: text.replace(/[^0-9]/g, "") }))
          }
        />
      </View>

      {/* WIFI AVAILABILITY TOGGLE */}
      <Text style={styles.sectionTitle}>Wi-Fi Availability</Text>
      <TouchableOpacity
        style={[
          styles.checkbox,
          formData.wifiAvailable && styles.checkboxSelected,
          { marginBottom: 15 },
        ]}
        onPress={() =>
          setFormData((prev) => ({ ...prev, wifiAvailable: !prev.wifiAvailable }))
        }
      >
        <Text style={styles.checkboxText}>
          {formData.wifiAvailable ? "✔" : "○"} Wi-Fi Available
        </Text>
      </TouchableOpacity>

      {/* SECURITY CHECKBOXES */}
      <Text style={styles.sectionTitle}>Security Features</Text>
      {[
        { key: "cctv", label: "CCTV Cameras" },
        { key: "securityGuards", label: "Security Guards" },
        { key: "gatedCommunity", label: "Gated Community" },
        { key: "fireSafety", label: "Fire Safety Equipment" },
      ].map((item) => (
        <TouchableOpacity
          key={item.key}
          style={[styles.checkbox, formData.security[item.key] && styles.checkboxSelected]}
          onPress={() =>
            setFormData((prev) => ({
              ...prev,
              security: { ...prev.security, [item.key]: !prev.security[item.key] },
            }))
          }
        >
          <Text style={styles.checkboxText}>
            {formData.security[item.key] ? "✔" : "○"} {item.label}
          </Text>
        </TouchableOpacity>
      ))}

      {/* SUBMIT BUTTON */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 5 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 20, marginBottom: 10 },
  inputRow: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  photoGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  photoUpload: {
    width: "30%",
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  image: { width: "100%", height: "100%", borderRadius: 10 },
  photoLabel: { fontSize: 12, marginTop: 5, textAlign: "center", color: "#333" },
  notAvailableText: { color: "red", fontSize: 12, marginTop: 3 },
  checkbox: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  checkboxSelected: { backgroundColor: "#6846bd" },
  checkboxText: { fontSize: 14, color: "#000" },
  buttonContainer: { alignItems: "center", marginTop: 20 },
  button: {
    width: 120,
    paddingVertical: 12,
    backgroundColor: "#6846bd",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: { fontSize: 18, color: "white" },
});

export default Apartment;
