// screens/HomePage.js
import React, { useEffect, useState, useContext } from 'react';
import {
  View, Text, Image, ScrollView,
  StyleSheet, TouchableOpacity, TextInput
} from 'react-native';
import axios from 'axios';
import { Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import FilterModal from '../FecthingData/filterModel';
import { WatchlistContext } from '../FecthingData/watchingDetails';
import { AuthContext } from '../userDetails/userAuth';

export default function HomePage({ route }) {
  const [hostels, setHostels] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [showHostels, setShowHostels] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const { watchlist, toggleWatch } = useContext(WatchlistContext);
  const { customerInfo } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    axios.get('https://zewixa-jz2h.onrender.com/api/hostels')
      .then(({ data }) => setHostels(data))
      .catch(console.error);

    axios.get('https://zewixa-jz2h.onrender.com/api/get-apartment-data')
      .then(({ data }) => setApartments(data))
      .catch(console.error);
  }, []);

  const applyFilter = (h) => {
    const q = search.toLowerCase();
    if (q && !(
      h.hostelName?.toLowerCase().includes(q) ||
      h.location?.toLowerCase().includes(q) ||
      h.ownerData?.ownerName?.toLowerCase().includes(q)
    )) return false;

    if (filter.acOnly && h.acType !== 'AC') return false;
    if (filter.gender && filter.gender !== 'All' && h.gender !== filter.gender) return false;

    const rent = h.rent?.singleSharing || h.rent?.["1BHK"] || 0;
    if (filter.minRent && rent < +filter.minRent) return false;
    if (filter.maxRent && rent > +filter.maxRent) return false;

    return true;
  };

  const displayedItems = showHostels ? hostels : apartments;

  return (
    <View style={styles.screen}>

      {/* Search Header */}
      <View style={styles.header}>
        <Ionicons name="location-outline" size={24} color="#6846bd" />
        <TextInput
          style={styles.search}
          placeholder="Search name or location"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="filter-outline" size={24} color="#6846bd" />
        </TouchableOpacity>
      </View>

      {/* Toggle Buttons */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, showHostels && styles.activeToggle]}
          onPress={() => setShowHostels(true)}
        >
          <Text style={[styles.toggleText, showHostels && styles.activeToggleText]}>Hostels</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, !showHostels && styles.activeToggle]}
          onPress={() => setShowHostels(false)}
        >
          <Text style={[styles.toggleText, !showHostels && styles.activeToggleText]}>Apartments</Text>
        </TouchableOpacity>
      </View>

      {/* Cards Grid */}
      <ScrollView contentContainerStyle={styles.list}>
        <View style={styles.grid}>
          {displayedItems.filter(applyFilter).map(item => {
            const liked = watchlist.some(w => w._id === item._id);
            const isHostel = showHostels;

            const price = item.rent?.singleSharing || item.rent?.["1BHK"] || "N/A";
            const rating = item.rating || 4.2; // fallback if no rating in API

            return (
              <TouchableOpacity
                key={item._id}
                style={styles.card}
                onPress={() => {
                  if (!customerInfo) {
                    Alert.alert("Login Required", "Please login to view details.");
                    navigation.navigate("SignIn");
                  } else {
                    navigation.navigate(
                      isHostel ? "HostelDetails" : "ApartmentDetails",
                      isHostel ? { hostel: item } : { apartment: item }
                    );
                  }
                }}
              >
                <Image
                  source={{
                    uri: showHostels
                      ? `https://zewixa-jz2h.onrender.com${item.photos?.main}`
                      : `https://zewixa-jz2h.onrender.com/${item.photos?.building}`
                  }}
                  style={styles.cardImage}
                />

                <View style={styles.cardInfo}>
                  {/* First row: Hostel name (left) + Gender (right) */}
                  {isHostel ? (
                    <View style={styles.rowBetween}>
                      <Text style={styles.title}>{item.hostelName}</Text>
                      <View style={styles.row}>
                        <Ionicons
                          name={item.gender === 'Male' ? 'male-outline' : 'female-outline'}
                          size={14}
                          color={item.gender === 'Male' ? '#3b82f6' : '#ec4899'}
                        />
                        <Text style={[
                          styles.genderText,
                          { color: item.gender === 'Male' ? '#3b82f6' : '#ec4899' }
                        ]}>
                          {item.gender}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <Text style={styles.title}>{item.ownerData?.name || "Apartment"}</Text>
                  )}

                  {/* Location (common for both) */}
                  <Text style={styles.location}>{item.location || "N/A"}</Text>

                  {/* Price & Rating Row */}
                  <View style={styles.rowBetween}>
                    <Text style={styles.price}>₹{price}</Text>
                    <View style={styles.row}>
                      <Ionicons name="star" size={16} color="#f5a623" />
                      <Text style={styles.rating}>{rating}</Text>
                    </View>
                  </View>
                </View>

                {/* Heart button */}
                <TouchableOpacity
                  onPress={() => {
                    if (!customerInfo) {
                      Alert.alert("Login Required", "Login to save to watchlist.");
                      navigation.navigate("SignIn");
                    } else {
                      toggleWatch(item);
                    }
                  }}
                  style={styles.heartBtn}
                >
                  <Ionicons
                    name={liked ? 'heart' : 'heart-outline'}
                    size={22}
                    color={liked ? 'tomato' : '#ccc'}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <FilterModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onApply={(f) => { setFilter(f); setModalVisible(false); }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f2f2f2' },

  /* Header Search */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    margin: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  search: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 16
  },

  /* Toggle Buttons */
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 40,
    borderRadius: 18,
    marginHorizontal: 25,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
  },
  activeToggle: {
    backgroundColor: '#6846bd'
  },
  toggleText: {
    fontSize: 18,
    color: '#6846bd'
  },
  activeToggleText: {
    color: '#fff',
    fontWeight: 'bold'
  },

  /* Grid List */
  list: { padding: 12 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  /* Card */
  card: {
    width: '48%',  // two per row
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    position: 'relative',
    minHeight: 220,   // 🔥 increased height
  },
  cardImage: {
    width: '100%',
    height: 140,   // 🔥 bigger image
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardInfo: {
    padding: 8,
  },

  /* Text Styles */
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  location: {
    fontSize: 12,
    color: '#666',
    marginVertical: 2,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6846bd',
  },
  rating: {
    marginLeft: 4,
    fontSize: 12,
    color: '#333',
  },
  genderText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
  },

  /* Layout Helpers */
  row: { flexDirection: 'row', alignItems: 'center' },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },

  /* Heart Button */
  heartBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
    padding: 4,
  },
});
