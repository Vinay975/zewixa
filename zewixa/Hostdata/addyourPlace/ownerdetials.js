import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const AboutOwner = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { placeType } = route.params; // Retrieve placeType from navigation parameters

    // State for input fields
    const [name, setName] = useState("");
    const [mobile1, setMobile1] = useState("");
    const [mobile2, setMobile2] = useState("");
    const [email, setEmail] = useState("");
    const [profileImage, setProfileImage] = useState(null); // State for profile image

    // Function to pick an image from the gallery
    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission Denied", "You need to allow access to the gallery.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            setProfileImage(result.assets[0].uri);
        }
    };

    // Validation function
    const handleNextNavigation = () => {
        // if (!name.trim()) {
        //     Alert.alert("Validation Error", "Please enter your name.");
        //     return;
        // }
        // if (!/^\d{10}$/.test(mobile1)) {
        //     Alert.alert("Validation Error", "Mobile Number 1 must be exactly 10 digits.");
        //     return;
        // }
        // if (!/^\d{10}$/.test(mobile2)) {
        //     Alert.alert("Validation Error", "Mobile Number 2 must be exactly 10 digits.");
        //     return;
        // }
        // if (!/\S+@\S+\.\S+/.test(email)) {
        //     Alert.alert("Validation Error", "Please enter a valid email address.");
        //     return;
        // }

        // Navigate based on placeType
        if (placeType === "Hostel") {
            navigation.navigate("AboutHostel");
        } else if (placeType === "Apartment") {
            navigation.navigate("AboutApartment");
        } else if (placeType === "To-lets") {
            navigation.navigate("AboutToLets");
        } else if (placeType === "Hotel") {
            navigation.navigate("AboutHotel");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Fill the Form</Text>

            {/* Profile Image Section */}
            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                {profileImage ? (
                    <Image source={{ uri: profileImage }} style={styles.profileImage} />
                ) : (
                    <Text style={styles.imageText}>Tap to select profile photo</Text>
                )}
            </TouchableOpacity>

            {/* Input Fields */}
            <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Mobile Number 1"
                keyboardType="numeric"
                maxLength={10}
                value={mobile1}
                onChangeText={setMobile1}
            />
            <TextInput
                style={styles.input}
                placeholder="Mobile Number 2"
                keyboardType="numeric"
                maxLength={10}
                value={mobile2}
                onChangeText={setMobile2}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />

            {/* Submit Button */}
            <TouchableOpacity style={styles.button} onPress={handleNextNavigation}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AboutOwner;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
    },
    imagePicker: {
        width: 120,
        height: 120,
        backgroundColor: "#ddd",
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        borderWidth: 2,
        borderColor: "#ccc",
    },
    imageText: {
        fontSize: 12,
        color: "#555",
        textAlign: "center",
    },
    profileImage: {
        width: "100%",
        height: "100%",
        borderRadius: 60,
    },
    input: {
        width: "90%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginBottom: 15,
        backgroundColor: "#fff",
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 25,
        backgroundColor: "#6846bd",
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
    },
});
