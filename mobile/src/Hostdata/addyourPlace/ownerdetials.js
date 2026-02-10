import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView, StatusBar, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

const AboutOwner = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { placeType } = route.params;

    const [name, setName] = useState("");
    const [mobile1, setMobile1] = useState("");
    const [mobile2, setMobile2] = useState("");
    const [email, setEmail] = useState("");
    const [profileImage, setProfileImage] = useState(null);

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

        if (placeType === "Hostel") {
            navigation.navigate("AboutHostel", { ownerData });
        } else if (placeType === "Apartment") {
            navigation.navigate("AboutApartment", { ownerData });
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={0}
        >



            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Profile Image Section */}
                <View style={styles.imageSection}>
                    <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                        {profileImage ? (
                            <Image source={{ uri: profileImage }} style={styles.profileImage} />
                        ) : (
                            <View style={styles.imagePlaceholder}>
                                <Ionicons name="camera" size={32} color="#6846bd" />
                            </View>
                        )}
                        <View style={styles.cameraButton}>
                            <Ionicons name="camera" size={18} color="#fff" />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.imageLabel}>Upload Profile Photo</Text>
                </View>

                {/* Form Section */}
                <View style={styles.formSection}>
                    {/* Name Input */}
                    <View style={styles.inputContainer}>
                        <View style={styles.inputIconBox}>
                            <Ionicons name="person-outline" size={20} color="#6846bd" />
                        </View>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLabel}>Full Name *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your full name"
                                placeholderTextColor="#9CA3AF"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>
                    </View>

                    {/* Mobile 1 Input */}
                    <View style={styles.inputContainer}>
                        <View style={styles.inputIconBox}>
                            <Ionicons name="call-outline" size={20} color="#6846bd" />
                        </View>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLabel}>Mobile Number 1 *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter 10 digit mobile number"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="numeric"
                                maxLength={10}
                                value={mobile1}
                                onChangeText={setMobile1}
                            />
                        </View>
                    </View>

                    {/* Mobile 2 Input */}
                    <View style={styles.inputContainer}>
                        <View style={styles.inputIconBox}>
                            <Ionicons name="call-outline" size={20} color="#6846bd" />
                        </View>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLabel}>Mobile Number 2 (Optional)</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter alternate mobile number"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="numeric"
                                maxLength={10}
                                value={mobile2}
                                onChangeText={setMobile2}
                            />
                        </View>
                    </View>

                    {/* Email Input */}
                    <View style={styles.inputContainer}>
                        <View style={styles.inputIconBox}>
                            <Ionicons name="mail-outline" size={20} color="#6846bd" />
                        </View>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLabel}>Email Address *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your email"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>
                    </View>
                </View>

                {/* Submit Button */}
                <TouchableOpacity style={styles.submitButton} onPress={handleNextNavigation}>
                    <Text style={styles.submitButtonText}>Continue</Text>
                    <Ionicons name="arrow-forward" size={20} color="#fff" />
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F9FA",
    },

    scrollView: {
        flex: 1,
    },
    imageSection: {
        alignItems: "center",
        paddingVertical: 32,
        backgroundColor: "#fff",
        marginBottom: 20,
    },
    imagePicker: {
        position: "relative",
        marginBottom: 12,
    },
    imagePlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#E8E3F3",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#fff",
        borderStyle: "dashed",
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: "#fff",
    },
    cameraButton: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#6846bd",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: "#fff",
        elevation: 4,
    },
    imageLabel: {
        fontSize: 14,
        color: "#636E72",
        fontWeight: "600",
    },
    formSection: {
        paddingHorizontal: 16,
        gap: 16,
    },
    inputContainer: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
    },
    inputIconBox: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#E8E3F3",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    inputWrapper: {
        flex: 1,
    },
    inputLabel: {
        fontSize: 12,
        color: "#636E72",
        fontWeight: "600",
        marginBottom: 6,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    input: {
        fontSize: 16,
        color: "#2D3436",
        fontWeight: "600",
        padding: 0,
    },
    submitButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#6846bd",
        marginHorizontal: 16,
        marginVertical: 24,
        paddingVertical: 18,
        borderRadius: 16,
        gap: 10,
        elevation: 4,
        shadowColor: "#6846bd",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
    },
    submitButtonText: {
        fontSize: 18,
        fontWeight: "800",
        color: "#fff",
        letterSpacing: 0.5,
    },
});

export default AboutOwner;
