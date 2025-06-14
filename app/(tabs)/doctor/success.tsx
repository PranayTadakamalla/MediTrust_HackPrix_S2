import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, BackHandler } from 'react-native';
import { useRouter } from 'expo-router';
import Lottie from 'lottie-react-native';

export default function Success() {
  const router = useRouter();

  const handleContinue = () => {
    router.push('/(tabs)/doctor/dashboard');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => router.replace('/doctor/step3'),
        },
      ]
    );
  };

  // Back button should also ask for logout
  useEffect(() => {
    const onBackPress = () => {
      handleLogout();
      return true; // prevent default behavior
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <Lottie
            source={require('../../../assets/animations/Animation1.json')}
            autoPlay
            loop
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.greenCircle} />

        <Text style={styles.heading}>You’ve Logged In Successfully!</Text>
        <Text style={styles.subtext}>Welcome to the future of secure healthcare.</Text>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Go to Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#dc3545', marginTop: 12 }]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
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
    maxWidth: 400,
  },
  logoContainer: {
    width: 100,
    height: 100,
    overflow: 'hidden',
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
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
    width: 100,
    height: 100,
  },
  greenCircle: {
    position: 'absolute',
    bottom: -800,
    right: -500,
    width: 729.55,
    height: 715.37,
    backgroundColor: '#2D9B51',
    borderRadius: 364.775,
  },
});