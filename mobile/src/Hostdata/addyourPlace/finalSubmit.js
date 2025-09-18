import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const FinalSubmit = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thank You for Registering!</Text>
      <Text style={styles.message}>
        Your details have been successfully submitted. You will receive a confirmation email soon.  
        We will also keep you updated via WhatsApp.  
      </Text>
      <Text style={styles.appName}>- Team Zewixa</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Host")} >
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FinalSubmit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  appName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6846bd",
    marginBottom: 30,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: "#6846bd",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
});
