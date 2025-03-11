import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from "react-native";
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from "@react-navigation/native";

const Apartment = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    photos: Array(7).fill(null),
    furnishing: "",
    policy: "",
    security: "",
    rent: { "1BHK": "", "2BHK": "", "3BHK": "", "4BHK": "" },
    rentToPay: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (name, value) => {
    if (Object.keys(formData.rent).includes(name)) {
      setFormData((prevData) => ({
        ...prevData,
        rent: { ...prevData.rent, [name]: value },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (index) => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (!response.didCancel && response.assets) {
        const files = [...formData.photos];
        files[index] = response.assets[0].uri;
        setFormData((prevData) => ({ ...prevData, photos: files }));
      }
    });
  };

  const handleSubmit = () => {
    if (Object.values(formData).every((field) => field !== "" && field !== null)) {
      setIsFormValid(true);
      navigation.navigate("FinalSubmit");
    } else {
      Alert.alert("Error", "Please fill all fields");
    }
  };

  useEffect(() => {
    const isValidRent = Object.values(formData.rent).every((value) => value !== "");
    setIsFormValid(isValidRent && formData.rentToPay !== "");
  }, [formData]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Apartment Details</Text>
      <Text style={styles.label}>Upload Photos</Text>
      {['Building', 'Living Room', 'Kitchen', 'Bedroom', 'Bathroom', 'Balcony', 'Additional Space'].map((label, index) => (
        <TouchableOpacity key={index} style={styles.photoUpload} onPress={() => handleFileChange(index)}>
          <Text>{label}</Text>
          {formData.photos[index] && <Image source={{ uri: formData.photos[index] }} style={styles.image} />}
        </TouchableOpacity>
      ))}

      <Text style={styles.label}>Furnishing</Text>
      <TextInput style={styles.input} placeholder="Enter Furnishing" value={formData.furnishing} onChangeText={(value) => handleChange("furnishing", value)} />

      <Text style={styles.label}>Privacy Policy</Text>
      <TextInput style={styles.input} placeholder="Enter Policy" value={formData.policy} onChangeText={(value) => handleChange("policy", value)} />

      <Text style={styles.label}>Security Details</Text>
      <TextInput style={styles.input} placeholder="Enter Security" value={formData.security} onChangeText={(value) => handleChange("security", value)} />

      <Text style={styles.label}>Rent Details</Text>
      {['1BHK', '2BHK', '3BHK', '4BHK'].map((bhk) => (
        <TextInput
          key={bhk}
          style={styles.input}
          placeholder={`Rent for ${bhk}`}
          keyboardType="numeric"
          value={formData.rent[bhk]}
          onChangeText={(value) => handleChange(bhk, value)}
        />
      ))}

      <Text style={styles.label}>Rent to Pay</Text>
      <TextInput style={styles.input} placeholder="Enter Rent to Pay" keyboardType="numeric" value={formData.rentToPay} onChangeText={(value) => handleChange("rentToPay", value)} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, !isFormValid && styles.disabledButton]} onPress={handleSubmit} disabled={!isFormValid}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  label: { fontSize: 16, fontWeight: "600", marginTop: 10 },
  input: { borderWidth: 1, padding: 10, marginVertical: 5, borderRadius: 5 },
  photoUpload: { borderWidth: 1, padding: 10, marginVertical: 5, alignItems: "center" },
  image: { width: 100, height: 100, marginTop: 5 },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 15 },
  button: { padding: 10, backgroundColor: "blue", borderRadius: 5, alignItems: "center" },
  disabledButton: { backgroundColor: "gray" },
  buttonText: { color: "white", fontWeight: "bold" },
});

export default Apartment;
