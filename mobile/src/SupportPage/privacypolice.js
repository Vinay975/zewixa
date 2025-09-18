import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const PrivacyPolicy = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Privacy Policy</Text>

      <Text style={styles.sectionTitle}>1. Information We Collect</Text>
      <Text style={styles.paragraph}>
        We collect information you provide directly, such as your name, email, phone number, and listing details.
      </Text>

      <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
      <Text style={styles.paragraph}>
        Your information helps us provide a secure and personalized experience, including communication, bookings, and service improvement.
      </Text>

      <Text style={styles.sectionTitle}>3. Data Sharing</Text>
      <Text style={styles.paragraph}>
        We do not share your personal data with third parties except when legally required or for core functionality like contacting listing owners.
      </Text>

      <Text style={styles.sectionTitle}>4. Data Security</Text>
      <Text style={styles.paragraph}>
        We implement appropriate security measures to protect your data. However, no digital platform can guarantee 100% security.
      </Text>

      <Text style={styles.sectionTitle}>5. Your Rights</Text>
      <Text style={styles.paragraph}>
        You can request access, modification, or deletion of your personal data by contacting our support team.
      </Text>

      <Text style={styles.sectionTitle}>6. Changes to This Policy</Text>
      <Text style={styles.paragraph}>
        This Privacy Policy may be updated periodically. Continued use of the app means you accept the revised policy.
      </Text>

      <Text style={styles.footerText}>
        Last Updated: June 12, 2025
      </Text>
    </ScrollView>
  );
};

export default PrivacyPolicy;


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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    color: '#333',
  },
  paragraph: {
    fontSize: 15,
    color: '#555',
    marginTop: 6,
    lineHeight: 22,
  },
  footerText: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 13,
    color: '#999',
  },
});
