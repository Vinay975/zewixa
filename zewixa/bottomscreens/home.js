import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

const HomePage = () => {
  const [hostels, setHostels] = useState([]);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await axios.get('http://192.168.30.213:5000/hostels'); // 🔁 Replace with your actual endpoint
        setHostels(response.data);
      } catch (error) {
        console.error('Error fetching hostels:', error);
      }
    };

    fetchHostels();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Available Hostels</Text>
      {hostels.map((hostel, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.name}>{hostel.name}</Text>
          {/* {hostel.photos && hostel.photos.length > 0 && (
            <Image
              source={{ uri: `http://localhost:5000/uploads/${hostel.photos[0]}` }} // 🔁 Replace if needed
              style={styles.image}
              resizeMode="cover"
            />
          )} */}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    width: '95%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#fff',
    elevation: 2,
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
  },
});

export default HomePage;
