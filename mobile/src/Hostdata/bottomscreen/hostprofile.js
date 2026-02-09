import React, { useState, useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { launchImageLibrary } from "react-native-image-picker";
import { AuthContext } from "../../userDetails/userAuth";

const HostProfile = ({ navigation, setIsHost }) => {
  const [isVisitor, setIsVisitor] = useState(false);
  const [hostImage, setHostImage] = useState("please select image");

  const { hostInfo, signOutHost } = useContext(AuthContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleToggleSwitch = () => {
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
        } else if (response.assets && response.assets.length > 0) {
          setHostImage(response.assets[0].uri);
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Host Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={
              hostInfo ? signOutHost : () => navigation.navigate("HostSignIn")
            }
            activeOpacity={0.8}
          >
            <Ionicons name={hostInfo ? "log-out" : "log-in"} size={20} color="#FF4757" />
          </TouchableOpacity>

          <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
            {hostImage === "please select image" ? (
              <View style={styles.initialCircle}>
                <Text style={styles.initialText}>
                  {hostInfo?.username?.charAt(0)?.toUpperCase() || "H"}
                </Text>
                <View style={styles.editBadge}>
                  <Ionicons name="camera" size={16} color="#FFFFFF" />
                </View>
              </View>
            ) : (
              <View style={styles.imageContainer}>
                <Image source={{ uri: hostImage }} style={styles.profileImage} />
                <View style={styles.editBadge}>
                  <Ionicons name="camera" size={16} color="#FFFFFF" />
                </View>
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.profileDetails}>
            <Text style={styles.name}>{hostInfo?.username || "Guest"}</Text>
            <View style={styles.roleBadge}>
              <Ionicons name="shield-checkmark" size={14} color="#6846bd" />
              <Text style={styles.roleText}>
                {hostInfo?.email ? "Host" : isVisitor ? "Visitor" : "Host"}
              </Text>
            </View>
            {hostInfo?.email && (
              <Text style={styles.email}>{hostInfo.email}</Text>
            )}
          </View>
        </View>

        {/* Options Section */}
        {hostInfo && (
          <View style={styles.optionsCard}>
            <TouchableOpacity
              style={styles.optionRow}
              onPress={() => navigation.navigate("EditPlace")}
              activeOpacity={0.7}
            >
              <View style={styles.optionIconCircle}>
                <Ionicons name="create" size={22} color="#6846bd" />
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>Manage Properties</Text>
                <Text style={styles.optionSubtitle}>Edit or update your listings</Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Fixed Switch Button */}
      <View style={styles.fixedSwitch}>
        <TouchableOpacity onPress={handleToggleSwitch} activeOpacity={0.9}>
          <View style={styles.switchButton}>
            <Ionicons name="swap-horizontal" size={24} color="white" />
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
    backgroundColor: "#F9FAFB",
  },
  header: {
   paddingTop: 36,
    paddingBottom: 20,
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#1F2937",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  profileCard: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    padding: 30,
    borderRadius: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  logoutBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    padding: 8,
  },
  imageContainer: {
    position: "relative",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#6846bd",
  },
  initialCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#6846bd",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  initialText: {
    fontSize: 48,
    color: "white",
    fontWeight: "700",
  },
  editBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#6846bd",
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  profileDetails: {
    alignItems: "center",
    marginTop: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
  },
  roleBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F0FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
    marginBottom: 8,
  },
  roleText: {
    fontSize: 12,
    color: "#6846bd",
    fontWeight: "600",
  },
  email: {
    fontSize: 14,
    color: "#6B7280",
  },
  optionsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  optionIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F3F0FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 13,
    color: "#6B7280",
  },
  fixedSwitch: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  switchButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    elevation: 4,
    backgroundColor: "#6846bd",
    shadowColor: "#6846bd",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    gap: 10,
  },
  switchText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
