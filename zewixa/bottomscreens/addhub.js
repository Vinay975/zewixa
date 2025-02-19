import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import HostelDataOne from "../stackscreen/hosteldata-one";
import HostelDataTwo from "../stackscreen/hosteldata-two";

const AddHub = ({ navigation }) => {
  const [data, setData] = useState([
    { id: '1', title: 'Hostels', screen: 'HostelDataOne' },
    { id: '2', title: 'Apartments', screen: 'HostelDataTwo' },
    { id: '3', title: 'To-lets', screen: 'HostelDataOne' },
    { id: '4', title: 'Hotels', screen: 'HostelDataOne' },
  ]);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.box} 
      onPress={() => navigation.navigate(item.screen)}
    >
      <Text style={styles.boxText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      numColumns={1} 
      contentContainerStyle={styles.container}
      onEndReachedThreshold={0.5}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 400,
    height: 130,
    margin: 10,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.4,
    borderColor: "#6846bd",
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  boxText: {
    fontSize: 20,
    color: "black",
    fontVariant: "medium",
  },
});

export default AddHub;
