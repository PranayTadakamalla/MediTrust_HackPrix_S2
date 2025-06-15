import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler, Alert, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

const { width, height } = Dimensions.get('window');

export default function Step2() {
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(false);

  // Animation values
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const tickOpacity = useRef(new Animated.Value(0)).current;
  const tickScale = useRef(new Animated.Value(0)).current;
  const tickRotation = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(50)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleTranslateY = useRef(new Animated.Value(30)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(0.8)).current;
  const buttonPressScale = useRef(new Animated.Value(1)).current;

  // Celebration animations
  const celebrationPulse = useRef(new Animated.Value(1)).current;
  const floatingAnimation = useRef(new Animated.Value(0)).current;
  const sparkleRotation = useRef(new Animated.Value(0)).current;
  const glowAnimation = useRef(new Animated.Value(0)).current;

  // Custom confetti animations (replacing external library)
  const confetti1 = useRef(new Animated.Value(0)).current;
  const confetti2 = useRef(new Animated.Value(0)).current;
  const confetti3 = useRef(new Animated.Value(0)).current;
  const confetti4 = useRef(new Animated.Value(0)).current;
  const confetti5 = useRef(new Animated.Value(0)).current;
  const confetti6 = useRef(new Animated.Value(0)).current;
  const confetti7 = useRef(new Animated.Value(0)).current;
  const confetti8 = useRef(new Animated.Value(0)).current;
  const confetti9 = useRef(new Animated.Value(0)).current;
  const confetti10 = useRef(new Animated.Value(0)).current;

  // Particle animations
  const particle1 = useRef(new Animated.Value(0)).current;
  const particle2 = useRef(new Animated.Value(0)).current;
  const particle3 = useRef(new Animated.Value(0)).current;
  const particle4 = useRef(new Animated.Value(0)).current;
  const particle5 = useRef(new Animated.Value(0)).current;
  const particle6 = useRef(new Animated.Value(0)).current;

  // Background gradient animation
  const gradientAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Logout', 'Do you want to logout?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await SecureStore.deleteItemAsync('email');
            router.replace('/patient/signin/step1');
          },
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    startCelebrationSequence();
    startBackgroundAnimation();
  }, []);

  const startBackgroundAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(gradientAnimation, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: false,
        }),
        Animated.timing(gradientAnimation, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  const startCelebrationSequence = () => {
    // Start custom confetti immediately
    setTimeout(() => {
      setShowConfetti(true);
      startCustomConfetti();
    }, 800);

    // Logo entrance with bounce
    Animated.sequence([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Tick animation with rotation and scale
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(tickOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.spring(tickScale, {
            toValue: 1.3,
            tension: 150,
            friction: 8,
            useNativeDriver: true,
          }),
          Animated.spring(tickScale, {
            toValue: 1,
            tension: 150,
            friction: 8,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(tickRotation, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();
    }, 600);

    // Title entrance
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(titleTranslateY, {
          toValue: 0,
          tension: 80,
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
          tension: 80,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1200);

    // Button entrance
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(buttonScale, {
          toValue: 1,
          tension: 80,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1400);

    // Start continuous animations
    startContinuousAnimations();
    startParticleAnimations();
  };

  const startCustomConfetti = () => {
    const confettiPieces = [
      confetti1, confetti2, confetti3, confetti4, confetti5,
      confetti6, confetti7, confetti8, confetti9, confetti10
    ];

    confettiPieces.forEach((confetti, index) => {
      setTimeout(() => {
        Animated.sequence([
          Animated.timing(confetti, {
            toValue: 1,
            duration: 3000 + (Math.random() * 2000),
            useNativeDriver: true,
          }),
          Animated.timing(confetti, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start(() => {
          // Restart confetti animation after a delay
          setTimeout(() => {
            confetti.setValue(0);
            if (showConfetti) {
              startCustomConfetti();
            }
          }, Math.random() * 3000);
        });
      }, index * 100);
    });
  };

  const startContinuousAnimations = () => {
    // Celebration pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(celebrationPulse, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(celebrationPulse, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Floating animation
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

    // Sparkle rotation
    Animated.loop(
      Animated.timing(sparkleRotation, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();

    // Glow animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const startParticleAnimations = () => {
    const particles = [particle1, particle2, particle3, particle4, particle5, particle6];
    
    particles.forEach((particle, index) => {
      setTimeout(() => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(particle, {
              toValue: 1,
              duration: 3000 + (index * 500),
              useNativeDriver: true,
            }),
            Animated.timing(particle, {
              toValue: 0,
              duration: 2000,
              useNativeDriver: true,
            }),
          ])
        ).start();
      }, index * 200);
    });
  };

  const handleGoPress = () => {
    Animated.sequence([
      Animated.timing(buttonPressScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonPressScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.push('/patient/dashboard/home');
    });
  };

  // Interpolations
  const floatingTranslateY = floatingAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  const tickRotate = tickRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const sparkleRotate = sparkleRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const glowOpacity = glowAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  });

  const backgroundOpacity = gradientAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  // Custom confetti interpolations
  const getConfettiTransform = (confetti, index) => {
    const translateY = confetti.interpolate({
      inputRange: [0, 1],
      outputRange: [0, height + 100],
    });
    const translateX = confetti.interpolate({
      inputRange: [0, 1],
      outputRange: [0, (Math.random() - 0.5) * 200],
    });
    const rotate = confetti.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', `${360 * (2 + Math.random())}deg`],
    });
    const opacity = confetti.interpolate({
      inputRange: [0, 0.1, 0.9, 1],
      outputRange: [0, 1, 1, 0],
    });
    const scale = confetti.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0.5],
    });
    return { translateY, translateX, rotate, opacity, scale };
  };

  // Particle interpolations
  const getParticleTransform = (particle, index) => {
    const translateY = particle.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -100 - (index * 20)],
    });
    const opacity = particle.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0],
    });
    const scale = particle.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0.5],
    });
    return { translateY, opacity, scale };
  };

  const confettiColors = ['#2D9B51', '#4CAF50', '#81C784', '#A5D6A7', '#C8E6C9', '#FFD700', '#FF6B6B'];
  const confettiShapes = ['■', '●', '▲', '♦', '★', '♥'];

  return (
    <Animated.View style={[styles.container, { opacity: backgroundOpacity }]}>
      {/* Animated Background Layers */}
      <View style={styles.backgroundLayer1} />
      <View style={styles.backgroundLayer2} />
      <View style={styles.backgroundLayer3} />

      {/* Custom Confetti */}
      {showConfetti && [confetti1, confetti2, confetti3, confetti4, confetti5, confetti6, confetti7, confetti8, confetti9, confetti10].map((confetti, index) => {
        const { translateY, translateX, rotate, opacity, scale } = getConfettiTransform(confetti, index);
        return (
          <Animated.View
            key={index}
            style={[
              styles.confettiPiece,
              {
                left: 20 + (index * (width - 40) / 10),
                top: -20,
                opacity,
                transform: [{ translateY }, { translateX }, { rotate }, { scale }],
              },
            ]}
          >
            <Text style={[styles.confettiText, { color: confettiColors[index % confettiColors.length] }]}>
              {confettiShapes[index % confettiShapes.length]}
            </Text>
          </Animated.View>
        );
      })}

      {/* Floating Particles */}
      {[particle1, particle2, particle3, particle4, particle5, particle6].map((particle, index) => {
        const { translateY, opacity, scale } = getParticleTransform(particle, index);
        return (
          <Animated.View
            key={index}
            style={[
              styles.particle,
              {
                left: 50 + (index * 50),
                top: height * 0.7,
                opacity,
                transform: [{ translateY }, { scale }],
              },
            ]}
          >
            <Ionicons 
              name={index % 2 === 0 ? "star" : "heart"} 
              size={16} 
              color={index % 3 === 0 ? "#FFD700" : index % 3 === 1 ? "#FF6B6B" : "#2D9B51"} 
            />
          </Animated.View>
        );
      })}

      {/* Background Sparkles */}
      <Animated.View
        style={[
          styles.sparkle1,
          {
            transform: [{ rotate: sparkleRotate }],
            opacity: glowOpacity,
          },
        ]}
      >
        <Ionicons name="sparkles" size={24} color="#FFD700" />
      </Animated.View>
      <Animated.View
        style={[
          styles.sparkle2,
          {
            transform: [{ rotate: sparkleRotate }],
            opacity: glowOpacity,
          },
        ]}
      >
        <Ionicons name="sparkles" size={20} color="#FF6B6B" />
      </Animated.View>
      <Animated.View
        style={[
          styles.sparkle3,
          {
            transform: [{ rotate: sparkleRotate }],
            opacity: glowOpacity,
          },
        ]}
      >
        <Ionicons name="sparkles" size={18} color="#2D9B51" />
      </Animated.View>

      {/* Main Content */}
      <Animated.Text
        style={[
          styles.logo,
          {
            opacity: logoOpacity,
            transform: [
              { scale: logoScale },
              { translateY: floatingTranslateY },
            ],
          },
        ]}
      >
        🏥 MediTrust
      </Animated.Text>

      {/* Success Badge */}
      <Animated.View
        style={[
          styles.successBadge,
          {
            opacity: tickOpacity,
            transform: [
              { scale: Animated.multiply(tickScale, celebrationPulse) },
              { rotate: tickRotate },
            ],
          },
        ]}
      >
        <View style={styles.tickButton}>
          <Animated.View
            style={[
              styles.glowEffect,
              { opacity: glowOpacity },
            ]}
          />
          <Ionicons name="checkmark" size={50} color="white" />
        </View>
      </Animated.View>

      {/* Title with celebration effect */}
      <Animated.Text
        style={[
          styles.title,
          {
            opacity: titleOpacity,
            transform: [
              { translateY: titleTranslateY },
              { scale: celebrationPulse },
            ],
          },
        ]}
      >
        🎉 Congratulations! 🎉
      </Animated.Text>

      {/* Subtitle */}
      <Animated.Text
        style={[
          styles.subtitle,
          {
            opacity: subtitleOpacity,
            transform: [{ translateY: subtitleTranslateY }],
          },
        ]}
      >
        You've successfully logged into your{'\n'}secure MediTrust account!
      </Animated.Text>

      {/* Enhanced Go Button */}
      <Animated.View
        style={[
          {
            opacity: buttonOpacity,
            transform: [
              { scale: buttonScale },
              { scale: buttonPressScale },
            ],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.goButtonContainer}
          onPress={handleGoPress}
          activeOpacity={0.8}
        >
          <View style={styles.goButton}>
            <Text style={styles.goText}>Let's Go</Text>
            <Ionicons name="arrow-forward" size={20} color="white" style={styles.arrowIcon} />
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* Decorative Elements */}
      <Animated.View
        style={[
          styles.decorativeCircle1,
          {
            opacity: logoOpacity,
            transform: [{ translateY: floatingTranslateY }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.decorativeCircle2,
          {
            opacity: titleOpacity,
            transform: [{ translateY: Animated.multiply(floatingTranslateY, -0.5) }],
          },
        ]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E8F5E8',
  },
  backgroundLayer1: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.4,
    backgroundColor: '#E8F5E8',
  },
  backgroundLayer2: {
    position: 'absolute',
    top: height * 0.3,
    left: 0,
    right: 0,
    height: height * 0.4,
    backgroundColor: '#D1E5D3',
  },
  backgroundLayer3: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.4,
    backgroundColor: '#C8E6C9',
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 50,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    zIndex: 10,
  },
  successBadge: {
    marginBottom: 40,
    elevation: 10,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    zIndex: 10,
  },
  tickButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    elevation: 8,
    shadowColor: '#2D9B51',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  glowEffect: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#4CAF50',
    top: -10,
    left: -10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    zIndex: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#2E7D32',
    marginBottom: 50,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
    zIndex: 10,
  },
  goButtonContainer: {
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#2D9B51',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    zIndex: 10,
  },
  goButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
  },
  goText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  arrowIcon: {
    marginLeft: 5,
  },
  confettiPiece: {
    position: 'absolute',
    zIndex: 1000,
  },
  confettiText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  particle: {
    position: 'absolute',
    zIndex: 5,
  },
  sparkle1: {
    position: 'absolute',
    top: height * 0.2,
    left: width * 0.1,
    zIndex: 5,
  },
  sparkle2: {
    position: 'absolute',
    top: height * 0.3,
    right: width * 0.1,
    zIndex: 5,
  },
  sparkle3: {
    position: 'absolute',
    bottom: height * 0.3,
    left: width * 0.2,
    zIndex: 5,
  },
  decorativeCircle1: {
    position: 'absolute',
    top: height * 0.1,
    left: -30,
    width: 80,
    height: 80,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderRadius: 40,
    zIndex: -1,
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: height * 0.15,
    right: -40,
    width: 100,
    height: 100,
    backgroundColor: 'rgba(129, 199, 132, 0.15)',
    borderRadius: 50,
    zIndex: -1,
  },
});