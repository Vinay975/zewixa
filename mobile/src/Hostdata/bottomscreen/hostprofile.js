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
      <StatusBar backgroundColor="#6846bd" barStyle="light-content" />
      
      {/* Unique Header with Profile */}
      <View style={styles.headerContainer}>
        <View style={styles.headerBackground}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Welcome Back</Text>
              <Text style={styles.headerTitle}>{hostInfo?.username || "Guest"}</Text>
            </View>
            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={
                hostInfo ? signOutHost : () => navigation.navigate("HostSignIn")
              }
              activeOpacity={0.8}
            >
              <Ionicons name={hostInfo ? "log-out-outline" : "log-in-outline"} size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Card Overlapping Header */}
        <View style={styles.profileCardOverlay}>
          <TouchableOpacity onPress={pickImage} activeOpacity={0.8} style={styles.profileImageWrapper}>
            {hostImage === "please select image" ? (
              <View style={styles.initialCircle}>
                <Text style={styles.initialText}>
                  {hostInfo?.username?.charAt(0)?.toUpperCase() || "H"}
                </Text>
                <View style={styles.editBadge}>
                  <Ionicons name="camera" size={14} color="#FFFFFF" />
                </View>
              </View>
            ) : (
              <View style={styles.imageContainer}>
                <Image source={{ uri: hostImage }} style={styles.profileImage} />
                <View style={styles.editBadge}>
                  <Ionicons name="camera" size={14} color="#FFFFFF" />
                </View>
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.profileInfo}>
            <View style={styles.roleBadge}>
              <Ionicons name="shield-checkmark" size={12} color="#6846bd" />
              <Text style={styles.roleText}>
                {hostInfo?.email ? "Host" : isVisitor ? "Visitor" : "Host"}
              </Text>
            </View>
            {hostInfo?.email && (
              <Text style={styles.email}>{hostInfo.email}</Text>
            )}
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Stats Cards */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={styles.statIconBox}>
              <Ionicons name="home" size={20} color="#6846bd" />
            </View>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Properties</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIconBox}>
              <Ionicons name="people" size={20} color="#10B981" />
            </View>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Tenants</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIconBox}>
              <Ionicons name="cash" size={20} color="#F59E0B" />
            </View>
            <Text style={styles.statValue}>₹24K</Text>
            <Text style={styles.statLabel}>Revenue</Text>
          </View>
        </View>

        {/* Menu Options */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>ACCOUNT</Text>
          
          <View style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuIconBox}>
                <Ionicons name="person-outline" size={20} color="#6846bd" />
              </View>
              <Text style={styles.menuText}>Edit Profile</Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuIconBox}>
                <Ionicons name="notifications-outline" size={20} color="#6846bd" />
              </View>
              <Text style={styles.menuText}>Notifications</Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuIconBox}>
                <Ionicons name="lock-closed-outline" size={20} color="#6846bd" />
              </View>
              <Text style={styles.menuText}>Privacy & Security</Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>SUPPORT</Text>
          
          <View style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuIconBox}>
                <Ionicons name="help-circle-outline" size={20} color="#6846bd" />
              </View>
              <Text style={styles.menuText}>Help Center</Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuIconBox}>
                <Ionicons name="information-circle-outline" size={20} color="#6846bd" />
              </View>
              <Text style={styles.menuText}>About</Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Switch Button */}
      <View style={styles.fixedSwitch}>
        <TouchableOpacity onPress={handleToggleSwitch} activeOpacity={0.9}>
          <View style={styles.switchButton}>
            <Ionicons name="swap-horizontal" size={20} color="white" />
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
    backgroundColor: "#F8F9FA",
  },
  headerContainer: {
    marginBottom: 40,
  },
  headerBackground: {
    backgroundColor: "#6846bd",
    paddingTop: 50,
    paddingBottom: 80,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  greeting: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "500",
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
  },
  logoutBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  profileCardOverlay: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: -50,
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  profileImageWrapper: {
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  imageContainer: {
    position: "relative",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#6846bd",
  },
  initialCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#6846bd",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  initialText: {
    fontSize: 32,
    color: "white",
    fontWeight: "700",
  },
  editBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#6846bd",
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  profileDetails: {
    alignItems: "center",
    marginTop: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2D3436",
    marginBottom: 6,
  },
  roleBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8E3F3",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
    marginBottom: 4,
  },
  roleText: {
    fontSize: 11,
    color: "#6846bd",
    fontWeight: "600",
  },
  email: {
    fontSize: 13,
    color: "#636E72",
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  statIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8F9FA",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D3436",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: "#636E72",
    fontWeight: "500",
  },
  menuSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#636E72",
    letterSpacing: 1,
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  menuCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
  },
  menuIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F8F9FA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#2D3436",
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#F8F9FA",
    marginHorizontal: 14,
  },
  fixedSwitch: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
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
    gap: 8,
  },
  switchText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
