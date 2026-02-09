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
      {/* ✅ CUSTOM HEADER */}
      <View style={styles.header}>
        <Ionicons name="business" size={46} color="#6846bd" />
        <Text style={styles.brandText}>Habita</Text>
        <Text style={styles.tagline}>Your Property, Your Income</Text>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <Text style={styles.title}>Become a Host</Text>
        <Text style={styles.subtitle}>
          List your hostel or apartment and connect with tenants easily.
        </Text>

        {/* CTA */}
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.9}
            onPress={handleStartHosting}
          >
            <Ionicons name="add-circle" size={24} color="#fff" />
            <Text style={styles.buttonText}>List Your Property</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* VIDEO */}
        <TouchableOpacity
          style={styles.videoButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="play-circle" size={24} color="#6846bd" />
          <Text style={styles.videoText}>Watch Tutorial</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Choose Language</Text>

            {["Telugu", "Hindi", "English"].map((lang) => (
              <TouchableOpacity
                key={lang}
                style={styles.langOption}
                onPress={() => openVideo(lang)}
              >
                <Text style={styles.langText}>{lang}</Text>
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

  header: {
    backgroundColor: "#FFFFFF",
    paddingTop: 12,
    paddingBottom: 24,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 4,
  },

  brandText: {
    fontSize: 32,
    fontWeight: "800",
    color: "#6846bd",
    marginTop: 8,
  },

  tagline: {
    fontSize: 15,
    color: "#6B7280",
  },

  content: {
    flex: 1,
    padding: 24,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 40,
  },

  button: {
    flexDirection: "row",
    backgroundColor: "#6846bd",
    padding: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
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
    marginTop: 20,
    gap: 6,
  },

  videoText: {
    color: "#6846bd",
    fontSize: 16,
    fontWeight: "600",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 16,
    padding: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },

  langOption: {
    padding: 14,
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    marginBottom: 10,
  },

  langText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },

  closeBtn: {
    marginTop: 10,
    padding: 12,
    alignItems: "center",
  },

  closeBtnText: {
    color: "#6846bd",
    fontWeight: "700",
  },
});
