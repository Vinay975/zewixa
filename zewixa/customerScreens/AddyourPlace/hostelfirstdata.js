import React from "react";
import { View, Text, StyleSheet, } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import HostelSecondData from "./hostelseconddata";

const HostelFirstData = () => {
    const navigator = useNavigation();
    return (
        <View>
            <Text>
                Successfull
            </Text>
            <Button
            mode="contained"
            title="Next"
            onPress={()=>navigator.navigate(HostelSecondData)}
            
            />
        </View>
       
    )
}

export default HostelFirstData