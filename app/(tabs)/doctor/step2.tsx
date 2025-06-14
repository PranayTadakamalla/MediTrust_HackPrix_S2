import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import { useState, useLayoutEffect } from 'react';
import { useRouter, useNavigation } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

export default function Step2() {
  const router = useRouter();
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleNext = async () => {
    if (!password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in both fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
     try {
          const email = await SecureStore.getItemAsync('email');
          const response = await fetch('http://10.0.1.105:8000/api/doc_reg/step2/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password }),
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            Alert.alert('Error', errorData.message || 'Failed to register password');
            return;
          }
      
          // Success → Go to next screen
          router.push('/doctor/success');
        } catch (error) {
          console.error('Registration error:', error);
          Alert.alert('Network Error', 'Please try again later.');
        }

    // Proceed to next step
    router.push('/doctor/success');
  };

  const { width, height } = Dimensions.get('window');

  return (
    <View style={[styles.container, { paddingHorizontal: width * 0.05 }]}>
      <Text style={[styles.heading, { fontSize: width * 0.06 }]}>Set Your Password</Text>

      <TextInput
        style={[styles.input, { fontSize: width * 0.04, padding: width * 0.03 }]}
        placeholder="Enter Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={[styles.input, { fontSize: width * 0.04, padding: width * 0.03 }]}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        style={[styles.button, { padding: width * 0.04 }]}
        onPress={handleNext}
      >
        <Text style={[styles.buttonText, { fontSize: width * 0.045 }]}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#d9ead3',
  },
  heading: {
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0080ff',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
});
