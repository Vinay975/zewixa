import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const HelpCentre = () => {
  const faqs = [
    {
      question: 'How do I book an apartment?',
      answer: 'Go to the apartment details page and click on the "Book Apartment" button.',
    },
    {
      question: 'Can I contact the apartment owner directly?',
      answer: 'Yes, use the "Call Owner" button on the apartment detail page.',
    },
    {
      question: 'How do I reset my password?',
      answer: 'Go to Sign In screen and tap on "Forgot Password".',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.title}>Help Centre</Text> */}

      <Text style={styles.subTitle}>Frequently Asked Questions</Text>
      {faqs.map((item, index) => (
        <View key={index} style={styles.faqItem}>
          <Text style={styles.question}>Q. {item.question}</Text>
          <Text style={styles.answer}>A. {item.answer}</Text>
        </View>
      ))}

      <Text style={styles.subTitle}>Need More Help?</Text>
      <TouchableOpacity style={styles.helpRow} onPress={() => Linking.openURL('tel:+911234567890')}>
        <Ionicons name="call" size={20} color="#6846bd" />
        <Text style={styles.helpText}>Call Support</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.helpRow} onPress={() => Linking.openURL('mailto:support@zewixa.com')}>
        <MaterialIcons name="email" size={20} color="#6846bd" />
        <Text style={styles.helpText}>Email Support</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HelpCentre;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6846bd',
    marginBottom: 20,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginVertical: 12,
  },
  faqItem: {
    backgroundColor: '#f4f1ff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  answer: {
    fontSize: 15,
    color: '#555',
  },
  helpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  helpText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
});
