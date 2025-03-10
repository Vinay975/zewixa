import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


const Host = () => {

  const Navigator = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.placeContainer} onPress={() => Navigator.navigate("AboutPlace")}>
        <Ionicons name="add-circle" size={40} color="#6846bd" />
        <Text style={styles.sectionHeaderText}>Add Your Place</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  placeContainer: {
    width: 400,
    height: 130,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionHeaderText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6846bd",
  },
  faqContainer: {
    width: "96%",
    height: 300,
    paddingVertical: 20,
    // backgroundColor:"red"
  },
  faqTitle: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  faqItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor:"red"
  },
  question: {
    fontSize: 20,
    // fontWeight: "bold",
    color: "#222",
  },
  answer: {
    fontSize: 18,
    color: "#555",
    marginTop: 5,
  },
  askDoubtsBox: {
    width: "90%",
    height: 80,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  askDoubtsText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6846bd",
  },
  askDoubtsIcon: {
    marginRight: 10,
  },
});

export default Host;
