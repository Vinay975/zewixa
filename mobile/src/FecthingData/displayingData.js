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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from "react-native-animatable";

export default function HostelDetails({ route }) {
  const { hostel } = route.params;
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

  const handleContact = () => {
    const phone = hostel.owner?.phoneOne || hostel.owner?.phoneTwo;
    if (phone) {
      Linking.openURL(`tel:${phone}`);
    } else {
      Alert.alert(
        "Contact Unavailable",
        "No phone number available for this owner."
      );
    }
  };

  const handleBookNow = () => {
    const email = hostel.owner?.email;
    if (email) {
      Linking.openURL(`mailto:${email}`);
    } else {
      Alert.alert("Booking Unavailable", "No email available for this owner.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Section */}
      <Animatable.View
        animation="fadeInDown"
        duration={800}
        style={styles.profileCard}
      >
        <View style={styles.profileLeft}>
          <View style={styles.ownerImageContainer}>
            <Image
              source={{ uri: hostel.owner.ownerImage }}
              style={styles.ownerImage}
            />
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={28} color="#10B981" />
            </View>
          </View>
          <Text style={styles.ownerName}>
            {hostel.owner?.name || "Owner Name"}
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
              <Text style={styles.infoValue}>
                {hostel.owner?.phoneOne || "Not Available"}
              </Text>
              {hostel.owner?.phoneTwo && (
                <Text style={styles.infoValue}>{hostel.owner.phoneTwo}</Text>
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
                {hostel.location || "Not available"}
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
                {hostel.owner?.email || "Not available"}
              </Text>
            </View>
          </View>
        </View>
      </Animatable.View>

      {/* Hostel Information Section */}
      <Animatable.View
        animation="fadeInUp"
        duration={800}
        style={styles.infoCard}
      >
        <View style={styles.sectionHeader}>
          <View style={styles.sectionIconContainer}>
            <Ionicons name="information-circle" size={24} color="#6846bd" />
          </View>
          <Text style={styles.sectionTitle}>Hostel Information</Text>
        </View>

        <View style={styles.infoGrid}>
          {[
            {
              label: "WiFi",
              value: hostel.wifi ? "Available" : "Not Available",
              icon: "wifi",
              available: hostel.wifi,
            },
            {
              label: "AC Type",
              value: hostel.acType || "Not available",
              icon: "snow-outline",
              available: !!hostel.acType,
            },
            {
              label: "Floors",
              value: hostel.floors || "Not specified",
              icon: "business-outline",
              available: !!hostel.floors,
            },
            {
              label: "Rooms",
              value: hostel.rooms || "Not specified",
              icon: "bed-outline",
              available: !!hostel.rooms,
            },
          ].map((row, idx) => (
            <View style={styles.infoBox} key={idx}>
              <View style={styles.infoIconCircle}>
                <Ionicons name={row.icon} size={24} color="#6846bd" />
              </View>
              <Text style={styles.infoBoxLabel}>{row.label}</Text>
              <Text style={[styles.infoBoxValue, !row.available && styles.infoBoxValueUnavailable]}>
                {row.value}
              </Text>
            </View>
          ))}
        </View>
      </Animatable.View>

      {/* Rent Details Section */}
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
        <Text style={styles.sectionSubtitle}>Monthly rent per person</Text>
        
        <View style={styles.rentGrid}>
          {hostel.rent?.OneSharing && (
            <View style={styles.rentItem}>
              <View style={styles.rentIconContainer}>
                <Ionicons name="person" size={28} color="#6846bd" />
              </View>
              <Text style={styles.rentLabel}>Single Sharing</Text>
              <Text style={styles.rentPrice}>₹{hostel.rent.OneSharing}</Text>
              <Text style={styles.rentPeriod}>per month</Text>
            </View>
          )}
          {hostel.rent?.TwoSharing && (
            <View style={styles.rentItem}>
              <View style={styles.rentIconContainer}>
                <Ionicons name="people" size={28} color="#6846bd" />
              </View>
              <Text style={styles.rentLabel}>Double Sharing</Text>
              <Text style={styles.rentPrice}>₹{hostel.rent.TwoSharing}</Text>
              <Text style={styles.rentPeriod}>per month</Text>
            </View>
          )}
          {hostel.rent?.ThreeSharing && (
            <View style={styles.rentItem}>
              <View style={styles.rentIconContainer}>
                <MaterialIcons name="groups" size={28} color="#6846bd" />
              </View>
              <Text style={styles.rentLabel}>Triple Sharing</Text>
              <Text style={styles.rentPrice}>₹{hostel.rent.ThreeSharing}</Text>
              <Text style={styles.rentPeriod}>per month</Text>
            </View>
          )}
          {hostel.rent?.FourSharing && (
            <View style={styles.rentItem}>
              <View style={styles.rentIconContainer}>
                <MaterialIcons name="groups" size={28} color="#6846bd" />
              </View>
              <Text style={styles.rentLabel}>Four Sharing</Text>
              <Text style={styles.rentPrice}>₹{hostel.rent.FourSharing}</Text>
              <Text style={styles.rentPeriod}>per month</Text>
            </View>
          )}
          {hostel.rent?.FiveSharing && (
            <View style={styles.rentItem}>
              <View style={styles.rentIconContainer}>
                <MaterialIcons name="groups" size={28} color="#6846bd" />
              </View>
              <Text style={styles.rentLabel}>Five Sharing</Text>
              <Text style={styles.rentPrice}>₹{hostel.rent.FiveSharing}</Text>
              <Text style={styles.rentPeriod}>per month</Text>
            </View>
          )}
        </View>
        
        {hostel.rent?.Advance && (
          <View style={styles.advanceContainer}>
            <Ionicons name="wallet" size={20} color="#6846bd" />
            <Text style={styles.advanceText}>Advance Payment: </Text>
            <Text style={styles.advanceAmount}>₹{hostel.rent.Advance}</Text>
          </View>
        )}
      </Animatable.View>

      {/* Mess Menu */}
      {hostel.photos?.messMenu && (
        <Animatable.View
          animation="fadeInUp"
          duration={950}
          style={styles.messMenuCard}
        >
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconContainer}>
              <Ionicons name="restaurant" size={24} color="#6846bd" />
            </View>
            <Text style={styles.sectionTitle}>Mess Menu</Text>
          </View>
          <Text style={styles.sectionSubtitle}>Tap to view full menu</Text>
          <TouchableOpacity
            onPress={() => openImageModal(hostel.photos.messMenu)}
            style={styles.messMenuImageContainer}
            activeOpacity={0.8}
          >
            <Image
              source={{ uri: hostel.photos.messMenu }}
              style={styles.photoItem}
            />
            <View style={styles.viewFullOverlay}>
              <Ionicons name="expand" size={24} color="#FFFFFF" />
              <Text style={styles.viewFullText}>View Full Menu</Text>
            </View>
          </TouchableOpacity>
        </Animatable.View>
      )}

      {/* Remaining Images */}
      <Animatable.View
        animation="fadeInUp"
        duration={1000}
        style={styles.gallerySection}
      >
        <View style={styles.sectionHeader}>
          <View style={styles.sectionIconContainer}>
            <Ionicons name="images" size={24} color="#6846bd" />
          </View>
          <Text style={styles.sectionTitle}>Hostel Gallery</Text>
        </View>
        <Text style={styles.sectionSubtitle}>Tap any image to view in full screen</Text>
        
        <View style={styles.galleryGrid}>
          {Object.entries(hostel.photos || {}).map(([key, uri]) => {
            if (!uri || key === "messMenu" || key === "_id") return null;
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

      {/* Contact and Book Buttons */}
      <Animatable.View
        animation="fadeInUp"
        duration={1000}
        style={styles.contactSection}
      >
        <TouchableOpacity style={styles.actionBtn} onPress={handleContact}>
          <Ionicons name="call" size={20} color="#fff" />
          <Text style={styles.btnText}>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate("HostelBooking")}
        >
          <Ionicons name="calendar-outline" size={20} color="#fff" />
          <Text style={styles.btnText}>Book Now</Text>
        </TouchableOpacity>
      </Animatable.View>

      {/* Image Modal */}
      <Modal
        visible={imageModalVisible}
        transparent={true}
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
  container: { 
    padding: 16, 
    backgroundColor: "#F9FAFB" 
  },

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
    // borderWidth: 1,
    // borderColor: "#6846bd",
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

  infoCard: {
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
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  infoBox: {
    width: "48%",
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  infoIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F3F0FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  infoBoxLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 4,
  },
  infoBoxValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
  },
  infoBoxValueUnavailable: {
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
  rentGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  rentItem: {
    width: "48%",
    backgroundColor: "#F3F0FF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E9E3FF",
  },
  rentIconContainer: {
    marginBottom: 8,
  },
  rentLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 6,
    textAlign: "center",
  },
  rentPrice: {
    fontSize: 20,
    fontWeight: "700",
    color: "#6846bd",
    marginBottom: 2,
  },
  rentPeriod: {
    fontSize: 11,
    color: "#9CA3AF",
  },
  advanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEF3C7",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  advanceText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#92400E",
    marginLeft: 8,
  },
  advanceAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#92400E",
  },

  messMenuCard: {
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
  messMenuImageContainer: {
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
  },
  photoItem: { 
    width: "100%", 
    height: 220,
  },
  viewFullOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(104, 70, 189, 0.9)",
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  viewFullText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
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
    fontWeight: "600" 
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
    resizeMode: "contain" 
  },
});
