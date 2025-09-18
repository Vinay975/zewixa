import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const { width } = Dimensions.get("window");

export default function EditPlaceOptions({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Place to Edit</Text>
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("EditHostel")}
        >
          <Icon name="home-city" size={40} color="#6846bd" />
          <Text style={styles.cardText}>Hostel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("EditApartment")}
        >
          <Icon name="office-building" size={40} color="#6846bd" />
          <Text style={styles.cardText}>Apartment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    paddingTop: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: width - 40,
  },
  card: {
    backgroundColor: "#fff",
    width: width / 2.5,
    height: width / 2.5,
    borderRadius: 15,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
});
