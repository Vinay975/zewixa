// Contact.js
import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Contact = ({ route }) => {
  const { phoneNumber } = route.params;

  const handleCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleMessage = () => {
    Linking.openURL(`sms:${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Options</Text>
      <TouchableOpacity style={styles.button} onPress={handleCall}>
        <Ionicons name="call" size={24} color="#fff" />
        <Text style={styles.buttonText}>Call</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleMessage}>
        <Ionicons name="chatbubble" size={24} color="#fff" />
        <Text style={styles.buttonText}>Message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6846bd',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 40,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#6846bd',
  },
});
