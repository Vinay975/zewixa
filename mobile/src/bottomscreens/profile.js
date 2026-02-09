import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../userDetails/userAuth"; // adjust path as needed

const Profile = ({ navigation, setIsHost }) => {
  const { customerInfo: user, signOutCustomer } = useContext(AuthContext);
  const isLoggedIn = !!user;

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: signOutCustomer },
      ]
    );
  };

  const OptionRow = ({ title, onPress, iconName }) => (
    <TouchableOpacity style={styles.optionRow} onPress={onPress}>
      <View style={styles.rowContent}>
        <Ionicons
          name={iconName}
          size={22}
          color="#6846bd"
          style={styles.optionIcon}
        />
        <Text style={styles.optionText}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar hidden />
      <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.profileContent}>
          <View style={styles.avatarContainer}>
            <Image
              source={require("../assets/profile.jpeg")}
              style={styles.profileImage}
            />
          </View>
          <View style={styles.userInfo}>
            {isLoggedIn ? (
              <>
                <Text style={styles.userName}>{user.username}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
              </>
            ) : (
              <>
                <Text style={styles.userName}>Guest User</Text>
                <Text style={styles.userEmail}>Sign in to continue</Text>
              </>
            )}
          </View>
        </View>
        {!isLoggedIn ? (
          <TouchableOpacity
            onPress={() => navigation.navigate("SignIn")}
            style={styles.signInButton}
            activeOpacity={0.8}
          >
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleLogout}
            style={styles.logoutButton}
            activeOpacity={0.8}
          >
            <Ionicons name="log-out-outline" size={22} color="#FF4757" />
          </TouchableOpacity>
        )}
      </View>

      {/* Your Place Section */}
      <TouchableOpacity
        style={styles.placeCard}
        onPress={() => setIsHost(false)}
        activeOpacity={0.8}
      >
        <View style={styles.placeIconContainer}>
          <Ionicons name="business" size={28} color="#6846bd" />
        </View>
        <View style={styles.placeContent}>
          <Text style={styles.placeTitle}>Your Place</Text>
          <Text style={styles.placeSubtitle}>List and manage your properties</Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color="#9CA3AF" />
      </TouchableOpacity>


      {/* Account Options */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>Account</Text>
      </View>
      <View style={styles.optionsContainer}>
        <OptionRow
          title="Personal Information"
          onPress={() => navigation.navigate("PersonalInformation")}
          iconName="person-outline"
        />
        <OptionRow
          title="Security"
          onPress={() => navigation.navigate("Security")}
          iconName="lock-closed-outline"
        />
        <OptionRow
          title="Payments"
          onPress={() => navigation.navigate("Payments")}
          iconName="card-outline"
        />
        <OptionRow
          title="Notifications"
          onPress={() => navigation.navigate("Notifications")}
          iconName="notifications-outline"
        />

      </View>

      {/* Support Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>Support</Text>
      </View>
      <View style={styles.optionsContainer}>
        <OptionRow
          title="Help Center"
          onPress={() => navigation.navigate("HelpCentre")}
          iconName="help-circle-outline"
        />
        <OptionRow
          title="Contact Us"
          onPress={() => navigation.navigate("ContactUs")}
          iconName="call-outline"
        />
        <OptionRow
          title="Terms of Service"
          onPress={() => navigation.navigate("TermsOfService")}
          iconName="document-text-outline"
        />
        <OptionRow
          title="Privacy Policy"
          onPress={() => navigation.navigate("PrivacyPolicy")}
          iconName="document-outline"
        />
      </View>
    </ScrollView>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  profileHeader: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  profileContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatarContainer: {
    marginRight: 16,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: "#E5E7EB",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#6B7280",
  },
  signInButton: {
    backgroundColor: "#6846bd",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  signInText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  logoutButton: {
    padding: 8,
  },
  placeCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  placeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F3F0FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  placeContent: {
    flex: 1,
  },
  placeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 2,
  },
  placeSubtitle: {
    fontSize: 13,
    color: "#6B7280",
  },
  sectionHeader: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 8,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
  },
  optionsContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomColor: "#F3F4F6",
    borderBottomWidth: 1,
  },
  rowContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionIcon: {
    marginRight: 12,
  },
  optionText: {
    fontSize: 15,
    color: "#374151",
    fontWeight: "500",
  },
});
