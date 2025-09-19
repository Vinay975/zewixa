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
} from "react-native";
import { AuthContext } from "../../userDetails/userAuth";
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Host = () => {
  const { hostInfo } = useContext(AuthContext);
  const navigation = useNavigation();

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [modalVisible, setModalVisible] = useState(false);
 

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

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
      <Text style={styles.title}>Become a Host</Text>
      <Text style={styles.subtitle}>
        List your hostel or apartment and connect with tenants easily.
      </Text>

      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handleStartHosting}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Host Your Property</Text>
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity
        style={styles.videoButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="play-circle" size={28} color="#6846bd" />
        <Text style={styles.videoText}>How to Fill Form?</Text>
      </TouchableOpacity>

      {/* 📽️ Modal for video language options */}
      <Modal transparent visible={modalVisible} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Watch Tutorial In</Text>
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
              onPress={() => setModalVisible(false)}
              style={styles.closeBtn}
            >
              <Text style={{ color: "#6846bd", fontWeight: "bold" }}>
                Cancel
              </Text>
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
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  videoButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  videoText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#6846bd",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#6846bd",
    paddingVertical: 16,
    paddingHorizontal: 25,
    borderRadius: 12,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#6846bd",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
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
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  langOption: {
    padding: 10,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  langText: {
    fontSize: 16,
    textAlign: "center",
    color: "#444",
  },
  closeBtn: {
    marginTop: 15,
  },
});
