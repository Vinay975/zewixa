import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Security = ({ navigation }) => {
  const handleChangePassword = () => {
    Alert.alert("Change Password", "Redirecting to password change screen...");
    // navigation.navigate("ChangePassword");
  };

  const handleToggle2FA = () => {
    Alert.alert("2FA", "Two-factor authentication toggled.");
    // Logic to toggle 2FA
  };

  const handleAppLock = () => {
    Alert.alert("App Lock", "App lock settings opened.");
    // navigation.navigate("AppLockSettings");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Security Settings</Text>

      <TouchableOpacity style={styles.optionRow} onPress={handleChangePassword}>
        <Ionicons name="lock-closed-outline" size={22} color="#6846bd" />
        <Text style={styles.optionText}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionRow} onPress={handleToggle2FA}>
        <Ionicons name="shield-checkmark-outline" size={22} color="#6846bd" />
        <Text style={styles.optionText}>Two-Factor Authentication (2FA)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionRow} onPress={handleAppLock}>
        <Ionicons name="finger-print-outline" size={22} color="#6846bd" />
        <Text style={styles.optionText}>App Lock</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Security;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 12,
  },
});
