import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

export default function Step4() {
  const router = useRouter();
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleSubmit = async () => {
    if (pin.length !== 4 || confirmPin.length !== 4) {
      Alert.alert('Validation Error', 'PIN must be exactly 4 digits');
      return;
    }

    if (pin !== confirmPin) {
      Alert.alert('Validation Error', 'PINs do not match');
      return;
    }

    try {
      const email = await SecureStore.getItemAsync('email');
      const response = await fetch('http://10.0.1.105:8000/api/register/step4/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pin, email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Failed to set PIN');
        return;
      }

      router.push('/patient/register/success');
    } catch (error) {
      console.error('PIN submission error:', error);
      Alert.alert('Network Error', 'Unable to set PIN. Try again later.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.content}>
          <Text style={styles.heading}>Set Your Transaction PIN</Text>
          <Text style={{ marginBottom: 20, textAlign: 'center', color: '#555' }}>
            Please set a PIN to sign transactions on blockchain. 
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter 4-digit PIN"
            secureTextEntry
            keyboardType="numeric"
            maxLength={4}
            value={pin}
            onChangeText={setPin}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm PIN"
            secureTextEntry
            keyboardType="numeric"
            maxLength={4}
            value={confirmPin}
            onChangeText={setConfirmPin}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Finish</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.greenCircle} />
    </KeyboardAvoidingView>
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
    bottom: -200,
    right: -200,
    width: 729.55,
    height: 715.37,
    backgroundColor: '#2D9B51',
    borderRadius: 364.775,
    zIndex: -1,
  },
});

