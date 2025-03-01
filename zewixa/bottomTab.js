import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Host = () => {
  const faqData = [
    { question: "What is Zewixa?", answer: "Zewixa is a platform for video recommendations based on user preferences." },
    { question: "How does it work?", answer: "Users input their preferences, and our system suggests relevant videos." },
    { question: "Is Zewixa free to use?", answer: "Yes, Zewixa offers free recommendations with an option for premium features." },
    { question: "Can I add my own videos?", answer: "Yes, users can upload and share their videos on the platform." }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.videoBox}>
        <Text style={styles.title}>Video Recommendation</Text>
      </View>

      <TouchableOpacity style={styles.placeContainer}>
        <Ionicons name="add-circle" size={40} color="#fff" />
        <Text style={styles.sectionHeaderText}>Add Your Place</Text>
      </TouchableOpacity>

      <ScrollView style={styles.faqContainer}>
        <Text style={styles.faqTitle}>FAQs</Text>
        {faqData.map((item, index) => (
          <View key={index} style={styles.faqItem}>
            <Text style={styles.question}>{item.question}</Text>
            <Text style={styles.answer}>{item.answer}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.askDoubtsBox}>
        <Text style={styles.askDoubtsText}>Ask Your Doubts</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  videoBox: {
    width: "90%",
    height: 100,
    backgroundColor: "#6846bd",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  placeContainer: {
    width: "90%",
    height: 100,
    backgroundColor: "#6846bd",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  sectionHeaderText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
  faqContainer: {
    width: "90%",
    paddingVertical: 20,
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
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
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
});

export default Host;
