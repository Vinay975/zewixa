import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../../userDetails/userAuth";

const HostProfile = ({ navigation, setIsHost }) => {
  const [isVisitor, setIsVisitor] = useState(false);
  const animatedValue = new Animated.Value(isVisitor ? 1 : 0);
  const [hostImage, setHostImage] = useState("please select image");

  const { hostInfo, signOutHost } = useContext(AuthContext);

  const handleToggleSwitch = () => {
    Animated.timing(animatedValue, {
      toValue: isVisitor ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setIsVisitor(!isVisitor);
    setIsHost(!isVisitor);
  };

  const pickImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setHostImage(result.assets[0].uri);
    }
  };

  const switchBackgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#6846bd", "#34a853"],
  });

  const switchIcon = isVisitor ? "account" : "home-city";
  const switchText = isVisitor ? "Visitor Mode" : "Switch to User Mode";

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <TouchableOpacity
          style={styles.logout}
          onPress={
            hostInfo ? signOutHost : () => navigation.navigate("HostSignIn")
          }
        >
          <Icon name={hostInfo ? "logout" : "login"} size={18} color="#fff" />
          <Text style={styles.logoutText}>
            {hostInfo ? "Logout" : "Login"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={pickImage}>
          {hostImage === "please select image" ? (
            <View style={styles.initialCircle}>
              <Text style={styles.initialText}>
                {hostInfo?.username?.charAt(0)?.toUpperCase() || "H"}
              </Text>
            </View>
          ) : (
            <Image source={{ uri: hostImage }} style={styles.profileImage} />
          )}
        </TouchableOpacity>

        <View style={styles.profileDetails}>

          <Text style={styles.name}>Welcome {hostInfo?.username || "Guest"}</Text>
          <Text style={styles.email}>
            {hostInfo?.email ? `${hostInfo.email}` : isVisitor ? "Visitor" : "Host"}
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={handleToggleSwitch} style={styles.switchContainer}>
        <Animated.View
          style={[
            styles.switchButton,
            { backgroundColor: switchBackgroundColor },
          ]}
        >
          <Icon name={switchIcon} size={24} color="white" />
          <Text style={styles.switchText}>{switchText}</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default HostProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profileCard: {
    position: "relative",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 30,
    alignItems: "center",
    flexDirection: "column",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#6846bd",
    marginBottom: 15, 
  },

  logoutText: {
    color: "#fff",
    marginLeft: 6,
    fontSize: 13,
  },
  // profileImage: {
  //   width: 100,
  //   height: 100,
  //   borderRadius: 50,
  //   borderWidth: 3,
  //   borderColor: "#f5f4f7c3",
  // },
  profileDetails: {
    alignItems: "center", // Center text
  },
  welcome: {
    fontSize: 18,
    color: "#777",
    marginBottom: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 15,
    color: "#666",
    marginTop: 6,
  },
  logout: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#6846bd",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 10,
  },
  switchContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  switchButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 3,
  },
  switchText: {
    color: "#ffffff",
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "500",
  },
  initialCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#6846bd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  initialText: {
    fontSize: 42,
    color: "white",
    fontWeight: "bold",
  },

});
