import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../userDetails/userAuth"; // adjust path as needed

const Profile = ({ navigation, setIsHost }) => {
  const { userInfo: user, signOut } = useContext(AuthContext);
  const isLoggedIn = !!user;

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: signOut },
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
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/profile.jpeg")}
            style={styles.profileImage}
          />
        </View>

        <View style={styles.infoContainer}>
          {/* Top right login/logout container */}
          <View style={styles.topRightContainer}>
            {!isLoggedIn ? (
              <TouchableOpacity
                onPress={() => navigation.navigate("SignIn")}
                style={styles.signInButton}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="log-in-outline"
                  size={26}
                  color="#6846bd"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.signInText}>Sign In</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.logoutButton}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="log-out-outline"
                  size={28}
                  color="#6846bd"
                  style={{ fontWeight: "bold" }}
                />
              </TouchableOpacity>
            )}
          </View>
          {/* User info displayed below top-right */}
          {isLoggedIn ? (
            <>
              <Text style={styles.helloText}>Hello, Mr.</Text>
              <Text style={styles.userName}>{user.username}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </>
          ) : (
            <>
              <Text style={styles.helloText}>Hello,</Text>
              <Text style={styles.userName}>Guest</Text>
            </>
          )}
        </View>
      </View>

      {/* Add Your Place Section */}
      <TouchableOpacity
        style={styles.placecontainer}
        onPress={() => setIsHost(false)}
      >
        <Text style={styles.sectionHeaderText}>Add Your Place</Text>
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
          onPress={() => navigation.navigate("Settings")}
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
        <OptionRow
          title="Privacy"
          onPress={() => navigation.navigate("Privacy")}
          iconName="shield-checkmark-outline"
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
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
  },
  profileHeader: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "flex-start", // align top
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  imageContainer: {
    marginRight: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  infoContainer: {
    flex: 1,
    position: "relative",
  },
  topRightContainer: {
  position: "absolute",
  right: 10,
  top: 10,
  flexDirection: "row",
  alignItems: "center",
  zIndex: 10,
},

signInButton: {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 8,
  paddingVertical: 4,
  backgroundColor: "#fff",
  borderRadius: 20,
  borderWidth: 1,
  borderColor: "#6846bd",
},

signInText: {
  color: "#6846bd",
  fontSize: 18,
  fontWeight: "600",
},

logoutButton: {
  paddingHorizontal: 8,
  paddingVertical: 4,
  backgroundColor: "#fff",
  borderRadius: 20,
  borderWidth: 1,
  borderColor: "#6846bd",
  justifyContent: "center",
  alignItems: "center",
},

  userName: {
    fontSize: 20,
    fontWeight: "bold",
    // color: "#6846bd",
    color: "#777",
    // marginTop: 26, 
  },
  userEmail: {
    fontSize: 16,
    color: "#777",
    marginTop: 4,
  },
  helloText: {
    fontSize: 18,
    color: "#777",
  },
  placecontainer: {
    width: "95%",
    height: 100,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignSelf: "center",
  },
  sectionHeader: {
    marginHorizontal: 10,
    marginTop: 15,
  },
  sectionHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  optionsContainer: {
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 10,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  rowContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionIcon: {
    marginRight: 15,
  },
  optionText: {
    fontSize: 18,
    color: "#333",
  },
});
