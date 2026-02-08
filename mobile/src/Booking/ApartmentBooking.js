// screens/ApartmentBooking.js
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
import Ionicons from "react-native-vector-icons/Ionicons";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
// import DateTimePicker from "@react-native-community/datetimepicker";

const ApartmentBooking = () => {
  const [category, setCategory] = useState(""); // "already" | "new"
  const [details, setDetails] = useState({
    fullName: "",
    apartmentType: "",
    members: "",
    location: "",
    months: "",
    aadhaar: "",
    phone: "",
    photo: null,
  });
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleUploadPhoto = () => {
    const options = ["Camera", "Gallery", "Cancel"];
    const cancelButtonIndex = 2;

    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        { options, cancelButtonIndex },
        (buttonIndex) => {
          if (buttonIndex === 0) pickImage();
          if (buttonIndex === 1) pickGallery();
        }
      );
    } else {
      Alert.alert("Upload Photo", "Choose", [
        { text: "Camera", onPress: pickImage },
        { text: "Gallery", onPress: pickGallery },
        { text: "Cancel", style: "cancel" },
      ]);
    }
  };

  const pickImage = () => {
  launchCamera({ mediaType: "photo", quality: 0.5 }, (res) => {
    if (res.didCancel) return;
    if (res.errorCode) {
      Alert.alert("Camera Error", res.errorMessage || "Error");
      return;
    }

    if (!res.assets || res.assets.length === 0) return;

    setDetails(prev => ({
      ...prev,
      photo: res.assets[0].uri,
    }));
  });
};

const pickGallery = () => {
  launchImageLibrary({ mediaType: "photo", quality: 0.5 }, (res) => {
    if (res.didCancel) return;
    if (res.errorCode) {
      Alert.alert("Gallery Error", res.errorMessage || "Error");
      return;
    }

    if (!res.assets || res.assets.length === 0) return;

    setDetails(prev => ({
      ...prev,
      photo: res.assets[0].uri,
    }));
  });
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
        ? `Existing Tenant\nMove-in Date: ${date.toDateString()}`
        : `New Tenant\nPayment Required\nMove-in Date: ${date.toDateString()}`
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Category Selection */}
      <View style={styles.card}>
        <Text style={styles.question}>Are you already living in this apartment?</Text>
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
            <Text
              style={[styles.optionText, category === "already" && { color: "#fff" }]}
            >
              Existing Tenant
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
            <Text
              style={[styles.optionText, category === "new" && { color: "#fff" }]}
            >
              New Tenant
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
          placeholder="Apartment Type (1BHK, 2BHK, etc.)"
          value={details.apartmentType}
          onChangeText={(t) => setDetails({ ...details, apartmentType: t })}
        />
        <TextInput
          style={styles.input}
          placeholder="No. of Family Members"
          keyboardType="numeric"
          value={details.members}
          onChangeText={(t) => setDetails({ ...details, members: t })}
        />
        <TextInput
          style={styles.input}
          placeholder="Preferred Location"
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
            placeholder="Lease Duration (Months)"
            keyboardType="numeric"
            value={details.months}
            onChangeText={(t) => setDetails({ ...details, months: t })}
          />
        )}

        {/* Date Picker */}
        {/* <TouchableOpacity
          style={styles.dateBtn}
          onPress={() => setShowDatePicker(true)}
        >
          <Ionicons name="calendar" size={20} color="#6846bd" />
          <Text style={styles.dateText}>{date.toDateString()}</Text>
        </TouchableOpacity> */}

        {/* {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )} */}

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>
            {category === "already" ? "Confirm Stay" : "Confirm Booking"}
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
          <Text style={styles.infoText}>Apartment Type: {details.apartmentType}</Text>
          <Text style={styles.infoText}>Family Members: {details.members}</Text>
          <Text style={styles.infoText}>Location: {details.location}</Text>
          <Text style={styles.infoText}>Phone: {details.phone}</Text>
          <Text style={styles.infoText}>Aadhaar: {details.aadhaar}</Text>
          {category === "new" && (
            <Text style={styles.infoText}>Lease Duration: {details.months} months</Text>
          )}
          <Text style={styles.infoText}>Move-in Date: {date.toDateString()}</Text>
          <Text style={styles.infoText}>
            {category === "already" ? "Existing Tenant" : "Payment Required"}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default ApartmentBooking;

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
