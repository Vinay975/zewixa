import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Home = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Top Search & Location Bar */}
        <View style={styles.topContainer}>
          <View style={styles.searchBar}>
            <MaterialIcons name="search" size={24} style={styles.icon} />
            <Text style={styles.searchText}>Search...</Text>
          </View>
          <TouchableOpacity style={styles.location}>
            <MaterialIcons name="location-on" size={30} color="white" />
          </TouchableOpacity>
        </View>

        {/* Horizontal Scroll Section */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {["Hostel", "Apartment", "To-lets", "Hotels"].map((item, index) => (
            <View key={index} style={styles.box}>
              <Text style={styles.boxText}>{item}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  topContainer: {
    width: "100%",
    height: 70,
    marginTop: 20,
    // backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  searchBar: {
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    width: 320,
    height: 50,
    // backgroundColor: "gray",
    borderRadius: 25,
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 10,
  },
  searchText: {
    // color: "white",
    fontSize: 16,
  },
  location: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6846bd",
    borderRadius: 25,
    marginLeft: 10,
  },
  horizontalScroll: {
    marginTop: 20,
  },
  box: {
    backgroundColor: "#fff",
    width: 100,
    height: 40,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, 
    shadowRadius: 5, 
    elevation: 3,
  },

  boxText: {
    fontSize: 16,
    color: "#6846bd",
    fontWeight: "bold",
  },
});

export default Home;
