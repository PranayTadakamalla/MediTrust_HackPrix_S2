import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

const { width, height } = Dimensions.get('window');

// Define the type for errors
interface ErrorState {
  general?: string;
  pin?: string;
}

export default function Step2() {
  const router = useRouter();
  const [pin, setPin] = useState('');
  const [errors, setErrors] = useState<ErrorState>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Transform animations (useNativeDriver: true)
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(30)).current;
  const inputOpacity = useRef(new Animated.Value(0)).current;
  const inputTranslateY = useRef(new Animated.Value(50)).current;
  const loginButtonOpacity = useRef(new Animated.Value(0)).current;
  const loginButtonScale = useRef(new Animated.Value(0.8)).current;
  const backButtonOpacity = useRef(new Animated.Value(0)).current;
  const backButtonScale = useRef(new Animated.Value(1)).current;

  // Floating animation
  const floatingAnimation = useRef(new Animated.Value(0)).current;

  // Button press animations
  const loginButtonPressScale = useRef(new Animated.Value(1)).current;
  const backButtonPressScale = useRef(new Animated.Value(1)).current;

  // Input focus and validation animations
  const inputBorderColorAnimation = useRef(new Animated.Value(0)).current;
  const inputShakeAnimation = useRef(new Animated.Value(0)).current;

  // PIN dots animations
  const pinDot1Scale = useRef(new Animated.Value(1)).current;
  const pinDot2Scale = useRef(new Animated.Value(1)).current;
  const pinDot3Scale = useRef(new Animated.Value(1)).current;
  const pinDot4Scale = useRef(new Animated.Value(1)).current;

  // Error and success animations
  const errorOpacity = useRef(new Animated.Value(0)).current;
  const errorTranslateY = useRef(new Animated.Value(-20)).current;
  const errorScale = useRef(new Animated.Value(0.8)).current;
  const successOpacity = useRef(new Animated.Value(0)).current;
  const successScale = useRef(new Animated.Value(0.8)).current;

  // Loading animations
  const loadingRotation = useRef(new Animated.Value(0)).current;
  const loadingScale = useRef(new Animated.Value(1)).current;
  const loadingOpacity = useRef(new Animated.Value(0)).current;

  // Progress dots
  const dot1Opacity = useRef(new Animated.Value(0.3)).current;
  const dot2Opacity = useRef(new Animated.Value(0.3)).current;
  const dot3Opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    startEntranceAnimations();
    startFloatingAnimation();
  }, []);

  useEffect(() => {
    animatePinDots();
  }, [pin]);

  const startEntranceAnimations = () => {
    // Logo entrance
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Title entrance (delayed)
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(titleTranslateY, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }, 400);

    // Input entrance (slide up)
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(inputOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(inputTranslateY, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }, 800);

    // Login button entrance
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(loginButtonOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.spring(loginButtonScale, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1200);

    // Back button entrance
    setTimeout(() => {
      Animated.timing(backButtonOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 1400);
  };

  const startFloatingAnimation = () => {
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
  };

  const animatePinDots = () => {
    const dots = [pinDot1Scale, pinDot2Scale, pinDot3Scale, pinDot4Scale];
    
    dots.forEach((dot, index) => {
      if (index < pin.length) {
        Animated.spring(dot, {
          toValue: 1.3,
          tension: 300,
          friction: 10,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.spring(dot, {
          toValue: 1,
          tension: 300,
          friction: 10,
          useNativeDriver: true,
        }).start();
      }
    });
  };

  const startLoadingAnimation = () => {
    setIsLoading(true);
    
    // Show loading overlay
    Animated.timing(loadingOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Rotating animation
    Animated.loop(
      Animated.timing(loadingRotation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();

    // Pulsing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(loadingScale, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(loadingScale, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Progress dots animation
    const animateDots = () => {
      Animated.sequence([
        Animated.timing(dot1Opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(dot2Opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(dot3Opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(dot1Opacity, { toValue: 0.3, duration: 300, useNativeDriver: true }),
        Animated.timing(dot2Opacity, { toValue: 0.3, duration: 300, useNativeDriver: true }),
        Animated.timing(dot3Opacity, { toValue: 0.3, duration: 300, useNativeDriver: true }),
      ]).start(() => animateDots());
    };
    animateDots();
  };

  const stopLoadingAnimation = () => {
    setIsLoading(false);
    loadingRotation.stopAnimation();
    loadingScale.stopAnimation();
    dot1Opacity.stopAnimation();
    dot2Opacity.stopAnimation();
    dot3Opacity.stopAnimation();
    
    Animated.timing(loadingOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    
    loadingRotation.setValue(0);
    loadingScale.setValue(1);
  };

  const shakeInput = () => {
    Animated.sequence([
      Animated.timing(inputShakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(inputShakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
      Animated.timing(inputShakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(inputShakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const showError = (message: string) => {
    setErrors({ general: message });
    Animated.parallel([
      Animated.timing(errorOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(errorTranslateY, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(errorScale, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      hideError();
    }, 4000);
  };

  const hideError = () => {
    Animated.parallel([
      Animated.timing(errorOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(errorTranslateY, {
        toValue: -20,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setErrors({});
    });
  };

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    Animated.parallel([
      Animated.timing(successOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(successScale, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleInputFocus = () => {
    hideError();
    Animated.timing(inputBorderColorAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleInputBlur = () => {
    Animated.timing(inputBorderColorAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleLoginPress = () => {
    Animated.sequence([
      Animated.timing(loginButtonPressScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(loginButtonPressScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      handleLogin();
    });
  };

  const handleBackPress = () => {
    Animated.sequence([
      Animated.timing(backButtonPressScale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(backButtonPressScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.back();
    });
  };

  const handleLogin = async () => {
    try {
      const email = await SecureStore.getItemAsync('email');

      if (!email) {
        shakeInput();
        showError('Email not found in storage');
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
        shakeInput();
        showError('Please enter a 4-digit PIN');
        return;
      }

      startLoadingAnimation();

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
        showSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          router.push('/patient/signin/congrats');
        }, 1500);
      } else {
        shakeInput();
        showError(data.message || 'Invalid PIN');
      }
    } catch (error) {
      shakeInput();
      showError('Something went wrong. Try again.');
      console.error(error);
    } finally {
      stopLoadingAnimation();
    }
  };

  // Interpolations
  const floatingTranslateY = floatingAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8],
  });

  const inputBorderColor = inputBorderColorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(169, 213, 172, 1)', 'rgba(46, 125, 50, 1)'],
  });

  const inputShakeTranslate = inputShakeAnimation.interpolate({
    inputRange: [-10, 0, 10],
    outputRange: [-10, 0, 10],
  });

  const loadingRotate = loadingRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
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
        💚 MediTrust
      </Animated.Text>

      {/* Animated Title */}
      <Animated.Text
        style={[
          styles.title,
          {
            opacity: titleOpacity,
            transform: [{ translateY: titleTranslateY }]
          }
        ]}
      >
        Enter your 4-digit pin
      </Animated.Text>

      {/* Error Message */}
      {errors.general && (
        <Animated.View
          style={[
            styles.errorContainer,
            {
              opacity: errorOpacity,
              transform: [
                { translateY: errorTranslateY },
                { scale: errorScale }
              ]
            }
          ]}
        >
          <Ionicons name="alert-circle" size={20} color="#e74c3c" style={styles.errorIcon} />
          <Text style={styles.errorText}>{errors.general}</Text>
        </Animated.View>
      )}

      {/* Success Message */}
      {successMessage && (
        <Animated.View
          style={[
            styles.successContainer,
            {
              opacity: successOpacity,
              transform: [{ scale: successScale }]
            }
          ]}
        >
          <Ionicons name="checkmark-circle" size={20} color="#27ae60" style={styles.successIcon} />
          <Text style={styles.successText}>{successMessage}</Text>
        </Animated.View>
      )}

      {/* PIN Dots Indicator */}
      <Animated.View
        style={[
          styles.pinDotsContainer,
          {
            opacity: inputOpacity,
            transform: [{ translateY: Animated.multiply(inputTranslateY, 0.5) }]
          }
        ]}
      >
        <Animated.View style={[styles.pinDot, pin.length >= 1 && styles.pinDotFilled, { transform: [{ scale: pinDot1Scale }] }]} />
        <Animated.View style={[styles.pinDot, pin.length >= 2 && styles.pinDotFilled, { transform: [{ scale: pinDot2Scale }] }]} />
        <Animated.View style={[styles.pinDot, pin.length >= 3 && styles.pinDotFilled, { transform: [{ scale: pinDot3Scale }] }]} />
        <Animated.View style={[styles.pinDot, pin.length >= 4 && styles.pinDotFilled, { transform: [{ scale: pinDot4Scale }] }]} />
      </Animated.View>

      {/* Input Container - Separated layers */}
      <Animated.View
        style={[
          {
            opacity: inputOpacity,
            transform: [{ translateY: inputTranslateY }]
          }
        ]}
      >
        <Animated.View
          style={[
            styles.inputWrapper,
            {
              borderColor: inputBorderColor,
              borderWidth: 2,
              transform: [{ translateX: inputShakeTranslate }]
            }
          ]}
        >
          <TextInput
            placeholder="Enter PIN"
            placeholderTextColor="#666"
            keyboardType="numeric"
            secureTextEntry
            maxLength={4}
            value={pin}
            onChangeText={setPin}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            style={styles.input}
          />
          <Ionicons name="keypad" size={20} color="black" style={styles.icon} />
        </Animated.View>
      </Animated.View>

      {/* Animated Login Button */}
      <Animated.View
        style={[
          {
            opacity: loginButtonOpacity,
            transform: [
              { scale: loginButtonScale },
              { scale: loginButtonPressScale }
            ]
          }
        ]}
      >
        <TouchableOpacity
          style={[styles.loginButton, isLoading && styles.loadingButton]}
          onPress={handleLoginPress}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Animated Back Button */}
      <Animated.View
        style={[
          styles.backButtonContainer,
          {
            opacity: backButtonOpacity,
            transform: [{ scale: backButtonPressScale }]
          }
        ]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </Animated.View>

      {/* Loading Overlay */}
      {isLoading && (
        <Animated.View
          style={[
            styles.loadingOverlay,
            { opacity: loadingOpacity }
          ]}
        >
          <Animated.View
            style={[
              styles.loadingSpinner,
              {
                transform: [
                  { rotate: loadingRotate },
                  { scale: loadingScale }
                ]
              }
            ]}
          >
            <Ionicons name="refresh" size={32} color="#2e7d32" />
          </Animated.View>
          <Text style={styles.loadingText}>Verifying PIN...</Text>
          <View style={styles.progressDots}>
            <Animated.View style={[styles.dot, { opacity: dot1Opacity }]} />
            <Animated.View style={[styles.dot, { opacity: dot2Opacity }]} />
            <Animated.View style={[styles.dot, { opacity: dot3Opacity }]} />
          </View>
        </Animated.View>
      )}

      {/* Decorative Elements */}
      <Animated.View
        style={[
          styles.decorativeCircle1,
          {
            opacity: logoOpacity,
            transform: [{ translateY: floatingTranslateY }]
          }
        ]}
      />
      <Animated.View
        style={[
          styles.decorativeCircle2,
          {
            opacity: inputOpacity,
            transform: [{ translateY: Animated.multiply(floatingTranslateY, -0.5) }]
          }
        ]}
      />
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#198754',
    marginBottom: 25,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#198754',
    marginBottom: 20,

  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 30,
    color: '#2c3e50',
    textAlign: 'center',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffeaea',
    borderColor: '#e74c3c',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 15,
    width: '100%',
    elevation: 2,
    shadowColor: '#e74c3c',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  errorIcon: {
    marginRight: 8,
  },
  errorText: {
    color: '#c0392b',
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  successContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eafaf1',
    borderColor: '#27ae60',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 15,
    width: '100%',
    elevation: 2,
    shadowColor: '#27ae60',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  successIcon: {
    marginRight: 8,
  },
  successText: {
    color: '#1e8449',
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  pinDotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    gap: 15,
  },
  pinDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(46, 125, 50, 0.3)',
    borderWidth: 2,
    borderColor: 'rgba(46, 125, 50, 0.5)',
  },
  pinDotFilled: {
    backgroundColor: '#2e7d32',
    borderColor: '#2e7d32',
    color: '#000',

  },
  inputWrapper: {
    flexDirection: 'row',
    backgroundColor: '#A9D5AC',
    borderRadius: 30,
    alignItems: 'center',
    width: width * 0.9,
    paddingHorizontal: 20,
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    letterSpacing: 8,
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
    paddingVertical: 14,
    paddingHorizontal: 50,
    marginBottom: 40,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  loadingButton: {
    opacity: 0.6,
    paddingVertical: 12,
    paddingHorizontal: 50,
    marginBottom: 40,

  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButtonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
  },
  backButton: {
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
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(209, 229, 211, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingSpinner: {
    marginBottom: 15,
  },
  loadingText: {
    color: '#2e7d32',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 15,
  },
  progressDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2e7d32',
    marginHorizontal: 4,
  },
  decorativeCircle1: {
    position: 'absolute',
    top: height * 0.15,
    left: -30,
    width: 80,
    height: 80,
    backgroundColor: 'rgba(46, 125, 50, 0.15)',
    borderRadius: 40,
    zIndex: -1,
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: height * 0.2,
    right: -40,
    width: 100,
    height: 100,
    backgroundColor: 'rgba(169, 213, 172, 0.3)',
    borderRadius: 50,
    zIndex: -1,
  },
});
  },
});


