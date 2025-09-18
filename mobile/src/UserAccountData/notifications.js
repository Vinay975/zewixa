import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Notifications = () => {
  const [general, setGeneral] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [promotions, setPromotions] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notification Settings</Text>

      <View style={styles.optionRow}>
        <Ionicons name="notifications-outline" size={22} color="#6846bd" />
        <Text style={styles.optionText}>General Notifications</Text>
        <Switch
          value={general}
          onValueChange={setGeneral}
          trackColor={{ false: "#ccc", true: "#6846bd" }}
          thumbColor="#fff"
        />
      </View>

      <View style={styles.optionRow}>
        <Ionicons name="calendar-outline" size={22} color="#6846bd" />
        <Text style={styles.optionText}>Reminders</Text>
        <Switch
          value={reminders}
          onValueChange={setReminders}
          trackColor={{ false: "#ccc", true: "#6846bd" }}
          thumbColor="#fff"
        />
      </View>

      <View style={styles.optionRow}>
        <Ionicons name="pricetags-outline" size={22} color="#6846bd" />
        <Text style={styles.optionText}>Promotions</Text>
        <Switch
          value={promotions}
          onValueChange={setPromotions}
          trackColor={{ false: "#ccc", true: "#6846bd" }}
          thumbColor="#fff"
        />
      </View>
    </View>
  );
};

export default Notifications;

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
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#555',
    marginLeft: 12,
  },
});
