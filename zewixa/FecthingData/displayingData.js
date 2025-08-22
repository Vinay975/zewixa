import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Linking,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

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
      Alert.alert('Contact Unavailable', 'No phone number available for this owner.');
    }
  };

  const handleBookNow = () => {
    const email = hostel.owner?.email;
    if (email) {
      Linking.openURL(`mailto:${email}`);
    } else {
      Alert.alert('Booking Unavailable', 'No email available for this owner.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Section */}
      <Animatable.View animation="fadeInDown" duration={800} style={styles.profileCard}>
        <Image
          source={{ uri: `https://zewixa-jz2h.onrender.com${hostel.owner.ownerImage}` }}
          style={styles.ownerImage}
        />
        <View style={styles.ownerInfo}>
          <Text style={styles.ownerName}>{hostel.owner?.name || 'Owner Name'}</Text>
          <Text style={styles.ownerPhone}><Ionicons name="call-outline" size={16} /> {hostel.owner?.phoneOne || 'Not Available'}</Text>
          {hostel.owner?.phoneTwo && (
            <Text style={styles.ownerPhone}><Ionicons name="call-outline" size={16} /> {hostel.owner.phoneTwo}</Text>
          )}
          <Text style={styles.ownerLocation}><Ionicons name="location-outline" size={16} /> {hostel.location || 'Location not available'}</Text>
          <Text style={styles.ownerEmail}><Ionicons name="mail-outline" size={16} /> {hostel.owner?.email || 'Email not available'}</Text>
        </View>
      </Animatable.View>

      {/* Hostel Information Section */}
      <Animatable.View animation="fadeInUp" duration={800} style={styles.infoCard}>
        <Text style={styles.sectionTitle}>🏠 Hostel Information</Text>

        {[
          {
            label: 'WiFi',
            value: hostel.wifi ? 'Available' : 'Not Available',
            icon: <MaterialIcons name="wifi" size={20} color="#6846bd" />,
          },
          {
            label: 'AC Type',
            value: hostel.acType || 'Not available',
            icon: <Ionicons name="snow-outline" size={20} color="#6846bd" />,
          },
          {
            label: 'Floors',
            value: hostel.floors || 'Not specified',
            icon: <FontAwesome5 name="building" size={18} color="#6846bd" />,
          },
          {
            label: 'Rooms',
            value: hostel.rooms || 'Not specified',
            icon: <Ionicons name="bed-outline" size={20} color="#6846bd" />,
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

      {/* Rent Details Section */}
      <Animatable.View animation="fadeInUp" duration={900} style={styles.rentCard}>
        <Text style={styles.sectionTitle}>💰 Rent Details</Text>
        <View style={styles.rentGrid}>
          {hostel.rent?.OneSharing && (
            <View style={styles.rentItem}>
              <Ionicons name="person-outline" size={22} color="#6846bd" />
              <Text style={styles.rentText}>Single: ₹{hostel.rent.OneSharing}</Text>
            </View>
          )}
          {hostel.rent?.TwoSharing && (
            <View style={styles.rentItem}>
              <Ionicons name="people-outline" size={22} color="#6846bd" />
              <Text style={styles.rentText}>Double: ₹{hostel.rent.TwoSharing}</Text>
            </View>
          )}
          {hostel.rent?.ThreeSharing && (
            <View style={styles.rentItem}>
              <FontAwesome5 name="users" size={20} color="#6846bd" />
              <Text style={styles.rentText}>Triple: ₹{hostel.rent.ThreeSharing}</Text>
            </View>
          )}
          {hostel.rent?.FourSharing && (
            <View style={styles.rentItem}>
              <FontAwesome5 name="users-cog" size={20} color="#6846bd" />
              <Text style={styles.rentText}>Four: ₹{hostel.rent.FourSharing}</Text>
            </View>
          )}
          {hostel.rent?.FiveSharing && (
            <View style={styles.rentItem}>
              <FontAwesome5 name="user-friends" size={20} color="#6846bd" />
              <Text style={styles.rentText}>Five: ₹{hostel.rent.FiveSharing}</Text>
            </View>
          )}
          {hostel.rent?.Advance && (
            <View style={styles.rentItem}>
              <MaterialIcons name="payments" size={22} color="#6846bd" />
              <Text style={styles.rentText}>Advance: ₹{hostel.rent.Advance}</Text>
            </View>
          )}
        </View>
      </Animatable.View>

      {/* Mess Menu */}
      {hostel.photos?.messMenu && (
        <View>
          <Text style={styles.sectionTitle}>Mess Menu</Text>
          <TouchableOpacity onPress={() => openImageModal(`https://zewixa-jz2h.onrender.com${hostel.photos.messMenu}`)}>
            <Image
              source={{ uri: `https://zewixa-jz2h.onrender.com${hostel.photos.messMenu}` }}
              style={styles.photoItem}
            />
          </TouchableOpacity>
        </View>
      )}

      {/* Remaining Images */}
      <Text style={styles.sectionTitle}>Hostel Gallery</Text>
      <View style={styles.galleryGrid}>
        {Object.entries(hostel.photos || {}).map(([key, uri]) => {
          if (!uri || key === 'messMenu' || key === '_id') return null;
          return (
            <TouchableOpacity
              key={key}
              onPress={() => openImageModal(`https://zewixa-jz2h.onrender.com${uri}`)}
              style={styles.imageWrapper}
            >
              <Image
                source={{ uri: `https://zewixa-jz2h.onrender.com${uri}` }}
                style={styles.gridPhoto}
              />
              <Text style={styles.photoLabel}>{key.replace(/([A-Z])/g, ' $1')}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Contact and Book Buttons */}
      <Animatable.View animation="fadeInUp" duration={1000} style={styles.contactSection}>
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
  container: { padding: 16, backgroundColor: '#fdfdfd' },

  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 3,
  },
  ownerImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: 16,
  },
  ownerInfo: { flex: 1 },
  ownerName: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
  ownerPhone: { fontSize: 14, marginBottom: 2, color: '#555' },
  ownerLocation: { fontSize: 14, marginBottom: 2, color: '#555' },
  ownerEmail: { fontSize: 14, color: '#555' },

  infoCard: { backgroundColor: '#fff', padding: 16, borderRadius: 10, marginBottom: 16, elevation: 3 },
  sectionTitle: { fontSize: 20, fontWeight: '700', marginBottom: 12, color: '#333' },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  infoLabel: { fontSize: 15, fontWeight: '600' },
  infoValue: { fontSize: 15, color: '#444' },

  rentCard: { backgroundColor: '#fff', padding: 16, borderRadius: 10, marginBottom: 16, elevation: 3 },
  rentGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  rentItem: {
    width: '48%',
    backgroundColor: '#f9f7ff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  rentText: { fontSize: 14, marginTop: 4, fontWeight: '600', color: '#333' },

  photoItem: { width: '100%', height: 220, borderRadius: 10, marginBottom: 8 },
  photoLabel: { fontSize: 14, textAlign: 'center', marginTop: 4, color: '#444' },
  galleryGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, marginBottom: 16 },
  imageWrapper: { width: '48%', marginBottom: 12 },
  gridPhoto: { width: '100%', height: 150, borderRadius: 10 },

  contactSection: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, marginBottom: 30 },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6846bd',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  btnText: { color: '#fff', fontSize: 16, marginLeft: 8, fontWeight: '600' },

  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.9)' },
  modalClose: { position: 'absolute', top: 20, right: 20 },
  modalImage: { width: '90%', height: '80%', resizeMode: 'contain' },
});
