import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const FinalSubmit = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#6846bd" barStyle="light-content" />
      
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <View style={styles.iconInner}>
            <Ionicons name="checkmark" size={80} color="#10B981" />
          </View>
        </View>

        <Text style={styles.title}>Registration Successful!</Text>
        <Text style={styles.subtitle}>Your property has been submitted</Text>

        <View style={styles.messageCard}>
          <View style={styles.messageRow}>
            <View style={styles.messageIcon}>
              <Ionicons name="mail-outline" size={20} color="#6846bd" />
            </View>
            <Text style={styles.messageText}>
              You will receive a confirmation email shortly
            </Text>
          </View>

          <View style={styles.messageRow}>
            <View style={styles.messageIcon}>
              <Ionicons name="logo-whatsapp" size={20} color="#10B981" />
            </View>
            <Text style={styles.messageText}>
              We'll keep you updated via WhatsApp
            </Text>
          </View>

          <View style={styles.messageRow}>
            <View style={styles.messageIcon}>
              <Ionicons name="time-outline" size={20} color="#F59E0B" />
            </View>
            <Text style={styles.messageText}>
              Our team will review your property within 24 hours
            </Text>
          </View>
        </View>

        <View style={styles.teamCard}>
          <Ionicons name="people" size={24} color="#6846bd" />
          <Text style={styles.teamText}>Team Zewixa</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Host")}>
          <Text style={styles.buttonText}>Go to Dashboard</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate("AboutPlace")}>
          <Text style={styles.secondaryButtonText}>Add Another Property</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  iconCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#D1FAE5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
    elevation: 8,
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  iconInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#2D3436",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#636E72",
    fontWeight: "500",
    marginBottom: 32,
    textAlign: "center",
  },
  messageCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    marginBottom: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  messageIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  messageText: {
    flex: 1,
    fontSize: 14,
    color: "#2D3436",
    fontWeight: "500",
    lineHeight: 20,
  },
  teamCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8E3F3",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    marginBottom: 32,
  },
  teamText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#6846bd",
    marginLeft: 8,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6846bd",
    width: "100%",
    paddingVertical: 18,
    borderRadius: 16,
    gap: 10,
    elevation: 4,
    shadowColor: "#6846bd",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.5,
  },
  secondaryButton: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#6846bd",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#6846bd",
  },
});

export default FinalSubmit;
