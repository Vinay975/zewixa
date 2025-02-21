import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import FinalSubmit from "./finalsubmit";

const HostelSecondData = () => {
    const navigator = useNavigation();
    return (
        <View>
            <Text>HostelSecondData</Text>
            <Button
            mode="contained"
            title="Submit"
            onPress={()=>navigator.navigate(FinalSubmit)}
            />
        </View>
    )
}

export default HostelSecondData;