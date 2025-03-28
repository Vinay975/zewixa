import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from "react-native";
import { launchCamera } from "react-native-image-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const Apartment = () => {
  const navigation = useNavigation();
  
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

  // Open Camera and Capture Image
  const handleTakePhoto = (index) => {
    launchCamera({ mediaType: "photo", quality: 1, cameraType: "back" }, (response) => {
      if (response.didCancel) return; // User cancelled the camera

      if (response.errorCode) {
        Alert.alert("Error", "Camera access denied or error occurred");
        return;
      }

      if (response.assets && response.assets.length > 0) {
        const newImage = response.assets[0].uri;
        const updatedPhotos = [...formData.photos];
        updatedPhotos[index] = newImage;

        setFormData((prevData) => ({ ...prevData, photos: updatedPhotos }));
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Upload Photos */}
      <Text style={styles.label}>Take Photos</Text>
      <View style={styles.photoGrid}>
        {[
          { label: "Building", icon: "apartment" },
          { label: "Living Room", icon: "weekend" },
          { label: "Kitchen", icon: "kitchen" },
          { label: "Bedroom", icon: "king-bed" },
          { label: "Bathroom", icon: "bathtub" },
          { label: "Balcony", icon: "balcony" },
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.photoUpload} onPress={() => handleTakePhoto(index)}>
            {formData.photos[index] ? (
              <Image source={{ uri: formData.photos[index] }} style={styles.image} />
            ) : (
              <>
                <Icon name={item.icon} size={40} color="#6846bd" />
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
            placeholder={`Enter ${type} Rent (₹) / 0 = Not Available`}
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
          onChangeText={(text) => setFormData({ ...formData, advancePayment: text })}
        />
      </View>

      {/* Wi-Fi Availability */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Wi-Fi Availability:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Wi-Fi Details"
          onChangeText={(text) => setFormData({ ...formData, wifiAvailable: text })}
        />
      </View>

      {/* Security Features */}
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

      {/* Submit Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("FinalSubmit")}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
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
  button: {
    width: 120, 
    paddingVertical: 12,
    backgroundColor: "#6846bd",
    borderRadius: 5,
    alignItems: "center",
    margin: 20,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});

export default Apartment;