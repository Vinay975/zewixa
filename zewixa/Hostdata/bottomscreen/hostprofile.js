import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const HostProfile = ({ navigation, setIsHost }) => {
  const [isVisitor, setIsVisitor] = useState(false);
  const animatedValue = new Animated.Value(isVisitor ? 1 : 0);

  const handleToggleSwitch = () => {
    Animated.timing(animatedValue, {
      toValue: isVisitor ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setIsVisitor(!isVisitor);
    setIsHost(!isVisitor);
  };

  const switchBackgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#6846bd", "#34a853"], // Purple (Host) → Green (Visitor)
  });

  const switchIcon = isVisitor ? "account" : "home-city";
  const switchText = isVisitor ? "Visitor Mode" : "Host Mode";

  return (
    <View style={styles.container}>
      {/* Profile Card */}
      <View style={styles.profileCard}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=4" }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Welcome Guest</Text>
        <Text style={styles.role}>{isVisitor ? "🚶 Visitor" : "🏠 Host"}</Text>
      </View>

      {/* Host Information */}
      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <Icon name="map-marker" size={24} color="#6846bd" />
          <Text style={styles.infoText}>New York, USA</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="office-building" size={24} color="#6846bd" />
          <Text style={styles.infoText}>Luxury Apartment</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="star" size={24} color="#ffcc00" />
          <Text style={styles.infoText}>4.8 Rating</Text>
        </View>
      </View>

      {/* Switch Button */}
      <TouchableOpacity onPress={handleToggleSwitch} style={styles.switchContainer}>
        <Animated.View style={[styles.switchButton, { backgroundColor: switchBackgroundColor }]}>
          <Icon name={switchIcon} size={24} color="white" />
          <Text style={styles.switchText}>{switchText}</Text>
        </Animated.View>
      </TouchableOpacity>

      {/* Sign In and Sign Up Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          icon="login"
          style={styles.button}
          onPress={() => navigation.navigate("HostSignIn")}
        >
          Sign In
        </Button>
        <Button
          mode="contained"
          icon="account-plus"
          style={styles.button}
          onPress={() => navigation.navigate("HostSignUp")}
        >
          Sign Up
        </Button>
      </View>
    </View>
  );
};

export default HostProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    padding: 20,
  },
  profileCard: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
    width: "100%",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  role: {
    fontSize: 16,
    color: "#6846bd",
    fontWeight: "600",
    marginTop: 5,
  },
  infoSection: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
  switchContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  switchButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    width: "60%",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  switchText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#6846bd",
  },
});
