import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AboutPlace = () => {
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.box} onPress={() => navigation.navigate("AboutOwner")}>
        <Text style={styles.boxText}>Box 1</Text>
      </TouchableOpacity>
      <View style={styles.box}>
        <Text style={styles.boxText}>Box 2</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.boxText}>Box 3</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.boxText}>Box 4</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
  },
  box: {
    height: 120,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 20,
    marginVertical: 10,
    backgroundColor: "#f9f9f9",
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  boxText: {
    fontSize: 16,
    color: "#333",
  },
});

export default AboutPlace;
