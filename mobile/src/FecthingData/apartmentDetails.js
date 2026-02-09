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
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from "react-native-animatable";
import { API_CONFIG } from "../config/api";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function ApartmentDetails({ route }) {
  const { apartment } = route.params;
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();

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
     navigation.navigate("ApartmentBooking", { apartment });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Owner Info */}
      <Animatable.View
        animation="fadeInDown"
        duration={800}
        style={styles.profileCard}
      >
        <View style={styles.profileLeft}>
          <View style={styles.ownerImageContainer}>
            <Image
              source={{
                uri:
                  apartment.ownerData?.profileImage ||
                  "https://via.placeholder.com/90",
              }}
              style={styles.ownerImage}
            />
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={28} color="#10B981" />
            </View>
          </View>
          <Text style={styles.ownerName}>
            {apartment.ownerData?.name || "Owner Name"}
          </Text>
          <View style={styles.ownerRoleBadge}>
            <Ionicons name="shield-checkmark" size={14} color="#6846bd" />
            <Text style={styles.ownerRoleText}>Verified Owner</Text>
          </View>
        </View>

        <View style={styles.profileRight}>
          <View style={styles.infoItem}>
            <View style={styles.infoIconBox}>
              <Ionicons name="call" size={18} color="#6846bd" />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Phone</Text>
              {apartment.ownerData?.mobile1 && (
                <Text style={styles.infoValue}>
                  {apartment.ownerData.mobile1}
                </Text>
              )}
              {apartment.ownerData?.mobile2 && (
                <Text style={styles.infoValue}>
                  {apartment.ownerData.mobile2}
                </Text>
              )}
              {!apartment.ownerData?.mobile1 && !apartment.ownerData?.mobile2 && (
                <Text style={styles.infoValue}>Not Available</Text>
              )}
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoIconBox}>
              <Ionicons name="location" size={18} color="#6846bd" />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue} numberOfLines={2}>
                {apartment.location || "Not available"}
              </Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoIconBox}>
              <Ionicons name="mail" size={18} color="#6846bd" />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue} numberOfLines={1}>
                {apartment.ownerData?.email || "Not available"}
              </Text>
            </View>
          </View>
        </View>
      </Animatable.View>

      {/* Amenities & Security */}
      <Animatable.View
        animation="fadeInUp"
        duration={900}
        style={styles.amenitiesCard}
      >
        <View style={styles.sectionHeader}>
          <View style={styles.sectionIconContainer}>
            <Ionicons name="shield-checkmark" size={24} color="#6846bd" />
          </View>
          <Text style={styles.sectionTitle}>Amenities & Security</Text>
        </View>

        <View style={styles.amenitiesGrid}>
          {[
            {
              label: "WiFi",
              value: apartment.wifiAvailable === "yes" ? "Available" : "Not Available",
              icon: "wifi",
              available: apartment.wifiAvailable === "yes",
            },
            {
              label: "Electricity",
              value: apartment.isElectricityIncluded === "yes" ? "Included" : "Not Included",
              icon: "flash",
              available: apartment.isElectricityIncluded === "yes",
            },
            {
              label: "CCTV",
              value: apartment.security?.cctv ? "Available" : "Not Available",
              icon: "videocam",
              available: apartment.security?.cctv,
            },
            {
              label: "Security",
              value: apartment.security?.securityGuards ? "Available" : "Not Available",
              icon: "shield",
              available: apartment.security?.securityGuards,
            },
            {
              label: "Gated",
              value: apartment.security?.gatedCommunity ? "Yes" : "No",
              icon: "home",
              available: apartment.security?.gatedCommunity,
            },
            {
              label: "Fire Safety",
              value: apartment.security?.fireSafety ? "Available" : "Not Available",
              icon: "flame",
              available: apartment.security?.fireSafety,
            },
          ].map((row, idx) => (
            <View style={styles.amenityBox} key={idx}>
              <View style={styles.amenityIconCircle}>
                <Ionicons name={row.icon} size={24} color="#6846bd" />
              </View>
              <Text style={styles.amenityLabel}>{row.label}</Text>
              <Text style={[styles.amenityValue, !row.available && styles.amenityValueUnavailable]}>
                {row.value}
              </Text>
            </View>
          ))}
        </View>
      </Animatable.View>

      {/* Rent Details */}
      <Animatable.View
        animation="fadeInUp"
        duration={900}
        style={styles.rentCard}
      >
        <View style={styles.sectionHeader}>
          <View style={styles.sectionIconContainer}>
            <Ionicons name="cash" size={24} color="#6846bd" />
          </View>
          <Text style={styles.sectionTitle}>Rent Details</Text>
        </View>
        <Text style={styles.sectionSubtitle}>Monthly rent breakdown by apartment type</Text>

        <View style={styles.rentUnitsContainer}>
          {(apartment.bhkUnits || []).map((unit, idx) => (
            <View key={idx} style={styles.rentUnitCard}>
              <View style={styles.rentUnitHeader}>
                <Ionicons name="home" size={20} color="#6846bd" />
                <Text style={styles.rentUnitType}>{unit.apartmentType}</Text>
              </View>
              
              <View style={styles.rentDetailsRow}>
                <View style={styles.rentDetailItem}>
                  <Text style={styles.rentDetailLabel}>Monthly Rent</Text>
                  <Text style={styles.rentDetailValue}>₹{unit.monthlyRent}</Text>
                </View>
                <View style={styles.rentDetailItem}>
                  <Text style={styles.rentDetailLabel}>Deposit</Text>
                  <Text style={styles.rentDetailValue}>₹{unit.securityDeposit}</Text>
                </View>
              </View>
              
              <View style={styles.rentMaintenanceRow}>
                <Ionicons name="construct" size={16} color="#6B7280" />
                <Text style={styles.rentMaintenanceText}>
                  Maintenance: ₹{unit.maintenanceCharges}/month
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Animatable.View>

      {/* Apartment Gallery */}
      <Animatable.View
        animation="fadeInUp"
        duration={1000}
        style={styles.gallerySection}
      >
        <View style={styles.sectionHeader}>
          <View style={styles.sectionIconContainer}>
            <Ionicons name="images" size={24} color="#6846bd" />
          </View>
          <Text style={styles.sectionTitle}>Apartment Gallery</Text>
        </View>
        <Text style={styles.sectionSubtitle}>Tap any image to view in full screen</Text>
        
        <View style={styles.galleryGrid}>
          {Object.entries(apartment.photos || {}).map(([key, uri]) => {
            if (!uri || key === "_id" || key === "profileImage") return null;
            return (
              <TouchableOpacity
                key={key}
                onPress={() => openImageModal(uri)}
                style={styles.imageWrapper}
                activeOpacity={0.8}
              >
                <Image source={{ uri: uri }} style={styles.gridPhoto} />
                <View style={styles.photoLabelContainer}>
                  <Text style={styles.photoLabel}>
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </Animatable.View>

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
  container: { padding: 16, backgroundColor: "#F9FAFB" },

  profileCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    gap: 20,
  },
  profileLeft: {
    alignItems: "center",
    paddingRight: 20,
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
  },
  ownerImageContainer: {
    position: "relative",
    marginBottom: 12,
  },
  ownerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#6846bd",
  },
  verifiedBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
  },
  ownerName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 8,
  },
  ownerRoleBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F0FF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 4,
  },
  ownerRoleText: {
    fontSize: 11,
    color: "#6846bd",
    fontWeight: "600",
  },
  profileRight: {
    flex: 1,
    justifyContent: "space-around",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  infoIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#F3F0FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    color: "#9CA3AF",
    fontWeight: "600",
    marginBottom: 2,
    textTransform: "uppercase",
  },
  infoValue: {
    fontSize: 13,
    color: "#1F2937",
    fontWeight: "500",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F0FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
  },
  sectionSubtitle: {
    fontSize: 13,
    color: "#9CA3AF",
    marginBottom: 16,
    marginTop: -8,
  },

  amenitiesCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  amenitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  amenityBox: {
    width: "48%",
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  amenityIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F3F0FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  amenityLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 4,
  },
  amenityValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
  },
  amenityValueUnavailable: {
    color: "#9CA3AF",
    fontWeight: "500",
  },

  rentCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  rentUnitsContainer: {
    gap: 12,
  },
  rentUnitCard: {
    backgroundColor: "#F3F0FF",
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E9E3FF",
  },
  rentUnitHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  rentUnitType: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
  },
  rentDetailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  rentDetailItem: {
    flex: 1,
  },
  rentDetailLabel: {
    fontSize: 11,
    color: "#6B7280",
    fontWeight: "600",
    marginBottom: 4,
  },
  rentDetailValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#6846bd",
  },
  rentMaintenanceRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 8,
    borderRadius: 6,
    gap: 6,
  },
  rentMaintenanceText: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },

  gallerySection: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  galleryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  imageWrapper: {
    width: "48%",
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#F9FAFB",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  gridPhoto: {
    width: "100%",
    height: 150,
  },
  photoLabelContainer: {
    backgroundColor: "#F9FAFB",
    padding: 8,
  },
  photoLabel: {
    fontSize: 12,
    textAlign: "center",
    color: "#6B7280",
    fontWeight: "500",
    textTransform: "capitalize",
  },

  contactSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 30,
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6846bd",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#6846bd",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "600",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.9)",
  },
  modalClose: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },
  modalImage: {
    width: "90%",
    height: "80%",
    resizeMode: "contain",
  },
});
