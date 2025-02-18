// HostelDataOne.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HostelDataOne = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hostel Data</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  text: {
    fontSize: 24,
    color: "#6846bd",
  },
});

export default HostelDataOne;
