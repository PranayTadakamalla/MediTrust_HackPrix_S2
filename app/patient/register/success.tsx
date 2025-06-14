import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Lottie from 'lottie-react-native';

export default function Success() {
  const router = useRouter();

  const handleContinue = () => {
    router.push('/patient/register/Dashboard'); // Adjust this if your step4 path leads to the intended destination
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}> {/* Parent View to enforce size */}
          <Lottie
            source={require('../../../assets/animations/Animation1.json')} // Adjust path
            autoPlay
            loop
            style={styles.logo}
            resizeMode="contain" // Ensures the animation fits within the given dimensions
          />
        </View>
        <View style={styles.greenCircle} />
        <Text style={styles.heading}>You’ve Logged In Successfully!</Text>
        <Text style={styles.subtext}>Welcome to the future of secure healthcare.</Text>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Go to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#d9ead3',
  },
  contentContainer: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 400, // Optional: Limit max width for better control
  },
  logoContainer: {
    width: 100, // Fixed width to match logo style
    height: 100, // Fixed height to match logo style
    overflow: 'hidden', // Clips any animation exceeding these dimensions
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  subtext: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  button: {
    backgroundColor: '#2D9B51',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  logo: {
    width: 100, // Fixed width
    height: 100, // Fixed height
    // Ensure the animation doesn't exceed these dimensions
  },
  greenCircle: {
    position: 'absolute',
    bottom: -800, // Adjusted to move closer to the bottom edge
    right: -500,  // Adjusted to move closer to the right edge
    width: 729.55, // Specified width
    height: 715.37, // Specified height
    backgroundColor: '#2D9B51', // Green color matching MediTrust theme
    borderRadius: 364.775, // Half of width for a perfect circle (729.55 / 2)
   
  },
});