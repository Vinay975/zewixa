import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";

const FinalSubmit = () => {
    const navigation = useNavigation();
    return (
        <View>
            <Text>Final Submit</Text>
            <Button
                title="Home"
                onPress={() => navigation.navigate("Home")}
            />
        </View>

    );
}

export default FinalSubmit;