// screens/HomePage.js
import React, { useEffect, useState, useContext } from 'react';
import {
  View, Text, Image, ScrollView,
  StyleSheet, TouchableOpacity, TextInput
} from 'react-native';
import axios from 'axios';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import FilterModal from '../FecthingData/filterModel';
import { WatchlistContext } from '../FecthingData/watchingDetails';

export default function HomePage() {
  const [hostels, setHostels] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  // const { watchlist, toggleWatch } = useContext(WatchlistContext);
  const { watchlist, toggleWatch } = useContext(WatchlistContext);

  useEffect(() => {
    axios.get('http://192.168.30.213:5000/api/hostels')
      .then(({ data }) => setHostels(data))
      .catch(console.error);
  }, []);

  const applyFilter = (h) => {
    const q = search.toLowerCase();
    if (q && !(
      h.hostelName.toLowerCase().includes(q) ||
      h.location.toLowerCase().includes(q)
    )) return false;
    if (filter.acOnly && h.acType !== 'AC') return false;
    if (filter.gender && filter.gender!=='All' && h.gender !== filter.gender) return false;
    const rent = h.rent.singleSharing;
    if (filter.minRent && rent < +filter.minRent) return false;
    if (filter.maxRent && rent > +filter.maxRent) return false;
    return true;
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
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
        {/* <TouchableOpacity onPress={()=>navigation.navigate('WatchList')}>
          <Ionicons name="heart" size={24} color="tomato" style={{ marginLeft:12 }}/>
        </TouchableOpacity> */}
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {hostels.filter(applyFilter).map(h => {
          const liked = watchlist.some(w=>w._id===h._id);
          return (
            <TouchableOpacity
              key={h._id}
              style={styles.card}
              onPress={()=>navigation.navigate('Details',{hostel:h})}
            >
              <Image
                source={{ uri:`http://192.168.30.213:5000${h.photos.main}`}}
                style={styles.cardImage}
              />
              <View style={styles.cardInfo}>
                <View style={styles.row}>
                  <MaterialIcons name="home" size={16} color="#6846bd"/>
                  <Text style={styles.text}>{h.hostelName}</Text>
                </View>
                <View style={styles.row}>
                  <Ionicons name="location-outline" size={16} color="#6846bd"/>
                  <Text style={styles.text}>{h.location}</Text>
                </View>
                <View style={styles.row}>
                  <Ionicons
                    name={h.gender==='Male'?'male-outline':'female-outline'}
                    size={16} color="#6846bd"
                  />
                  <Text style={styles.text}>{h.gender}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={()=>toggleWatch(h)} style={styles.heartBtn}>
                <Ionicons
                  name={liked?'heart':'heart-outline'}
                  size={24}
                  color={liked?'tomato':'#ccc'}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <FilterModal
        visible={modalVisible}
        onClose={()=>setModalVisible(false)}
        onApply={(f)=>{ setFilter(f); setModalVisible(false);} }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex:1, backgroundColor:'#f2f2f2' },
  header: {
    flexDirection:'row', alignItems:'center',
    padding:8, margin:12,
    backgroundColor:'#fff', borderRadius:8,
    borderWidth:1, borderColor:'#ddd'
  },
  search: { flex:1, marginHorizontal:8, fontSize:16 },
  list: { padding:12 },
  card: {
    flexDirection:'row', alignItems:'center',
    backgroundColor:'#fff', borderRadius:8,
    marginBottom:12, padding:8,
    elevation:2, shadowColor:'#000', shadowOffset:{width:0,height:2},
    shadowOpacity:0.1, shadowRadius:4
  },
  cardImage: { width:80, height:80, borderRadius:8 },
  cardInfo: { flex:1, marginLeft:8 },
  row: { flexDirection:'row', alignItems:'center', marginBottom:4 },
  text: { marginLeft:4, fontSize:14, color:'#333' },
  heartBtn: { padding:4 }
});
