  import React, { useState } from 'react';
  import { useContext } from 'react';
  import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
  } from 'react-native';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import { AuthContext } from '../../userDetails/userAuth';



  const HostSignIn = ({ navigation }) => {
     const { signInHost } = useContext(AuthContext); 
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSignIn = async () => {
      if (!emailOrUsername.trim() || !password) {
        Alert.alert('Error', 'All fields are required.');
        return;
      }

      try {
        const res = await fetch('https://myapp-5u6v.onrender.com/host/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            emailOrUsername: emailOrUsername.trim(),
            password,
          }),
        });

        const rawText = await res.text();
        let data;
        try {
          data = JSON.parse(rawText);
        } catch (e) {
          console.error('Invalid JSON:', rawText);
          Alert.alert('Error', 'Unexpected response from server.');
          return;
        }

        if (res.status === 200 || res.status === 201) {
          signInHost(data.token, data.host);
          // console.log('Login successful:', data);
          navigation.navigate('Host', { screen: 'Profile' });
        } else {
          Alert.alert('Error', data.message || 'Invalid credentials');
        }
      } catch (err) {
        console.error('Network error:', err);
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    };

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Sign In</Text>

        <View style={styles.inputWrapper}>
          <Ionicons name="person-outline" size={20} color="#999" />
          <TextInput
            style={styles.input}
            placeholder="Email or Username"
            value={emailOrUsername}
            onChangeText={setEmailOrUsername}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={20} color="#999" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#999"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('HostSignUp')}>
          <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  };

  export default HostSignIn;

  const styles = StyleSheet.create({
    container: {
      padding: 20,
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    header: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#6846bd',
      marginBottom: 30,
      textAlign: 'center',
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      paddingHorizontal: 10,
      paddingVertical: 12,
      borderRadius: 8,
      marginBottom: 15,
    },
    input: {
      flex: 1,
      marginLeft: 8,
    },
    button: {
      backgroundColor: '#6846bd',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
    },  
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    linkText: {
      color: '#6846bd',
      marginTop: 20,
      textAlign: 'center',
      textDecorationLine: 'underline',
    },
  });
