import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Settings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
     
      <Text style={styles.item}>Account Settings</Text>
      <Text style={styles.item}>Notification Settings</Text>
      <Text style={styles.item}>Privacy Settings</Text>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#6846bd",
  },
  item: {
    fontSize: 18,
    marginVertical: 10,
  },
});

