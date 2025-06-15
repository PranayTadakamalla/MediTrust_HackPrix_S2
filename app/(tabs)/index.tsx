import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();

  const circleScale = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(50)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleTranslateY = useRef(new Animated.Value(30)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(0.8)).current;
  const floatingAnimation = useRef(new Animated.Value(0)).current;
  const pulseAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    startEntranceAnimations();
    startFloatingAnimation();
    startPulseAnimation();
  }, []);

  const startEntranceAnimations = () => {
    Animated.spring(circleScale, {
      toValue: 1,
      tension: 50,
      friction: 8,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(titleTranslateY, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }, 300);

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
    }, 600);

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(buttonScale, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }, 900);
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

  const startPulseAnimation = () => {
    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnimation, {
            toValue: 1.05,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnimation, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, 1200);
  };

  const handleButtonPress = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.push('/role-selection');
    });
  };

  const floatingTranslateY = floatingAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  const circleRotation = floatingAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '2deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.greenCircle,
          {
            transform: [
              { scale: circleScale },
              { rotate: circleRotation }
            ]
          }
        ]} 
      />

      <Animated.View
        style={[
          styles.contentContainer,
          {
            transform: [{ translateY: floatingTranslateY }]
          }
        ]}
      >
        <Animated.Text 
          style={[
            styles.title,
            {
              opacity: titleOpacity,
              transform: [{ translateY: titleTranslateY }]
            }
          ]}
        >
          MediTrust
        </Animated.Text>

        <Animated.Text 
          style={[
            styles.subtitle,
            {
              opacity: subtitleOpacity,
              transform: [{ translateY: subtitleTranslateY }]
            }
          ]}
        >
          Fast True. Your Anywhere
        </Animated.Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.buttonContainer,
          {
            opacity: buttonOpacity,
            transform: [
              { scale: Animated.multiply(buttonScale, pulseAnimation) }
            ]
          }
        ]}
      >
        <Pressable
          onPress={handleButtonPress}
          style={({ pressed }) => [
            styles.getStartedButton,
            {
              transform: [{ scale: pressed ? 0.98 : 1 }],
              shadowOpacity: pressed ? 0.1 : 0.3,
            }
          ]}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </Pressable>
      </Animated.View>

      <Animated.View
        style={[
          styles.decorativeCircle1,
          {
            opacity: titleOpacity,
            transform: [
              { scale: circleScale },
              { translateY: floatingTranslateY }
            ]
          }
        ]}
      />
      <Animated.View
        style={[
          styles.decorativeCircle2,
          {
            opacity: subtitleOpacity,
            transform: [
              { scale: circleScale },
              { translateY: Animated.multiply(floatingTranslateY, -0.5) }
            ]
          }
        ]}
      />
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Lottie from 'lottie-react-native';

// 🚀 SplashScreen Component
export default function SplashScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Decorative green circle background */}
      <View style={styles.greenCircle} />

      {/* Optional animated logo (commented out by default) */}
      {/* 
      <View style={styles.logoTextContainer}>
        <Lottie
          source={require('../../assets/animations/Animation1.json')}
          autoPlay
          loop
          style={styles.logo}
        />
      </View> 
      */}

      {/* App Title */}
      <Text style={styles.title}>MediTrust</Text>

      {/* Tagline */}
      <Text style={styles.subtitle}>Fast Trust. Yours Anywhere</Text>

      {/* "Get Started" Button */}
      <Pressable
        onPress={() => router.push('/role-selection')} // Navigate to role-selection screen
        style={styles.getStartedButton}
      >
        <Text style={styles.getStartedText}>Get Started</Text>
      </Pressable>

    </View>
  );
}

// 🔧 Hide the default header (which shows "doctor" or route name)

SplashScreen.options = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  contentContainer: {
    alignItems: 'center',
    zIndex: 2,
  },
  title: {
    fontFamily: 'IstokWeb',
    fontSize: 38,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    width: width * 0.9,
  logoTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontFamily: 'IstokWeb', // Optional: make sure the font is loaded in your app config
    fontSize: 34,
    fontWeight: 'bold',
    color: '#000',

  },
  subtitle: {
    fontFamily: 'IstokWeb',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 60,
    letterSpacing: 0.5,
    width: width * 0.9,
  },
  buttonContainer: {
    zIndex: 3,
  },
  getStartedButton: {
    backgroundColor: '#2e7d32',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#2e7d32',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    color: '#000',
    textAlign: 'center',
    marginBottom: 40,
  },
  getStartedButton: {
    backgroundColor: '#2e7d32',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 28,
    elevation: 2,

  },
  getStartedText: {
    color: 'white',
    fontFamily: 'IstokWeb',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
    width: '100%',
  },
  greenCircle: {
    position: 'absolute',
    top: -400,
    right: -250,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  greenCircle: {
    position: 'absolute',
    top: -400, // Pushes the circle above view
    right: -250, // Moves it off-screen to the right

    width: 480,
    height: 650,
    backgroundColor: '#2D9B51',
    borderRadius: 250,
    opacity: 0.9,
  },
  decorativeCircle1: {
    position: 'absolute',
    top: height * 0.15,
    left: -50,
    width: 100,
    height: 100,
    backgroundColor: 'rgba(45, 155, 81, 0.1)',
    borderRadius: 50,
    zIndex: 1,
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: height * 0.2,
    right: -30,
    width: 60,
    height: 60,
    backgroundColor: 'rgba(46, 125, 50, 0.15)',
    borderRadius: 30,
    zIndex: 1,

  },
});

