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
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";
import { API_CONFIG } from '../../config/api';

const HostelDataTwo = () => {
  const API_URL = `${API_CONFIG.BASE_URL}/api/create-hostel`;
  const navigation = useNavigation();
  const { hostelData } = useRoute().params || {};
  const { ownerData } = hostelData || {};

  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const pickImage = (photoType) => {
    Alert.alert('Upload Photo', 'Choose an option', [
      { text: 'Take Photo', onPress: () => handleImage('camera', photoType) },
      { text: 'Choose from Gallery', onPress: () => handleImage('gallery', photoType) },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleImage = async (source, photoType) => {
    const options = { mediaType: 'photo', quality: 1 };
    const result = source === 'camera' ? await launchCamera(options) : await launchImageLibrary(options);

    if (result.didCancel || !result.assets?.length) return;

    setFormData((prev) => ({
      ...prev,
      photos: { ...prev.photos, [photoType]: result.assets[0].uri },
    }));
  };

  const handleRentChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      rent: { ...prev.rent, [field]: value },
    }));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const missing = Object.keys(formData.photos).filter((k) => !formData.photos[k]);
    if (missing.length) {
      Alert.alert("Missing Images", `Please upload: ${missing.join(", ")}`);
      setIsSubmitting(false);
      return;
    }

    const fd = new FormData();
    fd.append("ownerData", JSON.stringify(ownerData));
    fd.append("hostelData", JSON.stringify(hostelData));
    fd.append("wifi", formData.wifi);
    fd.append("rent", JSON.stringify(formData.rent));

    if (ownerData.profileImage) {
      const uriParts = ownerData.profileImage.split("/");
      const name = uriParts[uriParts.length - 1];
      const type = `image/${name.split(".").pop()}`;
      fd.append("ownerImage", { uri: ownerData.profileImage, name, type });
    }

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
    } finally {
      setIsSubmitting(false);
    }
  };

  const photoTypes = [
    { key: "main", label: "Main Photo", icon: "home" },
    { key: "messRoom", label: "Mess Room", icon: "restaurant" },
    { key: "topView", label: "Top View", icon: "images" },
    { key: "washroom", label: "Washroom", icon: "water" },
    { key: "roomInterior", label: "Room", icon: "bed" },
    { key: "commonArea", label: "Common Area", icon: "people" },
    { key: "balconyView", label: "Balcony", icon: "sunny" },
    { key: "laundryArea", label: "Laundry", icon: "shirt" },
    { key: "messMenu", label: "Menu", icon: "fast-food" },
  ];

  const rentOptions = [
    { key: "OneSharing", label: "1 Sharing", icon: "person" },
    { key: "TwoSharing", label: "2 Sharing", icon: "people" },
    { key: "ThreeSharing", label: "3 Sharing", icon: "people" },
    { key: "FourSharing", label: "4 Sharing", icon: "people" },
    { key: "FiveSharing", label: "5 Sharing", icon: "people" },
    { key: "Advance", label: "Advance", icon: "cash" },
  ];

  const uploadedCount = Object.values(formData.photos).filter(Boolean).length;

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <StatusBar backgroundColor="#F8F9FA" barStyle="dark-content" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Photos & Pricing</Text>
          <Text style={styles.subtitle}>Step 2 of 2</Text>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressInfo}>
            <Ionicons name="images" size={18} color="#6846bd" />
            <Text style={styles.progressText}>Photos Uploaded</Text>
          </View>
          <Text style={styles.progressCount}>{uploadedCount}/9</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconCircle}>
              <Ionicons name="camera" size={18} color="#6846bd" />
            </View>
            <Text style={styles.cardTitle}>Hostel Photos</Text>
          </View>
          <View style={styles.photoGrid}>
            {photoTypes.map((photo) => (
              <TouchableOpacity key={photo.key} style={styles.photoBox} onPress={() => pickImage(photo.key)}>
                {formData.photos[photo.key] ? (
                  <>
                    <Image source={{ uri: formData.photos[photo.key] }} style={styles.photoImage} />
                    <View style={styles.photoCheck}>
                      <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                    </View>
                    <View style={styles.photoLabel}>
                      <Text style={styles.photoLabelText}>{photo.label}</Text>
                    </View>
                  </>
                ) : (
                  <View style={styles.photoEmpty}>
                    <View style={styles.photoIconBox}>
                      <Ionicons name={photo.icon} size={20} color="#9CA3AF" />
                    </View>
                    <Text style={styles.photoText}>{photo.label}</Text>
                    <View style={styles.uploadBadge}>
                      <Ionicons name="cloud-upload" size={12} color="#6846bd" />
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconCircle}>
              <Ionicons name="wifi" size={18} color="#6846bd" />
            </View>
            <Text style={styles.cardTitle}>WiFi Availability</Text>
          </View>
          <View style={styles.wifiRow}>
            <TouchableOpacity
              style={[styles.wifiBtn, formData.wifi === "yes" && styles.wifiBtnActive]}
              onPress={() => setFormData((p) => ({ ...p, wifi: "yes" }))}
            >
              <View style={[styles.wifiIcon, formData.wifi === "yes" && styles.wifiIconActive]}>
                <Ionicons name="wifi" size={18} color={formData.wifi === "yes" ? "#fff" : "#10B981"} />
              </View>
              <Text style={[styles.wifiText, formData.wifi === "yes" && styles.wifiTextActive]}>Available</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.wifiBtn, formData.wifi === "no" && styles.wifiBtnActive]}
              onPress={() => setFormData((p) => ({ ...p, wifi: "no" }))}
            >
              <View style={[styles.wifiIcon, formData.wifi === "no" && styles.wifiIconActive]}>
                <Ionicons name="close-circle" size={18} color={formData.wifi === "no" ? "#fff" : "#EF4444"} />
              </View>
              <Text style={[styles.wifiText, formData.wifi === "no" && styles.wifiTextActive]}>Not Available</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconCircle}>
              <Ionicons name="pricetag" size={18} color="#6846bd" />
            </View>
            <Text style={styles.cardTitle}>Rent Details</Text>
          </View>
          
          {rentOptions.map((item) => (
            <View key={item.key} style={styles.rentRow}>
              <View style={styles.rentLeft}>
                <View style={styles.rentIconBox}>
                  <Ionicons name={item.icon} size={16} color="#6846bd" />
                </View>
                <Text style={styles.rentLabel}>{item.label}</Text>
              </View>
              <View style={styles.rentInputBox}>
                <Text style={styles.rupeeSymbol}>₹</Text>
                <TextInput
                  style={styles.rentInput}
                  placeholder="0"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  value={formData.rent[item.key]}
                  onChangeText={(v) => handleRentChange(item.key, v)}
                />
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Text style={styles.submitButtonText}>Submitting...</Text>
          ) : (
            <>
              <Text style={styles.submitButtonText}>Submit Hostel</Text>
              <Ionicons name="checkmark-circle" size={18} color="#fff" />
            </>
          )}
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
    paddingBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2D3436",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: "#9CA3AF",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  progressCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E8E3F3",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 14,
    borderRadius: 12,
  },
  progressInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2D3436",
  },
  progressCount: {
    fontSize: 18,
    fontWeight: "700",
    color: "#6846bd",
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E8E3F3",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2D3436",
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
    position: "relative",
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
    padding: 8,
  },
  photoIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  photoText: {
    fontSize: 9,
    color: "#636E72",
    fontWeight: "600",
    textAlign: "center",
  },
  photoCheck: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  photoLabel: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 4,
  },
  photoLabelText: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  uploadBadge: {
    position: "absolute",
    bottom: 6,
    right: 6,
    backgroundColor: "#E8E3F3",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  wifiRow: {
    flexDirection: "row",
    gap: 12,
  },
  wifiBtn: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  wifiBtnActive: {
    backgroundColor: "#6846bd",
    borderColor: "#6846bd",
  },
  wifiIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#D1FAE5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  wifiIconActive: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  wifiText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#636E72",
  },
  wifiTextActive: {
    color: "#fff",
  },
  rentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  rentLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  rentIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E8E3F3",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  rentLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2D3436",
  },
  rentInputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    minWidth: 90,
  },
  rupeeSymbol: {
    fontSize: 14,
    fontWeight: "700",
    color: "#636E72",
    marginRight: 4,
  },
  rentInput: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2D3436",
    textAlign: "right",
    flex: 1,
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6846bd",
    // marginHorizontal: 16,
    marginVertical: 24,
    marginBottom:50,
    margin:30,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
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
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
  },
});

export default HostelDataTwo;
