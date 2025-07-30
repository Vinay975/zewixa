import React, { useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
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
      {watchlist.map((item) => {
        const isHostel = !!item.hostelName;
        const name = isHostel ? item.hostelName : item.apartmentName;
        const location = item.location || 'Not specified';
        const owner = item.ownerData?.name || 'Owner';
        const gender = isHostel ? item.gender : null;
        const imageUri =
          `https://myapp-5u6v.onrender.com` +
          (isHostel ? item.photos?.main : item.photos?.building);

        return (
          <TouchableOpacity
            key={item._id}
            style={styles.card}
            onPress={() =>
              navigation.navigate(isHostel ? 'HostelDetails' : 'ApartmentDetails', {
                [isHostel ? 'hostel' : 'apartment']: item,
              })
            }
          >
            <View style={styles.imageContainer}>
              <Image source={{ uri: imageUri }} style={styles.image} />
              <View style={styles.typeBadge}>
                <Text style={styles.typeBadgeText}>{isHostel ? 'Hostel' : 'Apartment'}</Text>
              </View>
            </View>

            <View style={styles.info}>
              {isHostel ? (
                <>
                  <View style={styles.row}>
                    <MaterialIcons name="home" size={16} color="#6846bd" />
                    <Text style={styles.text}>{name}</Text>
                  </View>
                  <View style={styles.row}>
                    <Ionicons name="location-outline" size={16} color="#6846bd" />
                    <Text style={styles.text}>{location}</Text>
                  </View>
                  <View style={styles.row}>
                    <Ionicons
                      name={
                        gender === 'Male'
                          ? 'male-outline'
                          : gender === 'Female'
                          ? 'female-outline'
                          : 'person-outline'
                      }
                      size={16}
                      color="#6846bd"
                    />
                    <Text style={styles.text}>{gender}</Text>
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.row}>
                    <MaterialIcons name="home" size={16} color="#6846bd" />
                    <Text style={styles.text}> {owner}</Text>
                  </View>
                  <View style={styles.row}>
                    <Ionicons name="location-outline" size={16} color="#6846bd" />
                    <Text style={styles.text}>{location}</Text>
                  </View>
                </>
              )}
            </View>

            <TouchableOpacity onPress={() => toggleWatch(item)} style={styles.heartBtn}>
              <Ionicons name="heart" size={24} color="tomato" />
            </TouchableOpacity>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    padding: 12,
  },
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
    shadowRadius: 4,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  typeBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: '#6846bd',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 1,
  },
  typeBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
    marginLeft: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  text: {
    marginLeft: 4,
    fontSize: 14,
    color: '#333',
  },
  heartBtn: {
    padding: 4,
  },
});
