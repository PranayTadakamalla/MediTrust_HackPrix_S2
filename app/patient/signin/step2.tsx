import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import * as SecureStore from 'expo-secure-store';

export default function Step2() {
  const router = useRouter();
  const [pin, setPin] = useState('');

  const handleLogin = async () => {
    try {
     const email = await SecureStore.getItemAsync('email');

      if (!email) {
        Alert.alert('Error', 'Email not found in storage');
        return;
      }

      if (pin.length !== 4) {
        Alert.alert('Invalid PIN', 'Please enter a 4-digit PIN');
        return;
      }

      // Send PIN and email to your API
      const response = await fetch('http://10.0.1.105:8000/api/login/step2/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, pin }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/patient/signin/congrats');
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid PIN');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Try again.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>💚 MediTrust</Text>

      <Text style={styles.title}>Enter your 4-digit pin</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Enter PIN"
          placeholderTextColor="#000"
          keyboardType="numeric"
          secureTextEntry
          maxLength={4}
          value={pin}
          onChangeText={setPin}
          style={styles.input}
        />
        <Ionicons name="keypad" size={20} color="black" style={styles.icon} />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D1E5D3',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#198754',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 30,
    color: '#000',
  },
  inputWrapper: {
    flexDirection: 'row',
    backgroundColor: '#A9D5AC',
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
  },
  icon: {
    marginLeft: 10,
  },
  loginButton: {
    backgroundColor: '#2D9B51',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 50,
    marginBottom: 40,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    backgroundColor: '#A9D5AC',
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
