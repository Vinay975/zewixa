import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from "react-native";
import { ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Profile = ({ navigation, setIsHost }) => {
  const handleLogout = () => {
    Alert.alert("Logout", "You have been logged out.");
  };


  const OptionRow = ({ title, onPress, iconName }) => (
    <TouchableOpacity style={styles.optionRow} onPress={onPress}>
      <View style={styles.rowContent}>
        <Ionicons name={iconName} size={22} color="#6846bd" style={styles.optionIcon} />
        <Text style={styles.optionText}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.imageContainer}>
          <Image 
            source={require("../assets/profile.jpeg")}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.userName}>Zewixa</Text>
          <Text style={styles.userEmail}>Zewixa@gmail.com</Text>
          <Text style={styles.userDetails}>Show Profile</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.placecontainer} onPress={() => setIsHost(false)}>
        <Text style={styles.sectionHeaderText}>Add Your Place</Text>
      </TouchableOpacity>

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
        <OptionRow 
          title="Logout" 
          onPress={handleLogout} 
          iconName="log-out-outline"
        />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>Support</Text>
      </View>
      <View style={styles.optionsContainer}>
        <OptionRow 
          title="Help Center" 
          onPress={() => navigation.navigate("HelpCenter")} 
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
    alignItems: "center",
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
  placecontainer:{
    width: 418,
    height:100,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  infoContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6846bd",
  },
  userEmail: {
    fontSize: 16,
    color: "#777",
    marginTop: 4,
  },
  userDetails: {
    fontSize: 14,
    color: "#999",
    marginTop: 6,
    textDecorationLine: "underline",
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
