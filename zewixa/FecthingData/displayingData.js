// screens/HostelDetails.js
import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

export default function HostelDetails({ route }) {
  const { hostel } = route.params;

  // List all photo fields in order:
  const photoKeys = ['main','messRoom','topView','washroom','roomInterior','commonArea','balconyView','laundryArea'];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{hostel.hostelName}</Text>
      <Text style={styles.sub}>{hostel.location}</Text>

      {photoKeys.map(key => {
        const uri = hostel.photos?.[key];
        return (
          <View key={key} style={styles.photoContainer}>
            <Text style={styles.photoLabel}>{key}</Text>
            {uri ? (
              <Image
                source={{ uri: `http://192.168.30.213:5000${uri}` }}
                style={styles.photo}
              />
            ) : (
              <View style={[styles.photo, styles.placeholder]}>
                <Text>No {key}</Text>
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  sub: { fontSize: 16, color: '#555', marginBottom: 16 },
  photoContainer: { marginBottom: 20 },
  photoLabel: { fontSize: 14, marginBottom: 6, textTransform: 'capitalize' },
  photo: { width: '100%', height: 200, borderRadius: 8 },
  placeholder: {
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
