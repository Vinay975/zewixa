import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HostelDataOne = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hostel Data</Text>
      <Button
        title="Hostel Data Two"
        onPress={() => navigation.navigate("HostelDataTwo")}
      />
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
