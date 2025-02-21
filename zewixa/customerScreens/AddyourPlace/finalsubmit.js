import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const FinalSubmit = () => {
    const navigator = useNavigation();
    
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                FinalSubmit
            </Text>
            <Button
                textColor="#fff"
                mode="contained"
                onPress={() => navigator.navigate("Home")}
            >
                Go To Home
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        marginBottom: 20,
    },
});

export default FinalSubmit;
