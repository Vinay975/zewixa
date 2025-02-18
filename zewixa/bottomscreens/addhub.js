// bottomscreens/addhub.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const AddHub = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.box} 
        onPress={() => navigation.navigate("HostelDataOne")}
      >
        <Text style={styles.boxText}>Hostels</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.box} 
        onPress={() => navigation.navigate("HostelDataOne")}
      >
        <Text style={styles.boxText}>Apartments</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.box} 
        onPress={() => navigation.navigate("HostelDataOne")}
      >
        <Text style={styles.boxText}>To-lets</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.box} 
        onPress={() => navigation.navigate("HostelDataOne")}
      >
        <Text style={styles.boxText}>Hotels</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  box: {
    width: "45%",
    height: 200,
    backgroundColor: "white",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
  },
  boxText: {
    fontSize: 20,
    color: "black",
  },
});

export default AddHub;
