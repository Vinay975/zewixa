import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Linking,
  Alert,
  Dimensions,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { API_CONFIG } from "../config/api";

const { width } = Dimensions.get("window");

export default function ApartmentDetails({ route }) {
  const { apartment } = route.params;
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openImageModal = (uri) => {
    setSelectedImage(uri);
    setImageModalVisible(true);
  };

  const closeImageModal = () => {
    setImageModalVisible(false);
    setSelectedImage(null);
  };

  const handleCall = () => {
    const phone = apartment.ownerData?.mobile1 || apartment.ownerData?.mobile2;
    if (phone) {
      Linking.openURL(`tel:${phone}`);
    } else {
      Alert.alert(
        "Contact Unavailable",
        "No phone number available for this owner."
      );
    }
  };

  const handleBook = () => {
    Alert.alert("Booking", "Booking functionality to be implemented.");
  };

  //   const getPhoto = (key) => {
  //     const uri = apartment.photos?.[key];
  //     return uri
  //       ? `${API_CONFIG.BASE_URL}${uri.startsWith("/") ? "" : "/"}${uri}`
  //       : null;
  //   };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Owner Info */}
      <Animatable.View
        animation="fadeInDown"
        duration={800}
        style={styles.profileCard}
      >
        <Image
          source={{
            uri:
              apartment.ownerData?.profileImage ||
              "https://via.placeholder.com/90",
          }}
          style={styles.ownerImage}
        />
        <View style={styles.ownerInfo}>
          <Text style={styles.ownerName}>
            {apartment.ownerData?.name || "Owner Name"}
          </Text>
          {apartment.ownerData?.mobile1 && (
            <Text style={styles.ownerPhone}>
              <Ionicons name="call-outline" size={16} />{" "}
              {apartment.ownerData.mobile1}
            </Text>
          )}
          {apartment.ownerData?.mobile2 && (
            <Text style={styles.ownerPhone}>
              <Ionicons name="call-outline" size={16} />{" "}
              {apartment.ownerData.mobile2}
            </Text>
          )}
          <Text style={styles.ownerLocation}>
            <Ionicons name="location-outline" size={16} />{" "}
            {apartment.location || "Location not available"}
          </Text>
          <Text style={styles.ownerEmail}>
            <Ionicons name="mail-outline" size={16} />{" "}
            {apartment.ownerData?.email || "Email not available"}
          </Text>
        </View>
      </Animatable.View>

      {/* Amenities & Security */}
      <Animatable.View
        animation="fadeInUp"
        duration={900}
        style={styles.infoCard}
      >
        <Text style={styles.sectionTitle}> Amenities & Security</Text>
        {[
          {
            label: "WiFi",
            value:
              apartment.wifiAvailable === "yes" ? "Available" : "Not Available",
            icon: <MaterialIcons name="wifi" size={20} color="#6846bd" />,
          },
          {
            label: "Electricity Included",
            value: apartment.isElectricityIncluded === "yes" ? "Yes" : "No",
            icon: <Ionicons name="flash-outline" size={20} color="#6846bd" />,
          },
          {
            label: "CCTV",
            value: apartment.security?.cctv ? "Yes" : "No",
            icon: <Ionicons name="videocam" size={20} color="#6846bd" />,
          },
          {
            label: "Security Guards",
            value: apartment.security?.securityGuards ? "Yes" : "No",
            icon: (
              <MaterialCommunityIcons
                name="security"
                size={20}
                color="#6846bd"
              />
            ),
          },
          {
            label: "Gated Community",
            value: apartment.security?.gatedCommunity ? "Yes" : "No",
            icon: <Ionicons name="home" size={20} color="#6846bd" />,
          },
          {
            label: "Fire Safety",
            value: apartment.security?.fireSafety ? "Yes" : "No",
            icon: (
              <MaterialCommunityIcons name="fire" size={20} color="#6846bd" />
            ),
          },
        ].map((row, idx) => (
          <View style={styles.infoRow} key={idx}>
            <View style={styles.infoLeft}>
              {row.icon}
              <Text style={styles.infoLabel}>{row.label}</Text>
            </View>
            <Text style={styles.infoValue}>{row.value}</Text>
          </View>
        ))}
      </Animatable.View>

      <Animatable.View
        animation="fadeInUp"
        duration={900}
        style={styles.rentCard}
      >
        <Text style={styles.sectionTitle}>💰 Rent Details</Text>
        <View style={styles.rentTable}>
          {/* Table Header */}
          <View style={[styles.rentRow, styles.rentHeader]}>
            <Text style={[styles.rentText, styles.rentHeaderText]}>Type</Text>
            <Text style={[styles.rentText, styles.rentHeaderText]}>Rent</Text>
            <Text style={[styles.rentText, styles.rentHeaderText]}>
              Advance
            </Text>
            <Text style={[styles.rentText, styles.rentHeaderText]}>
              Maintenance
            </Text>
          </View>
          {/* Table Rows */}
          {(apartment.bhkUnits || []).map((unit, idx) => (
            <View key={idx} style={styles.rentRow}>
              <Ionicons name="home-outline" size={18} color="#6846bd" />
              <Text style={styles.rentText}>{unit.apartmentType}</Text>
              <Text style={styles.rentText}>₹{unit.monthlyRent}</Text>
              <Text style={styles.rentText}>₹{unit.securityDeposit}</Text>
              <Text style={styles.rentText}>₹{unit.maintenanceCharges}</Text>
            </View>
          ))}
        </View>
      </Animatable.View>

      {/* Apartment Gallery */}
      <Text style={styles.sectionTitle}>Apartment Gallery</Text>
      <View style={styles.galleryGrid}>
        {Object.entries(apartment.photos || {}).map(([key, uri]) => {
          if (!uri || key === "_id" || key === "profileImage") return null;
          return (
            <TouchableOpacity
              key={key}
              onPress={() => openImageModal(uri)}
              style={styles.imageWrapper}
            >
              <Image source={{ uri: uri }} style={styles.gridPhoto} />
              <Text style={styles.photoLabel}>
                {key.replace(/([A-Z])/g, " $1")}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Contact & Book */}
      <Animatable.View
        animation="fadeInUp"
        duration={1000}
        style={styles.contactSection}
      >
        <TouchableOpacity style={styles.actionBtn} onPress={handleCall}>
          <Ionicons name="call" size={20} color="#fff" />
          <Text style={styles.btnText}>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={handleBook}>
          <Ionicons name="calendar-outline" size={20} color="#fff" />
          <Text style={styles.btnText}>Book Now</Text>
        </TouchableOpacity>
      </Animatable.View>

      {/* Image Modal */}
      <Modal
        visible={imageModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeImageModal}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalClose} onPress={closeImageModal}>
            <Ionicons name="close-circle" size={40} color="white" />
          </TouchableOpacity>
          <Image source={{ uri: selectedImage }} style={styles.modalImage} />
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fdfdfd" },

  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 3,
  },
  ownerImage: { width: 90, height: 90, borderRadius: 45, marginRight: 16 },
  ownerInfo: { flex: 1 },
  ownerName: { fontSize: 18, fontWeight: "700", marginBottom: 4 },
  ownerPhone: { fontSize: 14, marginBottom: 2, color: "#555" },
  ownerLocation: { fontSize: 14, marginBottom: 2, color: "#555" },
  ownerEmail: { fontSize: 14, color: "#555" },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    color: "#333",
  },

  galleryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  imageWrapper: { width: "48%", marginBottom: 12 },
  gridPhoto: { width: "100%", height: width / 2 - 32, borderRadius: 10 },
  photoLabel: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
    color: "#444",
  },

  rentCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    elevation: 3,
  },
  rentTable: {},
  rentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  rentText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    flex: 1,
    textAlign: "center",
  },
  rentHeader: { backgroundColor: "#f2f2f2" },
  rentHeaderText: { fontWeight: "700" },

  infoCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  infoLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  infoLabel: { fontSize: 15, fontWeight: "600" },
  infoValue: { fontSize: 15, color: "#444" },

  contactSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 30,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6846bd",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  btnText: { color: "#fff", fontSize: 16, marginLeft: 8, fontWeight: "600" },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.9)",
  },
  modalClose: { position: "absolute", top: 20, right: 20 },
  modalImage: { width: "90%", height: "80%", resizeMode: "contain" },
});
