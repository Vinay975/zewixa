import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  Linking,
  Alert
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function HostelDetails({ route }) {
  const { hostel } = route.params;
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
      <View style={styles.profileCard}>
        <Image
           source={{ uri: `https://myapp-kida.onrender.com${hostel.owner?.ownerImage}` }}
          style={styles.ownerImage}
        />
        <View style={styles.ownerInfo}>
          <Text style={styles.ownerName}><Ionicons name="person" size={18} color="#6846bd" /> {hostel.owner?.name || 'Owner Name'}</Text>
          <Text style={styles.ownerPhone}><Ionicons name="call" size={16} color="#6846bd" /> {hostel.owner?.phoneOne || 'Not Available'}</Text>
          {hostel.owner?.phoneTwo && (
            <Text style={styles.ownerPhone}><Ionicons name="call" size={16} color="#6846bd" /> {hostel.owner.phoneTwo}</Text>
          )}
          <Text style={styles.ownerLocation}><Ionicons name="location" size={16} color="#6846bd" /> {hostel.location || 'Location not available'}</Text>
          <Text style={styles.ownerEmail}><MaterialIcons name="email" size={16} color="#6846bd" /> {hostel.owner?.email || 'Email not available'}</Text>
        </View>
      </View>

      {/* Hostel Information Section */}
      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>
          <FontAwesome5 name="info-circle" size={20} color="#6846bd" /> Hostel Information
        </Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>
            <Ionicons name="wifi" size={16} color="#666" /> WiFi: {hostel.wifi ? 'Available' : 'Not Available'}
          </Text>
          <Text style={styles.infoText}>
            <FontAwesome5 name="snowflake" size={14} color="#666" /> AC Type: {hostel.acType || 'Not available'}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>
            <FontAwesome5 name="building" size={14} color="#666" /> Floors: {hostel.floors || 'Not specified'}
          </Text>
          <Text style={styles.infoText}>
            <FontAwesome5 name="door-open" size={14} color="#666" /> Rooms: {hostel.rooms || 'Not specified'}
          </Text>
        </View>
      </View>


      {/* Rent Details Section */}
      <View style={styles.rentCard}>
        <Text style={styles.sectionTitle}><Ionicons name="cash" size={20} color="#6846bd" /> Rent Details</Text>
        {hostel.rent?.OneSharing && <Text style={styles.rentText}>Single Sharing: ₹{hostel.rent.OneSharing}</Text>}
        {hostel.rent?.TwoSharing && <Text style={styles.rentText}>Double Sharing: ₹{hostel.rent.TwoSharing}</Text>}
        {hostel.rent?.ThreeSharing && <Text style={styles.rentText}>Triple Sharing: ₹{hostel.rent.ThreeSharing}</Text>}
        {hostel.rent?.FourSharing && <Text style={styles.rentText}>Four Sharing: ₹{hostel.rent.FourSharing}</Text>}
        {hostel.rent?.FiveSharing && <Text style={styles.rentText}>Five Sharing: ₹{hostel.rent.FiveSharing}</Text>}
        {hostel.rent?.Advance && <Text style={styles.rentText}>Advance: ₹{hostel.rent.Advance}</Text>}
      </View>

      {/* Mess Menu */}
      {hostel.photos?.messMenu && (
        <View>
          <Text style={styles.sectionTitle}>Mess Menu</Text>
          <TouchableOpacity onPress={() => openImageModal(`https://myapp-kida.onrender.com${hostel.photos.messMenu}`)}>
            <Image
               source={{ uri: `https://myapp-kida.onrender.com${hostel.photos.messMenu}` }}
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
              onPress={() => openImageModal(`https://myapp-kida.onrender.com${uri}`)}
              style={styles.imageWrapper}
            >
              <Image
                source={{ uri: `https://myapp-kida.onrender.com${uri}` }}
                style={styles.gridPhoto}
              />
              <Text style={styles.photoLabel}>{key.replace(/([A-Z])/g, ' $1')}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Contact and Book Buttons */}
      <View style={styles.contactSection}>
        <TouchableOpacity style={styles.actionBtn} onPress={handleContact}>
          <Text style={styles.btnText}>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={handleBookNow}>
          <Text style={styles.btnText}>Book Now</Text>
        </TouchableOpacity>
      </View>

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
          <Image
            source={{ uri: selectedImage }}
            style={styles.modalImage}
          />
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fdfdfd',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 3,
    height: 170,
  },
  ownerImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginRight: 16,
    borderWidth: 3,
    borderColor: '#6846bd',
  },
  ownerInfo: {
    flex: 1,
  },
  ownerName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  ownerPhone: {
    fontSize: 15,
    color: '#555',
    marginBottom: 2,
  },
  ownerLocation: {
    fontSize: 15,
    color: '#555',
    marginBottom: 2,
  },
  ownerEmail: {
    fontSize: 15,
    color: '#555',
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6846bd',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#444',
  },
  rentCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    elevation: 3,
  },
  rentText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 6,
  },
  photoItem: {
    width: '100%',
    height: 220,
    borderRadius: 10,
    marginBottom: 8,
  },
  photoLabel: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 4,
    color: '#444',
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  },
  imageWrapper: {
    width: '48%',
    marginBottom: 12,
  },
  gridPhoto: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  contactSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    marginBottom: 30,
  },
  actionBtn: {
    backgroundColor: '#6846bd',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 30,
    elevation: 2,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalClose: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  modalImage: {
    width: '90%',
    height: '80%',
    resizeMode: 'contain',
  },
});
