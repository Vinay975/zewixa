import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PersonInfo = ({ name, email, phone, address }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Personal Information</Text>

      <View style={styles.infoRow}>
        <Ionicons name="person-outline" size={20} color="#6846bd" />
        <Text style={styles.infoText}>{name || "N/A"}</Text>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="mail-outline" size={20} color="#6846bd" />
        <Text style={styles.infoText}>{email || "N/A"}</Text>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="call-outline" size={20} color="#6846bd" />
        <Text style={styles.infoText}>{phone || "N/A"}</Text>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="location-outline" size={20} color="#6846bd" />
        <Text style={styles.infoText}>{address || "N/A"}</Text>
      </View>
    </View>
  );
};

export default PersonInfo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#555',
  },
});
