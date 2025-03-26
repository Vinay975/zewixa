import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import Icons

const Apartment = () => {
  const [formData, setFormData] = useState({
    photos: Array(6).fill(null),
    rent: { "1BHK": "", "2BHK": "", "3BHK": "", "4BHK": "" },
    advancePayment: "",
    wifiAvailable: "",
    security: {
      cctv: false,
      securityGuards: false,
      gatedCommunity: false,
      fireSafety: false,
    },
  });

  // Handle Image Upload
  const handleFileChange = (index) => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (!response.didCancel && response.assets) {
        const files = [...formData.photos];
        files[index] = response.assets[0].uri;
        setFormData((prevData) => ({ ...prevData, photos: files }));
      }
    });
  };

  // Handle Input Change
  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Upload Photos */}
      <Text style={styles.label}>Upload Photos</Text>
      <View style={styles.photoGrid}>
        {[
          { label: "Building", icon: "apartment" },
          { label: "Living Room", icon: "weekend" },
          { label: "Kitchen", icon: "kitchen" },
          { label: "Bedroom", icon: "king-bed" },
          { label: "Bathroom", icon: "bathtub" },
          { label: "Balcony", icon: "balcony" },
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.photoUpload} onPress={() => handleFileChange(index)}>
            {formData.photos[index] ? (
              <Image source={{ uri: formData.photos[index] }} style={styles.image} />
            ) : (
              <>
                <Icon name={item.icon} size={40} color="#777" />
                <Text style={styles.photoLabel}>{item.label}</Text>
              </>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Rent Details */}
      <Text style={styles.sectionTitle}>Rent Details</Text>
      {["1BHK", "2BHK", "3BHK", "4BHK"].map((type) => (
        <View key={type} style={styles.inputRow}>
          <Text style={styles.label}>{type} Rent (₹):</Text>
          <TextInput
            style={styles.input}
            placeholder={`Enter ${type} Rent`}
            keyboardType="numeric"
            onChangeText={(text) =>
              setFormData((prevData) => ({
                ...prevData,
                rent: { ...prevData.rent, [type]: text },
              }))
            }
          />
        </View>
      ))}

      {/* Advance Payment */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Advance Payment (₹):</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Advance Amount"
          keyboardType="numeric"
          onChangeText={(text) => handleChange("advancePayment", text)}
        />
      </View>

      {/* Wi-Fi Availability */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Wi-Fi Availability:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Wi-Fi Details"
          onChangeText={(text) => handleChange("wifiAvailable", text)}
        />
      </View>

      {/* Security Information */}
      <Text style={styles.sectionTitle}>Security Features</Text>
      {[
        { key: "cctv", label: "CCTV Cameras" },
        { key: "securityGuards", label: "Security Guards" },
        { key: "gatedCommunity", label: "Gated Community" },
        { key: "fireSafety", label: "Fire Safety Equipment" },
      ].map((security) => (
        <TouchableOpacity
          key={security.key}
          style={[styles.checkbox, formData.security[security.key] && styles.checkboxSelected]}
          onPress={() =>
            setFormData((prevData) => ({
              ...prevData,
              security: {
                ...prevData.security,
                [security.key]: !prevData.security[security.key],
              },
            }))
          }
        >
          <Text style={styles.checkboxText}>
            {formData.security[security.key] ? "✔" : "○"} {security.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  photoUpload: {
    width: "30%",
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  photoLabel: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  checkbox: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  checkboxSelected: {
    backgroundColor: "#6846bd",
  },
  checkboxText: {
    fontSize: 14,
    color: "#000",
  },
});

export default Apartment;
