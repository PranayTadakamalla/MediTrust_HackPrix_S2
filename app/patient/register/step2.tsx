import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, ScrollView, Platform, Keyboard } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

export default function Step2() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // Listen for keyboard events
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

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
      const response = await fetch('http://10.0.1.105:8000/api/register/step2/', {
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
      router.push('/patient/register/step3');
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Network Error', 'Please try again later.');
    }
  };
  

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          {!isKeyboardVisible && <View style={styles.greenCircle} />} 
          <Text style={styles.logo}>MediTrust</Text>
                          <Text style={styles.heading}>Step 2: </Text> 
          <Text style={styles.heading}>Set Your Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  global: {
    backgroundColor: '#fff', 
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#198754', 
    textAlign: 'center',
    marginBottom: 25, 
},
container: {
    flex: 1,
    backgroundColor: '#fff', 
},
scrollContainer: {
    padding: 20,
    justifyContent: 'center',
},
heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 25, 
    textAlign: 'left', 
    color: 'black', 
    letterSpacing: 1,
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
    position: 'absolute',
    bottom: -360,
    right: -600,
    width: 750.55,
    height: 600.37,
    backgroundColor: '#2D9B51',
    borderRadius: 364.775,
  },
});

