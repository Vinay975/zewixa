import React from "react";
import { View, Text, StyleSheet,Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FinalsSubmit from "../stackscreen/final-submit";

const HostelDataTwo = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hostel Data two</Text>
            <Button
                title="Hostel Data Two"
                onPress={() => navigation.navigate("FinalsSubmit")}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 24,
        color: "#6846bd",
    },
});

export default HostelDataTwo;
