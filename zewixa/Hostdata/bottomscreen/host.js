import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import PlaceDetails from "../../addyourplace/aboutplace";

const Host = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const Navigator = useNavigation();
  const faqData = [
    { question: "What is Zewixa?", answer: "Zewixa is a platform for video recommendations based on user preferences." },
    { question: "How does it work?", answer: "Users input their preferences, and our system suggests relevant videos." },
    { question: "Is Zewixa free to use?", answer: "Yes, Zewixa offers free recommendations with an option for premium features." },
    { question: "Can I add my own videos?", answer: "Yes, users can upload and share their videos on the platform." },
    { question: "Is Zewixa free to use?", answer: "Yes, Zewixa offers free recommendations with an option for premium features." },
  ];

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
    

      <TouchableOpacity style={styles.placeContainer} onPress={()=> Navigator.navigate("PlaceDetails")}>
        <Ionicons name="add-circle" size={40} color="#6846bd" />
        <Text style={styles.sectionHeaderText}>Add Your Place</Text>
      </TouchableOpacity>

      <ScrollView style={styles.faqContainer}>
        <Text style={styles.faqTitle}>FAQs</Text>
        {faqData.map((item, index) => (
          <TouchableOpacity key={index} style={styles.faqItem} onPress={() => toggleExpand(index)}>
            <View style={styles.questionContainer}>
              <Text style={styles.question}>{item.question}</Text>
              <Ionicons name={expandedIndex === index ? "chevron-up" : "chevron-down"} size={20} color="#6846bd" />
            </View>
            {expandedIndex === index && <Text style={styles.answer}>{item.answer}</Text>}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.askDoubtsBox}>
        <Ionicons name="help-circle" size={30} color="#6846bd" style={styles.askDoubtsIcon} />
        <Text style={styles.askDoubtsText}>Ask Your Doubts</Text>
      </View>
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
    height:130,
    backgroundColor: "#fff",
    justifyContent:"center",
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
    height:300,
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
