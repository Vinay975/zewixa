import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

const Host = () => {
  const faqData = [
    { question: "What is Zewixa?", answer: "Zewixa is a platform for video recommendations based on user preferences." },
    { question: "How does it work?", answer: "Users input their preferences, and our system suggests relevant videos." },
    { question: "Is Zewixa free to use?", answer: "Yes, Zewixa offers free recommendations with an option for premium features." },
    { question: "Can I add my own videos?", answer: "Yes, users can upload and share their videos on the platform." }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Video Recommendation</Text>
      <TouchableOpacity style={styles.placeContainer}>
        <Text style={styles.sectionHeaderText}>Add Your Place</Text>
      </TouchableOpacity>
      
      <Text style={styles.faqTitle}>FAQs</Text>
      <ScrollView style={styles.faqContainer}>
        {faqData.map((item, index) => (
          <View key={index} style={styles.faqItem}>
            <Text style={styles.question}>{item.question}</Text>
            <Text style={styles.answer}>{item.answer}</Text>
          </View>
        ))}
      </ScrollView>
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  placeContainer: {
    width: "90%",
    height: 100,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  faqTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
  },
  faqContainer: {
    width: "90%",
    maxHeight: 200,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  faqItem: {
    marginBottom: 10,
  },
  question: {
    fontSize: 16,
    fontWeight: "bold",
  },
  answer: {
    fontSize: 14,
    color: "#666",
  },
});

export default Host;
