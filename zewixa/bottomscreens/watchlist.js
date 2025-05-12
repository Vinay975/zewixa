// screens/WatchList.js
import React, { useContext } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { WatchlistContext } from '../FecthingData/watchingDetails';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function WatchList() {
  const { watchlist, toggleWatch } = useContext(WatchlistContext);
  const navigation = useNavigation();

  if (!watchlist.length) {
    return (
      <View style={styles.empty}>
        <Text>No liked places yet.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.list}>
      {watchlist.map(h => (
        <TouchableOpacity
          key={h._id}
          style={styles.card}
          onPress={()=>navigation.navigate('Details',{hostel:h})}
        >
          <Image
            source={{ uri:`http://192.168.30.213:5000${h.photos.main}` }}
            style={styles.image}
          />
          <View style={styles.info}>
            <View style={styles.row}>
              <MaterialIcons name="home" size={16} color="#6846bd"/>
              <Text style={styles.text}>{h.hostelName}</Text>
            </View>
            <View style={styles.row}>
              <Ionicons name="location-outline" size={16} color="#6846bd"/>
              <Text style={styles.text}>{h.location}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={()=>toggleWatch(h)}>
            <Ionicons name="heart" size={24} color="tomato"/>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  empty: { flex:1, alignItems:'center', justifyContent:'center' },
  list: { padding:12 },
  card: {
    flexDirection:'row', alignItems:'center',
    backgroundColor:'#fff', borderRadius:8,
    marginBottom:12, padding:8,
    elevation:2, shadowColor:'#000', shadowOffset:{width:0,height:2},
    shadowOpacity:0.1, shadowRadius:4
  },
  image: { width:80, height:80, borderRadius:8 },
  info: { flex:1, marginLeft:8 },
  row: { flexDirection:'row', alignItems:'center', marginBottom:4 },
  text: { marginLeft:4, fontSize:14, color:'#333' },
});
