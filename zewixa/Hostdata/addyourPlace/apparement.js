// 🟣 Imports
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
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const ApartmentData = () => {
  const API_URL = "https://zewixa-jz2h.onrender.com/api/create-apartment";
  const navigation = useNavigation();
  const { ownerData } = useRoute().params || {};
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // 🟣 Pick Image
  const pickImage = async (photoType) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Allow gallery access.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setFormData((prev) => ({
        ...prev,
        photos: { ...prev.photos, [photoType]: result.assets[0].uri },
      }));
    }
  };

  // 🟣 Toggle Security
  const toggleSecurity = (field) => {
    setFormData((prev) => ({
      ...prev,
      security: { ...prev.security, [field]: !prev.security[field] },
    }));
  };

  // 🟣 Add BHK Unit
  const addBhkUnit = () => {
    setFormData((prev) => ({
      ...prev,
      bhkUnits: [
        ...prev.bhkUnits,
        {
          apartmentType: "1BHK",
          monthlyRent: "",
          securityDeposit: "",
          maintenanceCharges: "",
        },
      ],
    }));
  };

  // 🟣 Update BHK Unit
  const updateBhkUnit = (index, field, value) => {
    const updatedUnits = [...formData.bhkUnits];
    updatedUnits[index][field] = value;
    setFormData((prev) => ({ ...prev, bhkUnits: updatedUnits }));
  };

  const handleSubmit = async () => {
  try {
    setIsSubmitting(true); // ✅ Start loading

    const formDataToSend = new FormData();

    // ✅ Owner Data
    formDataToSend.append(
      "ownerData",
      JSON.stringify({
        name: formData.ownerName,
        email: formData.ownerEmail,
        phoneOne: formData.ownerPhoneOne,
        phoneTwo: formData.ownerPhoneTwo,
      })
    );

    // ✅ Apartment Data
    formDataToSend.append(
      "apartmentData",
      JSON.stringify({
        apartmentName: formData.apartmentName,
        location: formData.location,
      })
    );

    // ✅ BHK Units
    formDataToSend.append(
      "bhkUnits",
      JSON.stringify(
        formData.bhkUnits.map((unit) => ({
          type: unit.apartmentType, 
          rent: unit.monthlyRent,
          deposit: unit.securityDeposit,
          maintenance: unit.maintenanceCharges,
        }))
      )
    );

    // ✅ Security
    formDataToSend.append(
      "security",
      JSON.stringify({
        cctv: formData.cctv,
        securityGuards: formData.securityGuards,
        gatedCommunity: formData.gatedCommunity,
        fireSafety: formData.fireSafety,
      })
    );

    // ✅ Wifi & Electricity
    formDataToSend.append("wifiAvailable", formData.wifiAvailable);
    formDataToSend.append("electricityIncluded", formData.electricityIncluded);

    // ✅ Photos
    const photoFields = [
      "building",
      "livingRoom",
      "kitchen",
      "bedroom",
      "bathroom",
      "balcony",
      "ownerImage",
    ];

    photoFields.forEach((field) => {
      if (formData[field]) {
        formDataToSend.append(field, {
          uri: formData[field].uri,
          type: formData[field].type || "image/jpeg",
          name: formData[field].fileName || `${field}.jpg`,
        });
      }
    });

    // ✅ Submit request
    const response = await fetch("http://<YOUR_SERVER_IP>:5000/api/create-apartment", {
      method: "POST",
      body: formDataToSend,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ Submit Error:", errorData);
      alert("Submit failed: " + JSON.stringify(errorData));
      return;
    }

    const data = await response.text();
    console.log("✅ Apartment Created:", data);
    alert("Apartment created successfully!");
  } catch (error) {
    console.error("❌ Submit Exception:", error);
    alert("Something went wrong. Check console.");
  } finally {
    setIsSubmitting(false); 
  }
};


  const getIcon = (type) =>
  ({
    building: "business-outline",
    livingRoom: "tv-outline",
    kitchen: "restaurant-outline",
    bedroom: "bed-outline",
    bathroom: "water-outline",
    balcony: "sunny-outline",
  }[type] || "image-outline");

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Upload Apartment Photos</Text>

      {Object.keys(formData.photos).reduce((rows, key, index, array) => {
        if (index % 2 === 0) rows.push(array.slice(index, index + 2));
        return rows;
      }, []).map((row, rowIndex) => (
        <View key={rowIndex} style={styles.photoRow}>
          {row.map((photoType) => (
            <TouchableOpacity key={photoType} style={styles.photoUpload} onPress={() => pickImage(photoType)}>
              <Ionicons name={getIcon(photoType)} size={32} color="#6846bd" />
              <Text style={styles.photoLabel}>{photoType.charAt(0).toUpperCase() + photoType.slice(1)}</Text>
              {formData.photos[photoType] && (
                <Image source={{ uri: formData.photos[photoType] }} style={styles.previewImage} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <Text style={styles.sectionTitle}>Apartment Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={formData.location}
        onChangeText={(v) => setFormData((p) => ({ ...p, location: v }))}
      />

      <Text style={styles.sectionTitle}>Add BHK Units</Text>
      {formData.bhkUnits.map((unit, index) => (
        <View key={index} style={styles.card}>
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

          <TextInput
            style={styles.input}
            placeholder="Monthly Rent"
            keyboardType="numeric"
            value={unit.monthlyRent}
            onChangeText={(v) => updateBhkUnit(index, "monthlyRent", v)}
          />
          <TextInput
            style={styles.input}
            placeholder="Security Deposit"
            keyboardType="numeric"
            value={unit.securityDeposit}
            onChangeText={(v) => updateBhkUnit(index, "securityDeposit", v)}
          />
          <TextInput
            style={styles.input}
            placeholder="Maintenance Charges"
            keyboardType="numeric"
            value={unit.maintenanceCharges}
            onChangeText={(v) => updateBhkUnit(index, "maintenanceCharges", v)}
          />
        </View>
      ))}

      <TouchableOpacity style={styles.addBtn} onPress={addBhkUnit}>
        <Ionicons name="add-circle-outline" size={20} color="#6846bd" />
        <Text style={styles.addText}>Add Another BHK</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>WiFi</Text>
      <Picker
        selectedValue={formData.wifiAvailable}
        onValueChange={(v) => setFormData((p) => ({ ...p, wifiAvailable: v }))}
        style={styles.picker}
      >
        <Picker.Item label="Yes" value="yes" />
        <Picker.Item label="No" value="no" />
      </Picker>

      <Text style={styles.sectionTitle}>Electricity Included</Text>
      <Picker
        selectedValue={formData.isElectricityIncluded}
        onValueChange={(v) => setFormData((p) => ({ ...p, isElectricityIncluded: v }))}
        style={styles.picker}
      >
        <Picker.Item label="Yes" value="yes" />
        <Picker.Item label="No" value="no" />
      </Picker>

      <Text style={styles.sectionTitle}>Security Features</Text>
      {Object.keys(formData.security).map((key) => (
        <TouchableOpacity key={key} style={styles.checkboxContainer} onPress={() => toggleSecurity(key)}>
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

      <TouchableOpacity
        style={[styles.submitBtn, isSubmitting && { backgroundColor: "#aaa" }]}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        <Text style={styles.submitText}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: "#fff" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 12, color: "#333" },
  photoRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
  photoUpload: {
    width: "48%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f2f2f2",
  },
  photoLabel: { marginTop: 6, fontSize: 13, textAlign: "center", fontWeight: "500", color: "#444" },
  previewImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginTop: 8,
    resizeMode: "cover",
  },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 10, borderRadius: 5, fontSize: 14 },
  picker: { marginBottom: 12 },
  card: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  checkboxContainer: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  checkboxLabel: { marginLeft: 8, fontSize: 14, color: "#444" },
  addBtn: { flexDirection: "row", alignItems: "center", marginVertical: 10 },
  addText: { marginLeft: 6, color: "#6846bd", fontSize: 15, fontWeight: "500" },
  submitBtn: {
    backgroundColor: "#6846bd",
    padding: 14,
    marginVertical: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

export default ApartmentData;
