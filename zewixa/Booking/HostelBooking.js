// screens/HostelBooking.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  ActionSheetIOS,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const HostelBooking = () => {
  const [category, setCategory] = useState(""); // "already" | "new"
  const [details, setDetails] = useState({
    fullName: "",
    type: "",
    age: "",
    location: "",
    months: "",
    aadhaar: "",
    phone: "",
    photo: null,
  });
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleUploadPhoto = async () => {
    const options = ["Camera", "Gallery", "Cancel"];
    const cancelButtonIndex = 2;

    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        { options, cancelButtonIndex },
        async (buttonIndex) => {
          if (buttonIndex === 0) await pickImage();
          if (buttonIndex === 1) await pickGallery();
        }
      );
    } else {
      // For Android, simple Alert with options
      Alert.alert("Upload Photo", "Choose", [
        { text: "Camera", onPress: pickImage },
        { text: "Gallery", onPress: pickGallery },
        { text: "Cancel", style: "cancel" },
      ]);
    }
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Camera permission is needed!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ quality: 0.5 });
    if (!result.canceled) {
      setDetails({ ...details, photo: result.assets[0].uri });
    }
  };

  const pickGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Gallery permission is needed!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.5 });
    if (!result.canceled) {
      setDetails({ ...details, photo: result.assets[0].uri });
    }
  };

  const handleSubmit = () => {
    if (!category || !details.fullName || !details.phone) {
      Alert.alert("Missing Info", "Please fill all required fields!");
      return;
    }
    setSubmitted(true);
    Alert.alert(
      "Booking Recorded",
      category === "already"
        ? `Old User\nStart Date: ${date.toDateString()}`
        : `New User\nPayment Required\nStart Date: ${date.toDateString()}`
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hostel Booking</Text>

      {/* Category Selection */}
      <View style={styles.card}>
        <Text style={styles.question}>Are you currently in this hostel?</Text>
        <View style={styles.optionRow}>
          <TouchableOpacity
            style={[styles.optionFull, category === "already" && styles.activeOption]}
            onPress={() => setCategory("already")}
          >
            <Ionicons
              name="home"
              size={24}
              color={category === "already" ? "#fff" : "#6846bd"}
            />
            <Text style={[styles.optionText, category === "already" && { color: "#fff" }]}>
              Already in Hostel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionFull, category === "new" && styles.activeOption]}
            onPress={() => setCategory("new")}
          >
            <Ionicons
              name="person-add"
              size={24}
              color={category === "new" ? "#fff" : "#6846bd"}
            />
            <Text style={[styles.optionText, category === "new" && { color: "#fff" }]}>
              New to Hostel
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* User Details */}
      <View style={styles.card}>
        <Text style={styles.question}>Your Details</Text>

        {/* Upload Photo */}
        <TouchableOpacity style={styles.photoCircle} onPress={handleUploadPhoto}>
          {details.photo ? (
            <Image source={{ uri: details.photo }} style={styles.userPhoto} />
          ) : (
            <Ionicons name="camera" size={40} color="#6846bd" />
          )}
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={details.fullName}
          onChangeText={(t) => setDetails({ ...details, fullName: t })}
        />
        <TextInput
          style={styles.input}
          placeholder="Type (Student, Bachelor, Other)"
          value={details.type}
          onChangeText={(t) => setDetails({ ...details, type: t })}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          keyboardType="numeric"
          value={details.age}
          onChangeText={(t) => setDetails({ ...details, age: t })}
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={details.location}
          onChangeText={(t) => setDetails({ ...details, location: t })}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="numeric"
          value={details.phone}
          onChangeText={(t) => setDetails({ ...details, phone: t })}
        />
        <TextInput
          style={styles.input}
          placeholder="Aadhaar Number"
          keyboardType="numeric"
          value={details.aadhaar}
          onChangeText={(t) => setDetails({ ...details, aadhaar: t })}
        />
        {category === "new" && (
          <TextInput
            style={styles.input}
            placeholder="No. of Months to Stay"
            keyboardType="numeric"
            value={details.months}
            onChangeText={(t) => setDetails({ ...details, months: t })}
          />
        )}

        {/* Date Picker */}
        <TouchableOpacity
          style={styles.dateBtn}
          onPress={() => setShowDatePicker(true)}
        >
          <Ionicons name="calendar" size={20} color="#6846bd" />
          <Text style={styles.dateText}>{date.toDateString()}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>
            {category === "already" ? "I'm in Hostel" : "Confirm Booking"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Display Submitted Data */}
      {submitted && (
        <View style={styles.card}>
          <Text style={styles.subTitle}>Submitted Data</Text>
          {details.photo && (
            <Image source={{ uri: details.photo }} style={styles.userPhoto} />
          )}
          <Text style={styles.infoText}>Name: {details.fullName}</Text>
          <Text style={styles.infoText}>Type: {details.type}</Text>
          <Text style={styles.infoText}>Age: {details.age}</Text>
          <Text style={styles.infoText}>Location: {details.location}</Text>
          <Text style={styles.infoText}>Phone: {details.phone}</Text>
          <Text style={styles.infoText}>Aadhaar: {details.aadhaar}</Text>
          {category === "new" && <Text style={styles.infoText}>Months: {details.months}</Text>}
          <Text style={styles.infoText}>Start Date: {date.toDateString()}</Text>
          <Text style={styles.infoText}>
            {category === "already" ? "Old User" : "Payment Required"}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default HostelBooking;

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 12, backgroundColor: "#f2f2f2" },
  title: { fontSize: 24, fontWeight: "bold", color: "#6846bd", textAlign: "center", marginBottom: 12 },
  card: { backgroundColor: "#fff", padding: 16, borderRadius: 12, marginBottom: 16, elevation: 3 },
  question: { fontSize: 18, fontWeight: "600", marginBottom: 12, color: "#333" },
  optionRow: { flexDirection: "row", justifyContent: "space-between" },
  optionFull: { flex: 1, padding: 20, borderWidth: 1, borderColor: "#6846bd", borderRadius: 12, flexDirection: "row", alignItems: "center", justifyContent: "center", marginHorizontal: 5 },
  activeOption: { backgroundColor: "#6846bd" },
  optionText: { marginLeft: 8, color: "#6846bd", fontWeight: "600", fontSize: 16 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 10, marginBottom: 12, fontSize: 16 },
  photoCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: "#eee", justifyContent: "center", alignItems: "center", alignSelf: "center", marginBottom: 12 },
  userPhoto: { width: 100, height: 100, borderRadius: 50, resizeMode: "cover" },
  dateBtn: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#6846bd", padding: 12, borderRadius: 10, marginBottom: 12 },
  dateText: { marginLeft: 10, fontSize: 16, color: "#333" },
  submitBtn: { backgroundColor: "#6846bd", padding: 14, borderRadius: 10, alignItems: "center", marginTop: 12 },
  submitText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  subTitle: { fontSize: 18, fontWeight: "600", marginBottom: 10, textAlign: "center", color: "#6846bd" },
  infoText: { fontSize: 16, marginBottom: 4 },
});
