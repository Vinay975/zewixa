import React, { useState, useLayoutEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Payment = () => {
  const navigation = useNavigation();
  
  const [paymentStatus, setPaymentStatus] = useState({
    rent: false,
    advance: true,
    wifi: false,
    securityDeposit: true,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const togglePayment = (type) => {
    setPaymentStatus((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const paymentItems = [
    { type: "rent", label: "Monthly Rent", amount: 8000, icon: "home" },
    { type: "advance", label: "Advance Payment", amount: 15000, icon: "cash" },
    { type: "wifi", label: "Wi-Fi Charges", amount: 500, icon: "wifi" },
    { type: "securityDeposit", label: "Security Deposit", amount: 5000, icon: "shield-checkmark" },
  ];

  const totalAmount = paymentItems.reduce((sum, item) => sum + item.amount, 0);
  const paidAmount = paymentItems.reduce(
    (sum, item) => (paymentStatus[item.type] ? sum + item.amount : sum),
    0
  );

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Payments</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View>
              <Text style={styles.summaryLabel}>Total Amount</Text>
              <Text style={styles.summaryAmount}>₹{totalAmount}</Text>
            </View>
            <View style={styles.divider} />
            <View>
              <Text style={styles.summaryLabel}>Paid</Text>
              <Text style={[styles.summaryAmount, { color: "#10B981" }]}>₹{paidAmount}</Text>
            </View>
          </View>
        </View>

        {/* Payment Items */}
        <View style={styles.paymentsSection}>
          <Text style={styles.sectionTitle}>Payment Breakdown</Text>
          
          {paymentItems.map((item) => (
            <View key={item.type} style={styles.paymentCard}>
              <View style={styles.paymentLeft}>
                <View style={styles.iconCircle}>
                  <Ionicons name={item.icon} size={24} color="#6846bd" />
                </View>
                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentLabel}>{item.label}</Text>
                  <Text style={styles.paymentAmount}>₹{item.amount}</Text>
                </View>
              </View>
              
              <TouchableOpacity
                style={[
                  styles.statusBadge,
                  paymentStatus[item.type] ? styles.paidBadge : styles.pendingBadge
                ]}
                onPress={() => togglePayment(item.type)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={paymentStatus[item.type] ? "checkmark-circle" : "close-circle"}
                  size={18}
                  color="#FFFFFF"
                />
                <Text style={styles.statusText}>
                  {paymentStatus[item.type] ? "Paid" : "Pending"}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Pay Button */}
        <TouchableOpacity
          style={styles.payButton}
          onPress={() => alert("Proceed to Payment")}
          activeOpacity={0.9}
        >
          <Ionicons name="card" size={24} color="#FFFFFF" />
          <Text style={styles.payButtonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
   paddingTop: 36,
    paddingBottom: 20,
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#1F2937",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  summaryCard: {
    backgroundColor: "#6846bd",
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    elevation: 4,
    shadowColor: "#6846bd",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 14,
    color: "#E9E3FF",
    marginBottom: 8,
    textAlign: "center",
  },
  summaryAmount: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
  },
  divider: {
    width: 1,
    height: 50,
    backgroundColor: "#E9E3FF",
  },
  paymentsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 16,
  },
  paymentCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  paymentLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F3F0FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#6846bd",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 4,
  },
  paidBadge: {
    backgroundColor: "#10B981",
  },
  pendingBadge: {
    backgroundColor: "#EF4444",
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  payButton: {
    flexDirection: "row",
    backgroundColor: "#6846bd",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#6846bd",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    gap: 10,
  },
  payButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
