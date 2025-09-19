import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ContactUs = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) {
      Alert.alert('Please fill all fields');
      return;
    }
    Alert.alert('Message Sent', 'Thank you for contacting us!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Contact Us</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={form.name}
        onChangeText={(text) => handleChange('name', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Your Email"
        keyboardType="email-address"
        value={form.email}
        onChangeText={(text) => handleChange('email', text)}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Your Message"
        value={form.message}
        onChangeText={(text) => handleChange('message', text)}
        multiline
        numberOfLines={5}
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Ionicons name="send" size={20} color="#fff" />
        <Text style={styles.buttonText}>Send Message</Text>
      </TouchableOpacity>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Get in Touch</Text>
        <View style={styles.infoRow}>
          <Ionicons name="call" size={20} color="#6846bd" />
          <Text style={styles.infoText} onPress={() => Linking.openURL('tel:+911234567890')}>+91 12345 67890</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="email" size={20} color="#6846bd" />
          <Text style={styles.infoText} onPress={() => Linking.openURL('mailto:info@example.com')}>info@example.com</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="location" size={20} color="#6846bd" />
          <Text style={styles.infoText}>123 Zewixa Street, City, India</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ContactUs;
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6846bd',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6846bd',
    padding: 14,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  infoBox: {
    marginTop: 30,
    backgroundColor: '#f2f0fa',
    padding: 16,
    borderRadius: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6846bd',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 15,
    marginLeft: 10,
    color: '#333',
  },
});
