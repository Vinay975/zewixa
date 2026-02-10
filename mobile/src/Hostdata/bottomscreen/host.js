import React, { useContext, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Animated,
  StyleSheet,
  Modal,
  Linking,
  StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../../userDetails/userAuth";
import { useNavigation } from "@react-navigation/native";

const Host = () => {
  const { hostInfo } = useContext(AuthContext);
  const navigation = useNavigation();

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [modalVisible, setModalVisible] = useState(false);

  const handleStartHosting = () => {
    if (hostInfo) {
      navigation.navigate("AboutPlace");
    } else {
      Alert.alert(
        "Login Required",
        "Please log in as a host to list your property.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Login", onPress: () => navigation.navigate("HostSignIn") },
        ]
      );
    }
  };

  const openVideo = (lang) => {
    const urls = {
      Telugu: "https://youtu.be/telugu-example",
      Hindi: "https://youtu.be/hindi-example",
      English: "https://youtu.be/english-example",
    };
    Linking.openURL(urls[lang]);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {/* CONTENT */}
      <View style={styles.content}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.iconContainer}>
            <Ionicons name="home" size={48} color="#6846bd" />
          </View>
          <Text style={styles.title}>Become a Host</Text>
          <Text style={styles.subtitle}>
            List your property and start earning today
          </Text>
        </View>

        {/* Benefits Cards */}
        <View style={styles.benefitsContainer}>
          <View style={styles.benefitCard}>
            <View style={styles.benefitIcon}>
              <Ionicons name="cash-outline" size={28} color="#6846bd" />
            </View>
            <Text style={styles.benefitTitle}>Earn Income</Text>
          </View>
          
          <View style={styles.benefitCard}>
            <View style={styles.benefitIcon}>
              <Ionicons name="people-outline" size={28} color="#6846bd" />
            </View>
            <Text style={styles.benefitTitle}>Find Tenants</Text>
          </View>
          
          <View style={styles.benefitCard}>
            <View style={styles.benefitIcon}>
              <Ionicons name="shield-checkmark-outline" size={28} color="#6846bd" />
            </View>
            <Text style={styles.benefitTitle}>Secure Platform</Text>
          </View>
        </View>

        {/* CTA Button */}
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.9}
          onPress={handleStartHosting}
        >
          <Ionicons name="add-circle" size={24} color="#fff" />
          <Text style={styles.buttonText}>List Your Property</Text>
        </TouchableOpacity>

        {/* Tutorial Link */}
        <TouchableOpacity
          style={styles.videoButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="play-circle-outline" size={22} color="#6846bd" />
          <Text style={styles.videoText}>Watch Tutorial</Text>
        </TouchableOpacity>

        {/* Workflow Icons */}
        <View style={styles.workflowContainer}>
          <View style={styles.workflowIcon}>
            <Ionicons name="create-outline" size={32} color="#6846bd" />
          </View>
          <Ionicons name="arrow-forward" size={24} color="#9CA3AF" />
          <View style={styles.workflowIcon}>
            <Ionicons name="people-outline" size={32} color="#6846bd" />
          </View>
          <Ionicons name="arrow-forward" size={24} color="#9CA3AF" />
          <View style={styles.workflowIcon}>
            <Ionicons name="wallet-outline" size={32} color="#6846bd" />
          </View>
          <Ionicons name="arrow-forward" size={24} color="#9CA3AF" />
          <View style={styles.workflowIcon}>
            <Ionicons name="checkmark-circle" size={32} color="#10B981" />
          </View>
        </View>
      </View>

      {/* MODAL */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Ionicons name="videocam" size={32} color="#6846bd" />
              <Text style={styles.modalTitle}>Choose Tutorial Language</Text>
            </View>

            {["Telugu", "Hindi", "English"].map((lang) => (
              <TouchableOpacity
                key={lang}
                style={styles.langOption}
                onPress={() => openVideo(lang)}
              >
                <Ionicons name="play" size={20} color="#6846bd" />
                <Text style={styles.langText}>{lang}</Text>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Host;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  headerSection: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 32,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F3F0FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
  },
  benefitsContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 32,
},

 benefitCard: {
  width: "30%",
  backgroundColor: "#FFFFFF",
  paddingVertical: 20,
  paddingHorizontal: 10,
  borderRadius: 16,
  alignItems: "center",

  elevation: 2,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 8,
},
benefitIcon: {
  width: 48,
  height: 48,
  borderRadius: 24,
  backgroundColor: "#F3F0FF",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 8,
},

 benefitTitle: {
  fontSize: 14,
  fontWeight: "700",
  color: "#1F2937",
  textAlign: "center",
},

  benefitText: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#6846bd",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    elevation: 4,
    shadowColor: "#6846bd",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  videoButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 32,
    paddingVertical: 12,
    gap: 8,
  },
  videoText: {
    color: "#6846bd",
    fontSize: 16,
    fontWeight: "600",
  },
  workflowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    gap: 12,
  },
  workflowIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F3F0FF",
    alignItems: "center",
    justifyContent: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    width: "85%",
    borderRadius: 20,
    padding: 24,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 12,
    color: "#1F2937",
  },
  langOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  langText: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "600",
  },
  closeBtn: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  closeBtnText: {
    color: "#6846bd",
    fontWeight: "700",
    fontSize: 16,
  },
});
