import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
export default function Step3() {
  const router = useRouter();
  const [urn, setUrn] = useState('');

  const handleNext = async () => {
    if (!urn.trim()) {
      Alert.alert('Validation Error', 'Please enter your URN');
      return;
    }
  
    try {
      const email = await SecureStore.getItemAsync('email');
      const response = await fetch('http://10.0.1.105:8000/api/register/step3/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urn ,email}),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Failed to register URN');
        return;
      }
  
      // Success → Navigate to Step 4
      router.push('/patient/register/step4');
    } catch (error) {
      console.error('URN submission error:', error);
      Alert.alert('Network Error', 'Unable to submit URN. Try again later.');
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Enter Your URN</Text>
        <Text style={{ marginBottom: 20, textAlign: 'center', color: '#555' }}>
          Please enter your URN to proceed.an email with a verification link will be sent to you.
          {'\n'}Please check your inbox and spam folder.
          {'\n'}Click the link to verify your email address.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Unique Reference Number"
          value={urn}
          onChangeText={setUrn}
        />

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.greenCircle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9ead3',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2D9B51',
    padding: 15,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  greenCircle: {
    ...StyleSheet.absoluteFillObject,
    bottom: -200, // Adjusted to keep it static at the bottom
    right: -200,  // Adjusted to keep it static at the right
    width: 729.55,
    height: 715.37,
    backgroundColor: '#2D9B51',
    borderRadius: 364.775,
    zIndex: -1, // Ensures it stays behind other elements
  },
});
