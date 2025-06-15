import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  BackHandler, 
  Dimensions 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  withSequence,
  withDelay,
  interpolate,
  runOnJS,
  Easing,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function Success() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  // Entrance animations
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.3);
  const logoRotation = useSharedValue(0);
  const headingOpacity = useSharedValue(0);
  const headingTranslateY = useSharedValue(50);
  const subtextOpacity = useSharedValue(0);
  const subtextTranslateY = useSharedValue(30);
  const dashboardButtonOpacity = useSharedValue(0);
  const dashboardButtonScale = useSharedValue(0.8);
  const logoutButtonOpacity = useSharedValue(0);
  const logoutButtonScale = useSharedValue(0.8);
  const greenCircleScale = useSharedValue(0);

  // Interactive animations
  const dashboardButtonPress = useSharedValue(1);
  const logoutButtonPress = useSharedValue(1);
  const successPulse = useSharedValue(1);

  // Ambulance loading animation
  const ambulanceTranslateX = useSharedValue(-width - 100);
  const ambulanceOpacity = useSharedValue(0);
  const ambulanceRotation = useSharedValue(0);
  const sirenRotation = useSharedValue(0);
  const loadingTextOpacity = useSharedValue(0);

  // Background elements
  const floatingElement1 = useSharedValue(0);
  const floatingElement2 = useSharedValue(0);
  const floatingElement3 = useSharedValue(0);

  useEffect(() => {
    startEntranceAnimations();
    startContinuousAnimations();
  }, []);

  const startEntranceAnimations = () => {
    // Logo entrance with bounce and rotation
    logoOpacity.value = withDelay(200, withTiming(1, { duration: 800 }));
    logoScale.value = withDelay(200, withSpring(1, { damping: 8, stiffness: 100 }));
    logoRotation.value = withDelay(200, withSpring(360, { damping: 10, stiffness: 80 }));

    // Heading slide up
    headingOpacity.value = withDelay(600, withTiming(1, { duration: 700 }));
    headingTranslateY.value = withDelay(600, withSpring(0, { damping: 8, stiffness: 80 }));

    // Subtext slide up
    subtextOpacity.value = withDelay(800, withTiming(1, { duration: 600 }));
    subtextTranslateY.value = withDelay(800, withSpring(0, { damping: 8, stiffness: 80 }));

    // Dashboard button entrance
    dashboardButtonOpacity.value = withDelay(1000, withTiming(1, { duration: 600 }));
    dashboardButtonScale.value = withDelay(1000, withSpring(1, { damping: 8, stiffness: 100 }));

    // Logout button entrance
    logoutButtonOpacity.value = withDelay(1200, withTiming(1, { duration: 600 }));
    logoutButtonScale.value = withDelay(1200, withSpring(1, { damping: 8, stiffness: 100 }));

    // Green circle entrance
    greenCircleScale.value = withDelay(400, withSpring(1, { damping: 12, stiffness: 60 }));
  };

  const startContinuousAnimations = () => {
    // Success pulse animation
    successPulse.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 1500 }),
        withTiming(1, { duration: 1500 })
      ),
      -1,
      false
    );

    // Floating elements
    floatingElement1.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 3000 }),
        withTiming(0, { duration: 3000 })
      ),
      -1,
      false
    );

    floatingElement2.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 4000 }),
        withTiming(0, { duration: 4000 })
      ),
      -1,
      false
    );

    floatingElement3.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2500 }),
        withTiming(0, { duration: 2500 })
      ),
      -1,
      false
    );
  };

  const startAmbulanceAnimation = () => {
    setIsNavigating(true);
    
    // Show ambulance and loading text
    ambulanceOpacity.value = withTiming(1, { duration: 300 });
    loadingTextOpacity.value = withTiming(1, { duration: 300 });
    
    // Ambulance movement across screen
    ambulanceTranslateX.value = withTiming(
      width + 100, 
      { 
        duration: 3000, 
        easing: Easing.out(Easing.quad) 
      },
      (finished) => {
        if (finished) {
          runOnJS(navigateToDashboard)();
        }
      }
    );

    // Ambulance slight bounce while moving
    ambulanceRotation.value = withRepeat(
      withSequence(
        withTiming(2, { duration: 200 }),
        withTiming(-2, { duration: 200 }),
        withTiming(0, { duration: 200 })
      ),
      -1,
      false
    );

    // Siren rotation
    sirenRotation.value = withRepeat(
      withTiming(360, { duration: 500 }),
      -1,
      false
    );
  };

  const navigateToDashboard = () => {
    router.push('/(tabs)/doctor/dashboard');
  };

  const handleContinue = () => {
    dashboardButtonPress.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
    
    setTimeout(() => {
      startAmbulanceAnimation();
    }, 200);
  };

  const handleLogout = () => {
    logoutButtonPress.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );

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

  // Animated styles
  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: logoOpacity.value,
      transform: [
        { scale: logoScale.value * successPulse.value },
        { rotate: `${logoRotation.value}deg` }
      ],
    };
  });

  const headingAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: headingOpacity.value,
      transform: [{ translateY: headingTranslateY.value }],
    };
  });

  const subtextAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: subtextOpacity.value,
      transform: [{ translateY: subtextTranslateY.value }],
    };
  });

  const dashboardButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: dashboardButtonOpacity.value,
      transform: [
        { scale: dashboardButtonScale.value * dashboardButtonPress.value }
      ],
    };
  });

  const logoutButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: logoutButtonOpacity.value,
      transform: [
        { scale: logoutButtonScale.value * logoutButtonPress.value }
      ],
    };
  });

  const greenCircleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: greenCircleScale.value }],
    };
  });

  const ambulanceAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: ambulanceOpacity.value,
      transform: [
        { translateX: ambulanceTranslateX.value },
        { rotate: `${ambulanceRotation.value}deg` }
      ],
    };
  });

  const sirenAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${sirenRotation.value}deg` }],
    };
  });

  const loadingTextAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: loadingTextOpacity.value,
    };
  });

  const floatingElement1Style = useAnimatedStyle(() => {
    const translateY = interpolate(floatingElement1.value, [0, 1], [0, -20]);
    return {
      transform: [{ translateY }],
      opacity: 0.6,
    };
  });

  const floatingElement2Style = useAnimatedStyle(() => {
    const translateY = interpolate(floatingElement2.value, [0, 1], [0, 15]);
    return {
      transform: [{ translateY }],
      opacity: 0.4,
    };
  });

  const floatingElement3Style = useAnimatedStyle(() => {
    const translateY = interpolate(floatingElement3.value, [0, 1], [0, -10]);
    return {
      transform: [{ translateY }],
      opacity: 0.5,
    };
  });

  return (
    <View style={styles.container}>
      {/* Background floating elements */}
      <Animated.View style={[styles.floatingElement1, floatingElement1Style]}>
        <Ionicons name="medical" size={24} color="rgba(45, 155, 81, 0.3)" />
      </Animated.View>
      
      <Animated.View style={[styles.floatingElement2, floatingElement2Style]}>
        <Ionicons name="heart" size={20} color="rgba(45, 155, 81, 0.4)" />
      </Animated.View>

      <Animated.View style={[styles.floatingElement3, floatingElement3Style]}>
        <Ionicons name="shield-checkmark" size={18} color="rgba(45, 155, 81, 0.35)" />
      </Animated.View>

      {/* Animated green circle */}
      <Animated.View style={[styles.greenCircle, greenCircleAnimatedStyle]} />

      <View style={styles.contentContainer}>
        {/* Success icon with animation */}
        <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
          <View style={styles.successIcon}>
            <Ionicons name="checkmark-circle" size={80} color="#2D9B51" />
          </View>
        </Animated.View>

        <Animated.Text style={[styles.heading, headingAnimatedStyle]}>
          You've Logged In Successfully!
        </Animated.Text>
        
        <Animated.Text style={[styles.subtext, subtextAnimatedStyle]}>
          Welcome to the future of secure healthcare.
        </Animated.Text>

        <Animated.View style={dashboardButtonAnimatedStyle}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleContinue}
            disabled={isNavigating}
            activeOpacity={0.8}
          >
            <Ionicons name="speedometer" size={20} color="white" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Go to Dashboard</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={logoutButtonAnimatedStyle}>
          <TouchableOpacity
            style={[styles.button, styles.logoutButton]}
            onPress={handleLogout}
            disabled={isNavigating}
            activeOpacity={0.8}
          >
            <Ionicons name="log-out" size={20} color="white" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Ambulance Loading Animation */}
      {isNavigating && (
        <View style={styles.loadingOverlay}>
          <Animated.View style={[styles.ambulanceContainer, ambulanceAnimatedStyle]}>
            <View style={styles.ambulance}>
              <Animated.View style={[styles.siren, sirenAnimatedStyle]}>
                <View style={styles.sirenLight} />
              </Animated.View>
              <View style={styles.ambulanceBody}>
                <Ionicons name="medical" size={24} color="white" />
              </View>
              <View style={styles.ambulanceWheels}>
                <View style={styles.wheel} />
                <View style={styles.wheel} />
              </View>
            </View>
          </Animated.View>
          
          <Animated.Text style={[styles.loadingText, loadingTextAnimatedStyle]}>
            🚨 Rushing to Dashboard... 🚨
          </Animated.Text>
        </View>
      )}
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
    zIndex: 10,
  },
  logoContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successIcon: {
    shadowColor: '#2D9B51',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
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
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#2D9B51',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
    elevation: 4,
    shadowColor: '#2D9B51',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  greenCircle: {
    position: 'absolute',
    bottom: -800,
    right: -500,
    width: 729.55,
    height: 715.37,
    backgroundColor: '#2D9B51',
    borderRadius: 364.775,
    opacity: 0.8,
  },
  // Floating elements
  floatingElement1: {
    position: 'absolute',
    top: height * 0.15,
    left: width * 0.1,
    zIndex: 1,
  },
  floatingElement2: {
    position: 'absolute',
    top: height * 0.25,
    right: width * 0.15,
    zIndex: 1,
  },
  floatingElement3: {
    position: 'absolute',
    bottom: height * 0.3,
    left: width * 0.2,
    zIndex: 1,
  },
  // Loading overlay
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(217, 234, 211, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  ambulanceContainer: {
    marginBottom: 20,
  },
  ambulance: {
    width: 80,
    height: 40,
    position: 'relative',
  },
  ambulanceBody: {
    width: 60,
    height: 30,
    backgroundColor: '#dc3545',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 5,
    left: 10,
  },
  siren: {
    width: 12,
    height: 8,
    position: 'absolute',
    top: 0,
    left: 34,
    zIndex: 2,
  },
  sirenLight: {
    width: 12,
    height: 8,
    backgroundColor: '#ff6b6b',
    borderRadius: 6,
  },
  ambulanceWheels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: -5,
    left: 15,
    right: 15,
  },
  wheel: {
    width: 12,
    height: 12,
    backgroundColor: '#333',
    borderRadius: 6,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D9B51',
    textAlign: 'center',
    marginTop: 20,
  },
});