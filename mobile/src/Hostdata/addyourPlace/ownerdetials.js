import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";


const AboutOwner = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { placeType } = route.params;

    // State for input fields
    const [name, setName] = useState("");
    const [mobile1, setMobile1] = useState("");
    const [mobile2, setMobile2] = useState("");
    const [email, setEmail] = useState("");
    const [profileImage, setProfileImage] = useState(null);

    // Function to pick an image from the gallery

    const pickImage = () => {
    launchImageLibrary(
        {
            mediaType: "photo",
            quality: 1,
        },
        (response) => {
            if (response.didCancel) {
                console.log("User cancelled image picker");
            } else if (response.errorCode) {
                console.log("ImagePicker Error: ", response.errorMessage);
                Alert.alert("Error", response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                setProfileImage(response.assets[0].uri);
            }
        }
    );
};

    // Validation function
    const handleNextNavigation = () => {
        if (!name || !mobile1 || !email) {
            Alert.alert("Error", "Please fill all required fields.");
            return;
        }


        if (mobile1.length !== 10 || isNaN(mobile1)) {
            Alert.alert("Invalid Mobile Number", "Mobile Number 1 must be exactly 10 digits.");
            return;
        }

        if (mobile2 && (mobile2.length !== 10 || isNaN(mobile2))) {
            Alert.alert("Invalid Mobile Number", "Mobile Number 2 must be exactly 10 digits if provided.");
            return;
        }
        const ownerData = {
            name,
            mobile1,
            mobile2,
            email,
            profileImage,
        };

        console.log("Navigating with Data:", ownerData); // Debugging log

        if (placeType === "Hostel") {
            navigation.navigate("AboutHostel", { ownerData });  // FIXED: Changed from "HostelDataOne" to "AboutHostel"
        } else if (placeType === "Apartment") {
            navigation.navigate("AboutApartment", { ownerData });
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

export default AboutOwner;