import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';


export default function SelectScreen() {
  const router = useRouter();

  // Animation values for entrance transition
  const medkitScale = useRef(new Animated.Value(1)).current;
  const medkitOpacity = useRef(new Animated.Value(1)).current;
  const backgroundOpacity = useRef(new Animated.Value(1)).current;
  
  // Content animation values
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(30)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleTranslateY = useRef(new Animated.Value(20)).current;
  const buttonsOpacity = useRef(new Animated.Value(0)).current;
  const buttonsTranslateY = useRef(new Animated.Value(40)).current;
  
  // Floating animation
  const floatingAnimation = useRef(new Animated.Value(0)).current;

  // State to control overlay visibility
  const [showOverlay, setShowOverlay] = React.useState(true);

  useEffect(() => {
    startEntranceAnimation();
    startFloatingAnimation();
  }, []);

  const startEntranceAnimation = () => {
    // Start with medkit transition out
    setTimeout(() => {
      Animated.parallel([
        // Medkit shrinks and fades out
        Animated.timing(medkitScale, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(medkitOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        // Background fades out
        Animated.timing(backgroundOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Remove overlay completely after animation
        setShowOverlay(false);
      });
    }, 300);

    // Logo entrance
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }, 800);

    // Title entrance
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.spring(titleTranslateY, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1000);

    // Subtitle entrance
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(subtitleOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(subtitleTranslateY, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1200);

    // Buttons entrance
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(buttonsOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.spring(buttonsTranslateY, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1400);
  };

  const startFloatingAnimation = () => {
    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(floatingAnimation, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(floatingAnimation, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, 1600);
  };

  // Interpolations
  const floatingTranslateY = floatingAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8],
  });

  return (
    <View style={styles.container}>
      {/* Medkit Transition Overlay - Only show when needed */}
      {showOverlay && (
        <Animated.View
          style={[
            styles.medkitOverlay,
            {
              opacity: backgroundOpacity,
            }
          ]}
          pointerEvents="none" // This ensures it doesn't block touches
        >
          <Animated.View
            style={[
              styles.medkitContainer,
              {
                opacity: medkitOpacity,
                transform: [{ scale: medkitScale }]
              }
            ]}
          >
            <Ionicons name="medkit" size={120} color="white" />
          </Animated.View>
        </Animated.View>
      )}

      {/* Animated Logo */}
      <Animated.Text
        style={[
          styles.logo,
          {
            opacity: logoOpacity,
            transform: [
              { scale: logoScale },
              { translateY: floatingTranslateY }
            ]
          }
        ]}
      >
        MediTrust
      </Animated.Text>

      {/* Animated Title */}
      <Animated.Text
        style={[
          styles.title,
          {
            opacity: titleOpacity,
            transform: [
              { translateY: titleTranslateY },
              { translateY: floatingTranslateY }
            ]
          }
        ]}
      >
        Welcome to MediTrust,{"\n"}Your Health Partner
      </Animated.Text>

      {/* Animated Subtitle */}
      <Animated.Text
        style={[
          styles.subtitle,
          {
            opacity: subtitleOpacity,
            transform: [{ translateY: subtitleTranslateY }]
          }
        ]}
      >
        Securely manage your health records with fast,{"\n"}
        trusted access – anywhere, anytime.
      </Animated.Text>

      {/* Animated Buttons Container */}
      <Animated.View
        style={[
          styles.buttonsContainer,
          {
            opacity: buttonsOpacity,
            transform: [{ translateY: buttonsTranslateY }]
          }
        ]}
      >
        {/* Register Button - EXACT SAME FUNCTIONALITY */}
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => router.push('/doctor/step1')}
        >
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>

        {/* Or Text */}
        <Text style={styles.orText}>or</Text>

        {/* Sign-in Button - EXACT SAME FUNCTIONALITY */}
        <TouchableOpacity
          style={styles.signinButton}
          onPress={() => router.push('/doctor/step3')}
        >
          <Text style={styles.signinText}>Sign-in</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Decorative Elements */}
      <Animated.View
        style={[
          styles.decorativeCircle1,
          {
            opacity: logoOpacity,
            transform: [{ translateY: floatingTranslateY }]
          }
        ]}
        pointerEvents="none" // Ensures decorative elements don't block touches
      />
      <Animated.View
        style={[
          styles.decorativeCircle2,
          {
            opacity: buttonsOpacity,
            transform: [{ translateY: Animated.multiply(floatingTranslateY, -0.5) }]
          }
        ]}
        pointerEvents="none" // Ensures decorative elements don't block touches
      />
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MediTrust</Text>
      <Text style={styles.title}>Welcome to MediTrust,{"\n"}Your Health Partner</Text>
      <Text style={styles.subtitle}>
        Securely manage your health records with fast,{"\n"}
        trusted access – anywhere, anytime.
      </Text>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => router.push('/doctor/step1')}
      >
        <Text style={styles.registerText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or</Text>

      <TouchableOpacity
        style={styles.signinButton}
        onPress={() => router.push('/doctor/step3')}
      >
        <Text style={styles.signinText}>Sign-in</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D1E5D3', // Your original light green background
    backgroundColor: '#D1E5D3',

    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  medkitOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#2e7d32', // Same green as role selection
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  medkitContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#198754',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    marginBottom: 30,
  },
  buttonsContainer: {
    alignItems: 'center',
    width: '100%',
  },

  registerButton: {
    backgroundColor: '#2E8B57',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 40,
    marginBottom: 10,
  },
  registerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  orText: {
    fontSize: 14,
    color: '#555',
    marginVertical: 10,
  },
  signinButton: {
    borderColor: '#2E8B57',
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 40,
  },
  signinText: {
    color: '#2E8B57',
    fontSize: 16,
    fontWeight: '600',
  },
  decorativeCircle1: {
    position: 'absolute',
    top: height * 0.15,
    left: -40,
    width: 100,
    height: 100,
    backgroundColor: 'rgba(46, 139, 87, 0.12)',
    borderRadius: 50,
    zIndex: -1, // Behind everything
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: height * 0.2,
    right: -50,
    width: 120,
    height: 120,
    backgroundColor: 'rgba(25, 135, 84, 0.10)',
    borderRadius: 60,
    zIndex: -1, // Behind everything
  },
});
});


