import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const TermsOfService = () => {
  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.title}>Terms of Service</Text> */}

      <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
      <Text style={styles.paragraph}>
        By using our app, you agree to comply with and be legally bound by these Terms of Service.
      </Text>

      <Text style={styles.sectionTitle}>2. User Responsibilities</Text>
      <Text style={styles.paragraph}>
        You agree not to misuse the platform and to provide accurate information during registration or listings.
      </Text>

      <Text style={styles.sectionTitle}>3. Booking Policies</Text>
      <Text style={styles.paragraph}>
        All bookings are subject to confirmation by the owner. Cancellations or refunds depend on the owner’s policy.
      </Text>

      <Text style={styles.sectionTitle}>4. Privacy</Text>
      <Text style={styles.paragraph}>
        We value your privacy. Any personal information you provide will be handled as per our Privacy Policy.
      </Text>

      <Text style={styles.sectionTitle}>5. Limitation of Liability</Text>
      <Text style={styles.paragraph}>
        We are not liable for any disputes or damages arising from your use of this platform.
      </Text>

      <Text style={styles.sectionTitle}>6. Changes to Terms</Text>
      <Text style={styles.paragraph}>
        We reserve the right to modify these terms at any time. Continued use of the app implies acceptance of the updated terms.
      </Text>

      <Text style={styles.footerText}>
        Last Updated: June 12, 2025
      </Text>
    </ScrollView>
  );
};

export default TermsOfService;


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
