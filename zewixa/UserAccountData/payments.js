import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Payments = ({ navigation }) => {
  const handlePaymentMethods = () => {
    Alert.alert("Payment Methods", "Navigate to saved cards or UPI methods.");
    // navigation.navigate("SavedPaymentMethods");
  };

  const handleBillingHistory = () => {
    Alert.alert("Billing History", "Show previous transactions.");
    // navigation.navigate("BillingHistory");
  };

  const handleAddPayment = () => {
    Alert.alert("Add Payment Method", "Navigate to add card or UPI.");
    // navigation.navigate("AddPaymentMethod");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment Settings</Text>

      <TouchableOpacity style={styles.optionRow} onPress={handlePaymentMethods}>
        <Ionicons name="card-outline" size={22} color="#6846bd" />
        <Text style={styles.optionText}>Saved Payment Methods</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionRow} onPress={handleBillingHistory}>
        <Ionicons name="document-text-outline" size={22} color="#6846bd" />
        <Text style={styles.optionText}>Billing History</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionRow} onPress={handleAddPayment}>
        <Ionicons name="add-circle-outline" size={22} color="#6846bd" />
        <Text style={styles.optionText}>Add Payment Method</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Payments;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 12,
  },
});
