// screens/HomePage.js
import React, { useEffect, useState, useContext } from 'react';
import {
  View, Text, Image, ScrollView,
  StyleSheet, TouchableOpacity, TextInput
} from 'react-native';
import axios from 'axios';
import { Alert } from "react-native";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
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
  // const { hostel } = route.params;
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

      {/* List */}
      <ScrollView contentContainerStyle={styles.list}>
        {displayedItems.filter(applyFilter).map(item => {
          const liked = watchlist.some(w => w._id === item._id);
          const isHostel = showHostels;

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
                {isHostel ? (
                  <>
                    <View style={styles.row}>
                      <MaterialIcons name="home" size={16} color="#6846bd" />
                      <Text style={styles.text}>{item.hostelName}</Text>
                    </View>
                    <View style={styles.row}>
                      <Ionicons name="location-outline" size={16} color="#6846bd" />
                      <Text style={styles.text}>{item.location}</Text>
                    </View>
                    <View style={styles.row}>
                      <Ionicons
                        name={item.gender === 'Male' ? 'male-outline' : 'female-outline'}
                        size={16}
                        color="#6846bd"
                      />
                      <Text style={styles.text}>{item.gender}</Text>
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.row}>
                      <MaterialIcons name="person" size={16} color="#6846bd" />
                      <Text style={styles.text}>Owner: {item.ownerData?.name || 'N/A'}</Text>

                    </View>
                    <View style={styles.row}>
                      <Ionicons name="location-outline" size={16} color="#6846bd" />
                      <Text style={styles.text}>{item.location || 'N/A'}</Text>
                    </View>
                  </>
                )}
              </View>
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
                  size={24}
                  color={liked ? 'tomato' : '#ccc'}
                />
              </TouchableOpacity>

            </TouchableOpacity>
          );
        })}
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
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginHorizontal: 25,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 2,
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
  list: { padding: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    padding: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  cardImage: { width: 80, height: 80, borderRadius: 8 },
  cardInfo: { flex: 1, marginLeft: 8 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  text: { marginLeft: 4, fontSize: 14, color: '#333' },
  heartBtn: { padding: 4 }
});
