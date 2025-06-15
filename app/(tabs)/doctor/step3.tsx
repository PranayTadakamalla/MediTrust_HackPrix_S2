"use client"

import React, { useState, useEffect } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions, BackHandler } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useFocusEffect } from "@react-navigation/native"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  withSequence,
  interpolate,
  withDelay,
} from "react-native-reanimated"

const { width, height } = Dimensions.get("window")

export default function DoctorLogin() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Shared values for animations
  const logoOpacity = useSharedValue(0)
  const logoScale = useSharedValue(0.5)
  const logoTranslateY = useSharedValue(0)
  const titleOpacity = useSharedValue(0)
  const titleTranslateY = useSharedValue(50)
  const emailInputOpacity = useSharedValue(0)
  const emailInputTranslateX = useSharedValue(-100)
  const emailInputScale = useSharedValue(1)
  const passwordInputOpacity = useSharedValue(0)
  const passwordInputTranslateX = useSharedValue(100)
  const passwordInputScale = useSharedValue(1)
  const buttonOpacity = useSharedValue(0)
  const buttonScale = useSharedValue(0.8)
  const buttonPressScale = useSharedValue(1)

  // Floating and interactive animations
  const floatingAnimation = useSharedValue(0)
  const emailFocusScale = useSharedValue(1)
  const passwordFocusScale = useSharedValue(1)
  const stethoscopeRotation = useSharedValue(0)
  const heartBeat = useSharedValue(1)
  const loadingRotation = useSharedValue(0)

  // Background elements
  const backgroundCircle1 = useSharedValue(0)
  const backgroundCircle2 = useSharedValue(0)
  const backgroundCircle3 = useSharedValue(0)

  // Clear form data when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      // Clear the form fields when navigating back to this screen
      setEmail("")
      setPassword("")
      setIsLoading(false)

      // Reset animations to initial state
      resetAnimations()

      // Start entrance animations
      setTimeout(() => {
        startEntranceAnimations()
      }, 100)
    }, []),
  )

  // Fixed: Back button handler - navigate to doctor/choose
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (isLoading) {
          return true // Prevent back during loading
        }

        // Navigate directly to doctor/choose without any popups
        router.replace("/doctor/choose")
        return true // Prevent default behavior
      }

      BackHandler.addEventListener("hardwareBackPress", onBackPress)
      return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress)
    }, [isLoading, router]),
  )

  useEffect(() => {
    startContinuousAnimations()
  }, [])

  const resetAnimations = () => {
    // Reset all animation values to initial state
    logoOpacity.value = 0
    logoScale.value = 0.5
    titleOpacity.value = 0
    titleTranslateY.value = 50
    emailInputOpacity.value = 0
    emailInputTranslateX.value = -100
    passwordInputOpacity.value = 0
    passwordInputTranslateX.value = 100
    buttonOpacity.value = 0
    buttonScale.value = 0.8
    backgroundCircle1.value = 0
    backgroundCircle2.value = 0
    backgroundCircle3.value = 0
    emailFocusScale.value = 1
    passwordFocusScale.value = 1
    buttonPressScale.value = 1
  }

  const startEntranceAnimations = () => {
    // Logo entrance with bounce
    logoOpacity.value = withTiming(1, { duration: 800 })
    logoScale.value = withSpring(1, { damping: 8, stiffness: 100 })

    // Title entrance with slide up
    titleOpacity.value = withDelay(400, withTiming(1, { duration: 600 }))
    titleTranslateY.value = withDelay(400, withSpring(0, { damping: 8, stiffness: 80 }))

    // Email input slide from left
    emailInputOpacity.value = withDelay(800, withTiming(1, { duration: 600 }))
    emailInputTranslateX.value = withDelay(800, withSpring(0, { damping: 8, stiffness: 80 }))

    // Password input slide from right
    passwordInputOpacity.value = withDelay(1000, withTiming(1, { duration: 600 }))
    passwordInputTranslateX.value = withDelay(1000, withSpring(0, { damping: 8, stiffness: 80 }))

    // Button entrance with scale
    buttonOpacity.value = withDelay(1200, withTiming(1, { duration: 700 }))
    buttonScale.value = withDelay(1200, withSpring(1, { damping: 8, stiffness: 80 }))

    // Background elements
    backgroundCircle1.value = withDelay(600, withTiming(1, { duration: 1000 }))
    backgroundCircle2.value = withDelay(800, withTiming(1, { duration: 1000 }))
    backgroundCircle3.value = withDelay(1000, withTiming(1, { duration: 1000 }))
  }

  const startContinuousAnimations = () => {
    // Floating animation
    floatingAnimation.value = withRepeat(
      withSequence(withTiming(1, { duration: 3000 }), withTiming(0, { duration: 3000 })),
      -1,
      false,
    )

    // Stethoscope rotation
    stethoscopeRotation.value = withRepeat(withTiming(360, { duration: 20000 }), -1, false)

    // Heart beat animation
    heartBeat.value = withRepeat(
      withSequence(withTiming(1.2, { duration: 600 }), withTiming(1, { duration: 600 })),
      -1,
      false,
    )
  }

  const startLoadingAnimation = () => {
    loadingRotation.value = withRepeat(withTiming(360, { duration: 1000 }), -1, false)
  }

  const stopLoadingAnimation = () => {
    loadingRotation.value = 0
  }

  const handleEmailFocus = () => {
    emailFocusScale.value = withSpring(1.05, { damping: 8, stiffness: 100 })
  }

  const handleEmailBlur = () => {
    emailFocusScale.value = withSpring(1, { damping: 8, stiffness: 100 })
  }

  const handlePasswordFocus = () => {
    passwordFocusScale.value = withSpring(1.05, { damping: 8, stiffness: 100 })
  }

  const handlePasswordBlur = () => {
    passwordFocusScale.value = withSpring(1, { damping: 8, stiffness: 100 })
  }

  const handleLogin = async () => {
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert("Error", "Please fill all the fields")
      return
    }

    // Button press animation
    buttonPressScale.value = withSequence(withTiming(0.95, { duration: 100 }), withTiming(1, { duration: 100 }))

    setIsLoading(true)
    startLoadingAnimation()

    try {
      const response = await fetch("http://10.0.1.105:8000/api/login/doc/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()
        // Success animation before navigation
        buttonScale.value = withSpring(1.1, { damping: 8, stiffness: 100 })
        setTimeout(() => {
          router.push("/doctor/success")
        }, 500)
      } else {
        const errorMsg = await response.text()
        Alert.alert("Login Failed", errorMsg || "Invalid credentials")
      }
    } catch (error) {
      console.error("Login error:", error)
      Alert.alert("Error", "Something went wrong. Please try again later.")
    } finally {
      setIsLoading(false)
      stopLoadingAnimation()
    }
  }

  // Fixed: Animated styles with proper TypeScript types
  const logoAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(floatingAnimation.value, [0, 1], [0, -10])
    return {
      opacity: logoOpacity.value,
      transform: [{ scale: logoScale.value }, { translateY: translateY }] as const,
    }
  })

  const titleAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: titleOpacity.value,
      transform: [{ translateY: titleTranslateY.value }] as const,
    }
  })

  const emailInputAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: emailInputOpacity.value,
      transform: [{ translateX: emailInputTranslateX.value }, { scale: emailFocusScale.value }] as const,
    }
  })

  const passwordInputAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: passwordInputOpacity.value,
      transform: [{ translateX: passwordInputTranslateX.value }, { scale: passwordFocusScale.value }] as const,
    }
  })

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: buttonOpacity.value,
      transform: [{ scale: buttonScale.value * buttonPressScale.value }] as const,
    }
  })

  const stethoscopeAnimatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(stethoscopeRotation.value, [0, 360], [0, 360])
    return {
      transform: [{ rotate: `${rotate}deg` }] as const,
    }
  })

  const heartBeatAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: heartBeat.value }] as const,
    }
  })

  const loadingAnimatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(loadingRotation.value, [0, 360], [0, 360])
    return {
      transform: [{ rotate: `${rotate}deg` }] as const,
    }
  })

  const backgroundCircle1Style = useAnimatedStyle(() => {
    const translateY = interpolate(floatingAnimation.value, [0, 1], [0, -15])
    return {
      opacity: backgroundCircle1.value * 0.6,
      transform: [{ translateY: translateY }] as const,
    }
  })

  const backgroundCircle2Style = useAnimatedStyle(() => {
    const translateY = interpolate(floatingAnimation.value, [0, 1], [0, 10])
    return {
      opacity: backgroundCircle2.value * 0.4,
      transform: [{ translateY: translateY }] as const,
    }
  })

  const backgroundCircle3Style = useAnimatedStyle(() => {
    const translateY = interpolate(floatingAnimation.value, [0, 1], [0, -8])
    return {
      opacity: backgroundCircle3.value * 0.5,
      transform: [{ translateY: translateY }] as const,
    }
  })

  return (
    <View style={styles.container}>
      {/* Background Animated Elements */}
      <Animated.View style={[styles.backgroundCircle1, backgroundCircle1Style]} />
      <Animated.View style={[styles.backgroundCircle2, backgroundCircle2Style]} />
      <Animated.View style={[styles.backgroundCircle3, backgroundCircle3Style]} />

      {/* Floating Medical Icons */}
      <Animated.View style={[styles.floatingIcon1, stethoscopeAnimatedStyle]}>
        <Ionicons name="medical" size={24} color="rgba(25, 135, 84, 0.3)" />
      </Animated.View>

      <Animated.View style={[styles.floatingIcon2, heartBeatAnimatedStyle]}>
        <Ionicons name="heart" size={20} color="rgba(45, 155, 81, 0.4)" />
      </Animated.View>

      <View style={styles.floatingIcon3}>
        <Ionicons name="fitness" size={18} color="rgba(25, 135, 84, 0.25)" />
      </View>

      {/* Main Content */}
      <Animated.Text style={[styles.logo, logoAnimatedStyle]}>🏥 MediTrust</Animated.Text>

      <Animated.Text style={[styles.title, titleAnimatedStyle]}>
        Doctor Portal: Secure Access{"\n"}to Patient Care
      </Animated.Text>

      {/* Animated Email Input */}
      <Animated.View style={[styles.inputContainer, emailInputAnimatedStyle]}>
        <Ionicons name="mail-outline" size={20} color="#2D9B51" style={styles.icon} />
        <TextInput
          placeholder="Enter Doctor Email"
          placeholderTextColor="#666"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function DoctorLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    try {
      const response = await fetch('http://10.0.1.105:8000/api/login/doc/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Store token/data if needed
        router.push('/doctor/success');
      } else {
        const errorMsg = await response.text();
        Alert.alert('Login Failed', errorMsg || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MediTrust</Text>
      <Text style={styles.title}>
        Secure Patient Access: Your Health,{"\n"}Your Control
      </Text>

      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#888" style={styles.icon} />
        <TextInput
          placeholder="Enter Email"
          placeholderTextColor="#000"

          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          onFocus={handleEmailFocus}
          onBlur={handleEmailBlur}
        />
      </Animated.View>

      {/* Animated Password Input */}
      <Animated.View style={[styles.inputContainer, passwordInputAnimatedStyle]}>
        <Ionicons name="lock-closed-outline" size={20} color="#2D9B51" style={styles.icon} />
        <TextInput
          placeholder="Enter Secure Password"
          placeholderTextColor="#666"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.icon} />
        <TextInput
          placeholder="Enter Password"
          placeholderTextColor="#000"

          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          onFocus={handlePasswordFocus}
          onBlur={handlePasswordBlur}
        />
      </Animated.View>

      {/* Loading Animation */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <Animated.View style={[styles.loadingSpinner, loadingAnimatedStyle]}>
            <Ionicons name="medical" size={32} color="#2D9B51" />
          </Animated.View>
          <Text style={styles.loadingText}>Authenticating Doctor...</Text>
          <View style={styles.progressDots}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={[styles.dot, styles.dotActive]} />
            <View style={[styles.dot, styles.dotActive]} />
          </View>
        </View>
      )}

      {/* Animated Login Button */}
      <Animated.View style={[styles.buttonContainer, buttonAnimatedStyle]}>
        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          <Ionicons name="log-in" size={20} color="white" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>{isLoading ? "Signing In..." : "Doctor Login"}</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Medical Badge */}
      <View style={styles.medicalBadge}>
        <Ionicons name="shield-checkmark" size={16} color="#2D9B51" />
        <Text style={styles.badgeText}>Verified Medical Portal</Text>
      </View>

      {/* Decorative Medical Elements */}
      <View style={styles.decorativeElement1}>
        <Ionicons name="pulse" size={14} color="rgba(45, 155, 81, 0.2)" />
      </View>
      <View style={styles.decorativeElement2}>
        <Ionicons name="thermometer" size={16} color="rgba(25, 135, 84, 0.25)" />
      </View>
    </View>
  )
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D1E5D3",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  backgroundCircle1: {
    position: "absolute",
    top: height * 0.1,
    left: -50,
    width: 120,
    height: 120,
    backgroundColor: "#2D9B51",
    borderRadius: 60,
    zIndex: -1,
  },
  backgroundCircle2: {
    position: "absolute",
    bottom: height * 0.2,
    right: -60,
    width: 150,
    height: 150,
    backgroundColor: "#A9D5AC",
    borderRadius: 75,
    zIndex: -1,
  },
  backgroundCircle3: {
    position: "absolute",
    top: height * 0.3,
    right: -30,
    width: 80,
    height: 80,
    backgroundColor: "#198754",
    borderRadius: 40,
    zIndex: -1,
  },
  floatingIcon1: {
    position: "absolute",
    top: height * 0.15,
    left: width * 0.1,
    zIndex: 1,
  },
  floatingIcon2: {
    position: "absolute",
    top: height * 0.25,
    right: width * 0.15,
    zIndex: 1,
  },
  floatingIcon3: {
    position: "absolute",
    bottom: height * 0.3,
    left: width * 0.2,
    zIndex: 1,
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#198754",
    marginBottom: 20,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    zIndex: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 26,
    zIndex: 10,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#A9D5AC",
    borderRadius: 30,
    alignItems: "center",
    width: "100%",
    marginVertical: 12,
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: "rgba(45, 155, 81, 0.3)",
    zIndex: 10,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: "#000",
  },
  loadingContainer: {
    alignItems: "center",
    marginVertical: 20,
    zIndex: 10,
  },
  loadingSpinner: {
    marginBottom: 10,
  },
  loadingText: {
    color: "#2D9B51",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 8,
    marginBottom: 10,
  },
  progressDots: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(45, 155, 81, 0.3)",
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: "#2D9B51",
  },
  buttonContainer: {
    zIndex: 10,
  },
  button: {
    backgroundColor: "#2D9B51",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#2D9B51",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  medicalBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(45, 155, 81, 0.1)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "rgba(45, 155, 81, 0.3)",
    zIndex: 10,
  },
  badgeText: {
    color: "#2D9B51",
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
  decorativeElement1: {
    position: "absolute",
    bottom: height * 0.15,
    left: width * 0.1,
    zIndex: 1,
  },
  decorativeElement2: {
    position: "absolute",
    top: height * 0.2,
    right: width * 0.25,
    zIndex: 1,
  },
})
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
    color: '#000',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#A9D5AC',
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#000',
  },
  button: {
    backgroundColor: '#2D9B51',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 50,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


