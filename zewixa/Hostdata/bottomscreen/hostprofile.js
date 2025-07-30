import React, { useState, useContext } from "react";
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
import { AuthContext } from "../../userDetails/userAuth";

const HostProfile = ({ navigation, setIsHost }) => {
  const [isVisitor, setIsVisitor] = useState(false);
  const animatedValue = new Animated.Value(isVisitor ? 1 : 0);

  const { hostInfo, signOutHost } = useContext(AuthContext);
  console.log("Host Info:", hostInfo);


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
    outputRange: ["#6846bd", "#34a853"],
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
        <Text style={styles.name}>
          {hostInfo ? hostInfo.username || "Host User" : "Welcome Guest"}
        </Text>
        <Text style={styles.role}>
          {hostInfo
            ? `📧 ${hostInfo.email || "No email"}`
            : isVisitor
            ? "🚶 Visitor"
            : "🏠 Host"}
        </Text>
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

      {/* Mode Switch */}
      <TouchableOpacity
        onPress={handleToggleSwitch}
        style={styles.switchContainer}
      >
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

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        {hostInfo ? (
          <Button
            mode="contained"
            icon="logout"
            style={styles.button}
            onPress={signOutHost}
          >
            Logout
          </Button>
        ) : (
          <>
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
          </>
        )}
      </View>
    </View>
  );
};

export default HostProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 16,
  },
  profileCard: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    elevation: 5,
    marginBottom: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  role: {
    fontSize: 16,
    color: "#888",
  },
  infoSection: {
    marginBottom: 24,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#444",
  },
  switchContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  switchButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 24,
    paddingHorizontal: 20,
  },
  switchText: {
    color: "white",
    fontSize: 16,
    marginLeft: 8,
  },
  buttonContainer: {
    marginTop: 10,
    gap: 12,
  },
  button: {
    marginVertical: 5,
    borderRadius: 12,
    backgroundColor: "#6846bd",
  },
});
