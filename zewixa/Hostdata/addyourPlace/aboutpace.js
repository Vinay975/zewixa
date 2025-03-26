import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AboutPlace = () => {
    const navigation = useNavigation();

    const handleNavigation = (placeType) => {
        navigation.navigate("AboutOwner", { placeType });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.box} onPress={() => handleNavigation("Hostel")}>
                <Text style={styles.boxText}>Hostel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box} onPress={() => handleNavigation("Apartment")}>
                <Text style={styles.boxText}>Apartment</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.box} onPress={() => handleNavigation("To-lets")}>
                <Text style={styles.boxText}>To-lets</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box} onPress={() => handleNavigation("Hotel")}>
                <Text style={styles.boxText}>Hotel</Text>
            </TouchableOpacity> */}
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
