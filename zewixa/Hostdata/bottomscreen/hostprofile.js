import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";

const Hostprofile = ({navigation , setIsHost}) => {

    return(
        <View>
            <Text>This is Host Page</Text>
            <Button
            mode="contained"
            onPress={()=> setIsHost(true)}
            >Switch to Visitor</Button>
        </View>
    )
}

export default Hostprofile;