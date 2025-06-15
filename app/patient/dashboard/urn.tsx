import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PinEntryScreen() {
  const router = useRouter();
  const [pin, setPin] = useState('');

  const handleProceed = () => {
    // Add validation or API call here if needed
    router.push('/patient/dashboard/sent'); // Replace with your desired navigation path
  };

  return (
    <View style={styles.container}>
      {/* Green Curve at Top Right */}
      <View style={styles.greenCurve} />

      <Text style={styles.instruction}>Please enter the pin to send the document.</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={20} color="#333" style={styles.icon} />
        <TextInput
          style={styles.input}
          value={pin}
          onChangeText={setPin}
          placeholder="Enter PIN"
          placeholderTextColor="#666"
          keyboardType="numeric"
          maxLength={4}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleProceed}>
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <Ionicons name="home" size={24} color="#333" />
        <Ionicons name="notifications" size={24} color="#333" />
        <Ionicons name="camera" size={24} color="#333" />
        <Ionicons name="person" size={24} color="#333" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9', // Light green background
    padding: 20,
    //position: 'centre',
    justifyContent: 'center',
  },
  greenCurve: {
    position: 'absolute',
    bottom: -800, // Adjusted to move closer to the bottom edge
    right: -500,  // Adjusted to move closer to the right edge
    width: 729.55, // Specified width
    height: 715.37, // Specified height
    backgroundColor: '#2D9B51', // Green color matching MediTrust theme
    borderRadius: 364.775, // Half of width for a perfect circle (729.55 / 2)
   
  },
  instruction: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F8E9', // Light green input background
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#A5D6A7',
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#000',
    backgroundColor: 'transparent',
    paddingVertical: 0,
    paddingHorizontal: 5,
    //selectionColor: '#4CAF50',
    //underlineColorAndroid: 'transparent',
  },
  button: {
    backgroundColor: '#2D9B51', // Green button
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#E8F5E9', // Match background for subtle effect
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#A5D6A7',
  },
});

