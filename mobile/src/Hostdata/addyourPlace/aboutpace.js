import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const AboutPlace = () => {
    const navigation = useNavigation();

    const hostelAnim = useRef(new Animated.Value(0)).current;
    const apartmentAnim = useRef(new Animated.Value(0)).current;

    // Page load animation
    useEffect(() => {
        Animated.spring(hostelAnim, { toValue: 1, useNativeDriver: true, friction: 6 }).start();
        Animated.spring(apartmentAnim, { toValue: 1, useNativeDriver: true, friction: 6, delay: 200 }).start();
    }, []);

    const handleNavigation = (placeType) => {
        navigation.navigate("AboutOwner", { placeType });
    };

    const animatePress = (animValue) => {
        Animated.sequence([
            Animated.timing(animValue, { toValue: 0.95, duration: 100, useNativeDriver: true }),
            Animated.timing(animValue, { toValue: 1, duration: 100, useNativeDriver: true })
        ]).start();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.welcome}>Welcome, Host!</Text>
                <Text style={styles.quote}>
                    "The best time to list your place is now — let guests experience it."
                </Text>
            </View>

            {/* Hostel Box */}
            <Animated.View style={{ transform: [{ scale: hostelAnim }] }}>
                <TouchableOpacity
                    style={[styles.box, { backgroundColor: "#f5f0ff" }]}
                    onPress={() => {
                        animatePress(hostelAnim);
                        handleNavigation("Hostel");
                    }}
                >
                    <Icon name="bed" size={40} color="#6846bd" />
                    <Text style={styles.boxTitle}>Hostel</Text>
                    <Text style={styles.boxDescription}>Perfect for budget-friendly travelers and students.</Text>
                </TouchableOpacity>
            </Animated.View>

            {/* Apartment Box */}
            <Animated.View style={{ transform: [{ scale: apartmentAnim }] }}>
                <TouchableOpacity
                    style={[styles.box, { backgroundColor: "#e8f7f0" }]}
                    onPress={() => {
                        animatePress(apartmentAnim);
                        handleNavigation("Apartment");
                    }}
                >
                    <Icon name="home-city" size={40} color="#34a853" />
                    <Text style={styles.boxTitle}>Apartment</Text>
                    <Text style={styles.boxDescription}>A comfortable stay for families and business guests.</Text>
                </TouchableOpacity>
            </Animated.View>

            {/* Instructions */}
            <View style={styles.instructions}>
                <Icon name="clipboard-text" size={22} color="#ff9800" />
                <View style={{ flex: 1, marginLeft: 8 }}>
                    <Text style={styles.instructionTitle}>Before You Continue</Text>
                    <Text style={styles.instructionText}>• Fill out all required fields carefully.</Text>
                    <Text style={styles.instructionText}>• Use accurate and updated information.</Text>
                    <Text style={styles.instructionText}>• Upload clear and real pictures of your place.</Text>
                    <Text style={styles.instructionText}>• Misleading information may lead to listing removal.</Text>
                </View>
            </View>

            {/* Customer Care */}
            <View style={styles.customerCare}>
                <Icon name="phone" size={20} color="#4caf50" />
                <Text style={styles.customerText}>Customer Care: +1 800 555 1234</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        marginBottom: 25,
        alignItems: "center",
    },
    welcome: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#333",
    },
    quote: {
        fontSize: 14,
        color: "#666",
        marginTop: 8,
        textAlign: "center",
        fontStyle: "italic",
    },
    box: {
        height: 150,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 15,
        marginVertical: 12,
        alignItems: "center",
        justifyContent: "center",
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        paddingHorizontal: 10,
    },
    boxTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginTop: 8,
    },
    boxDescription: {
        fontSize: 13,
        color: "#555",
        textAlign: "center",
        marginTop: 4,
    },
    instructions: {
        flexDirection: "row",
        backgroundColor: "#fff3e0",
        padding: 12,
        borderRadius: 10,
        marginTop: 20,
    },
    instructionTitle: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#ff9800",
        marginBottom: 4,
    },
    instructionText: {
        fontSize: 13,
        color: "#555",
    },
    customerCare: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        justifyContent: "center",
    },
    customerText: {
        fontSize: 14,
        marginLeft: 8,
        color: "#4caf50",
        fontWeight: "500",
    },
});

export default AboutPlace;
