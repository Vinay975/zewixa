import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";

const HostelDataTwo = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    meals: Array(7).fill({ tiffin: "", lunch: "", snacks: "", dinner: "" }),
    photos: {
      main: null,
      messRoom: null,
      topView: null,
      washroom: null,
    },
    wifi: "yes",
    rent: {
      OneSharing: "",
      TwoSharing: "",
      ThreeSharing: "",
      FourSharing: "",
      FiveSharing: "",
      Advance: "",
    },
  });

  const handleInputChange = (field, value, dayIndex = null, mealType = null) => {
    if (field === "meals") {
      const updatedMeals = formData.meals.map((meal, i) =>
        i === dayIndex ? { ...meal, [mealType]: value } : meal
      );
      setFormData((prev) => ({ ...prev, meals: updatedMeals }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const pickImage = async (photoType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData((prev) => ({
        ...prev,
        photos: { ...prev.photos, [photoType]: result.assets[0].uri },
      }));
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.title}>Hostel Data Two Form</Text> */}

      {/* Meal Schedule */}
      <Text style={styles.sectionTitle}>Meal Schedule</Text>
      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.dayText}>{day}</Text>
          {["tiffin", "lunch", "snacks", "dinner"].map((mealType) => (
            <TextInput
              key={mealType}
              style={styles.input}
              placeholder={mealType.charAt(0).toUpperCase() + mealType.slice(1)}
              value={formData.meals[index][mealType]}
              onChangeText={(value) => handleInputChange("meals", value, index, mealType)}
            />
          ))}
        </View>
      ))}

      {/* Photo Upload (2 per row) */}
      <Text style={styles.sectionTitle}></Text>
      {[
        ["main", "messRoom"],
        ["topView", "washroom"],
      ].map((pair, rowIndex) => (
        <View key={rowIndex} style={styles.photoRow}>
          {pair.map((photoType) => (
            <View key={photoType} style={styles.photoUpload}>
              <Text>{photoType.charAt(0).toUpperCase() + photoType.slice(1)}</Text>
              <Button title="Pick Image" onPress={() => pickImage(photoType)} />
              {formData.photos[photoType] && (
                <Image source={{ uri: formData.photos[photoType] }} style={styles.previewImage} />
              )}
            </View>
          ))}
        </View>
      ))}

      {/* WiFi */}
      <Text style={styles.sectionTitle}>WiFi</Text>
      <Picker
        selectedValue={formData.wifi}
        onValueChange={(value) => handleInputChange("wifi", value)}
        style={styles.picker}
      >
        <Picker.Item label="Yes" value="yes" />
        <Picker.Item label="No" value="no" />
      </Picker>

      {/* Rent Details (2 per row) */}
      {/* <Text style={styles.sectionTitle}>Rent Information</Text> */}
      {[
        ["OneSharing", "TwoSharing"],
        ["ThreeSharing", "FourSharing"],
        ["FiveSharing", "Advance"],
      ].map((pair, rowIndex) => (
        <View key={rowIndex} style={styles.rentRow}>
          {pair.map((key) => (
            <View key={key} style={styles.rentItem}>
              <Text style={styles.label}>{key.replace("Sharing", " Sharing")}</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Amount"
                keyboardType="numeric"
                value={formData.rent[key]}
                onChangeText={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    rent: { ...prev.rent, [key]: value },
                  }))
                }
              />
            </View>
          ))}
        </View>
      ))}

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("FinalSubmit")}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HostelDataTwo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#000",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 15,
    color: "#000",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  dayText: {
    width: 80,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  photoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  photoUpload: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  previewImage: {
    width: 100,
    height: 100,
    marginTop: 5,
    borderRadius: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
  },
  rentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  rentItem: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    marginBottom:40,
  },
  button: {
    width: 120, 
    paddingVertical: 12,
    backgroundColor: "#6846bd",
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});
