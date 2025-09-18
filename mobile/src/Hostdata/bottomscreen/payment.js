import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button } from "react-native-paper";

const Payment = () => {
  const [paymentStatus, setPaymentStatus] = useState({
    rent: false,
    advance: true,
    wifi: false,
    securityDeposit: true,
  });

  const togglePayment = (type) => {
    setPaymentStatus((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>💰 Payment Details</Text>

      {/* Rent Breakdown */}
      {[
        { type: "rent", label: "Monthly Rent", amount: 8000 },
        { type: "advance", label: "Advance Payment", amount: 15000 },
        { type: "wifi", label: "Wi-Fi Charges", amount: 500 },
        { type: "securityDeposit", label: "Security Deposit", amount: 5000 },
      ].map((item) => (
        <View key={item.type} style={styles.paymentRow}>
          <View style={styles.leftSection}>
            <Icon name="cash-multiple" size={24} color="#6846bd" />
            <Text style={styles.paymentLabel}>{item.label}</Text>
          </View>
          <Text style={styles.amount}>₹ {item.amount}</Text>
          <TouchableOpacity
            style={[styles.statusButton, paymentStatus[item.type] ? styles.paid : styles.pending]}
            onPress={() => togglePayment(item.type)}
          >
            <Text style={styles.statusText}>
              {paymentStatus[item.type] ? "Paid ✅" : "Pending ❌"}
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Pay Now Button */}
      <Button mode="contained" icon="credit-card" style={styles.payButton} onPress={() => alert("Proceed to Payment")}>
        Proceed to Payment
      </Button>
    </ScrollView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6846bd",
    textAlign: "center",
    marginBottom: 20,
  },
  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentLabel: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  statusButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  paid: {
    backgroundColor: "#34a853",
  },
  pending: {
    backgroundColor: "#d32f2f",
  },
  statusText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  payButton: {
    marginTop: 20,
    backgroundColor: "#6846bd",
    paddingVertical: 10,
  },
});
