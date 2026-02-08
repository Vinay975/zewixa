import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { launchImageLibrary } from "react-native-image-picker";
import { AuthContext } from "../../userDetails/userAuth";

const HostProfile = ({ navigation, setIsHost }) => {
  const [isVisitor, setIsVisitor] = useState(false);
  const [hostImage, setHostImage] = useState("please select image");

  const { hostInfo, signOutHost } = useContext(AuthContext);

  const handleToggleSwitch = () => {
    // just toggle without animation
    setIsVisitor(!isVisitor);
    setIsHost(!isVisitor);
  };

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 1,
      },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.errorCode) {
          console.log("ImagePicker Error: ", response.errorMessage);
          Alert.alert("Error", response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          setHostImage(response.assets[0].uri);
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
              {hostInfo?.email ? hostInfo.email : isVisitor ? "Visitor" : "Host"}
            </Text>
          </View>
        </View>

        {hostInfo && (
          <View style={styles.section}>
            <TouchableOpacity
              style={styles.optionRow}
              onPress={() => navigation.navigate("EditPlace")}
            >
              <Icon name="home-edit" size={22} color="#6846bd" />
              <Text style={styles.optionText}>Edit / Update Your Place</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Fixed Switch Button */}
      <View style={styles.fixedSwitch}>
        <TouchableOpacity onPress={handleToggleSwitch}>
          <View style={styles.switchButton}>
            <Icon name="home-city" size={24} color="white" />
            <Text style={styles.switchText}>
              {isVisitor ? "Switch to Host Mode" : "Switch to User Mode"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HostProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 80, // so content is above fixed button
  },
  profileCard: {
    position: "relative",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 20,
    elevation: 5,
    marginBottom: 20,
    alignItems: "center",
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
  profileDetails: {
    alignItems: "center",
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
  },
  switchButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 3,
    backgroundColor: "#6846bd",
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
  section: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    fontSize: 15,
    marginLeft: 10,
    color: "#333",
  },
  fixedSwitch: {
    position: "absolute",
    bottom: 15,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});
