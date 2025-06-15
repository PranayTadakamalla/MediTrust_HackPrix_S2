import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, Image, StyleSheet, Animated, Dimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const { width, height } = Dimensions.get('window');

export default function RoleSelection() {
    const router = useRouter();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);

    const [fontsLoaded] = useFonts({
        IstokWeb: require('../assets/fonts/IstokWeb-Regular.ttf'),
    });

    // Animation values
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const logoScale = useRef(new Animated.Value(0.5)).current;
    const titleOpacity = useRef(new Animated.Value(0)).current;
    const titleScale = useRef(new Animated.Value(0.8)).current;
    const subtitleOpacity = useRef(new Animated.Value(0)).current;
    const subtitleTranslateY = useRef(new Animated.Value(20)).current;
    const buttonsOpacity = useRef(new Animated.Value(0)).current;
    const buttonsTranslateY = useRef(new Animated.Value(50)).current;
    const patientButtonScale = useRef(new Animated.Value(0.9)).current;
    const doctorButtonScale = useRef(new Animated.Value(0.9)).current;
    
    // Transition animations
    const transitionScale = useRef(new Animated.Value(0)).current;
    const transitionOpacity = useRef(new Animated.Value(0)).current;
    const backgroundOpacity = useRef(new Animated.Value(0)).current;
    
    // 3D rotation effects
    const patientRotateY = useRef(new Animated.Value(0)).current;
    const doctorRotateY = useRef(new Animated.Value(0)).current;
    const floatingAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (fontsLoaded) {
            startEntranceAnimations();
            startFloatingAnimation();
        }
    }, [fontsLoaded]);

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

        // Title pop-up (delayed)
        setTimeout(() => {
            Animated.parallel([
                Animated.timing(titleOpacity, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.spring(titleScale, {
                    toValue: 1,
                    tension: 80,
                    friction: 8,
                    useNativeDriver: true,
                }),
            ]).start();
        }, 400);

        // Subtitle fade in (more delayed)
        setTimeout(() => {
            Animated.parallel([
                Animated.timing(subtitleOpacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.spring(subtitleTranslateY, {
                    toValue: 0,
                    tension: 50,
                    friction: 8,
                    useNativeDriver: true,
                }),
            ]).start();
        }, 800);

        // Buttons entrance (most delayed)
        setTimeout(() => {
            Animated.parallel([
                Animated.timing(buttonsOpacity, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.spring(buttonsTranslateY, {
                    toValue: 0,
                    tension: 50,
                    friction: 8,
                    useNativeDriver: true,
                }),
                Animated.spring(patientButtonScale, {
                    toValue: 1,
                    tension: 50,
                    friction: 8,
                    useNativeDriver: true,
                }),
                Animated.spring(doctorButtonScale, {
                    toValue: 1,
                    tension: 50,
                    friction: 8,
                    useNativeDriver: true,
                }),
            ]).start();
        }, 1200);
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

    const handleRoleSelect = (role) => {
        if (isTransitioning) return;
        
        setIsTransitioning(true);
        setSelectedRole(role);

        // Button press animation
        const buttonScale = role === 'patient' ? patientButtonScale : doctorButtonScale;
        
        Animated.sequence([
            Animated.timing(buttonScale, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(buttonScale, {
                toValue: 1.1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();

        // Full screen transition
        setTimeout(() => {
            Animated.parallel([
                Animated.timing(backgroundOpacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.spring(transitionScale, {
                    toValue: 1,
                    tension: 50,
                    friction: 8,
                    useNativeDriver: true,
                }),
                Animated.timing(transitionOpacity, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                // Navigate after animation completes
                setTimeout(() => {
                    if (role === 'patient') {
                        router.push('/patient/register/Select');
                    } else {
                        router.push('/doctor/choose');
                    }
                }, 500);
            });
        }, 300);
    };

    const handleButtonPressIn = (role) => {
        const rotateY = role === 'patient' ? patientRotateY : doctorRotateY;
        Animated.timing(rotateY, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const handleButtonPressOut = (role) => {
        const rotateY = role === 'patient' ? patientRotateY : doctorRotateY;
        Animated.timing(rotateY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    if (!fontsLoaded) {
        return null;
    }

    // Interpolations
    const floatingTranslateY = floatingAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -8],
    });

    const patientRotateYInterpolate = patientRotateY.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '5deg'],
    });

    const doctorRotateYInterpolate = doctorRotateY.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '-5deg'],
    });

    const getTransitionIcon = () => {
        return selectedRole === 'patient' ? 'heart' : 'medkit';
    };

    return (
        <View style={styles.container}>
            {/* Animated Logo */}
            <Animated.View
                style={[
                    styles.logoContainer,
                    {
                        opacity: logoOpacity,
                        transform: [
                            { scale: logoScale },
                            { translateY: floatingTranslateY }
                        ]
                    }
                ]}
            >
                <Image
                    source={require('../assets/images/Logo1.jpg')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.logoText}>MediTrust</Text>
            </Animated.View>

            {/* Animated Main Content */}
            <View style={styles.contentContainer}>
                {/* Animated Title */}
                <Animated.Text
                    style={[
                        styles.title,
                        {
                            opacity: titleOpacity,
                            transform: [
                                { scale: titleScale },
                                { translateY: floatingTranslateY }
                            ]
                        }
                    ]}
                >
                    Who are you?
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
                    Select your role to continue
                </Animated.Text>

                {/* Animated Buttons */}
                <Animated.View
                    style={[
                        styles.buttonsContainer,
                        {
                            opacity: buttonsOpacity,
                            transform: [{ translateY: buttonsTranslateY }]
                        }
                    ]}
                >
                    {/* Patient Button */}
                    <Animated.View
                        style={[
                            styles.buttonWrapper,
                            {
                                transform: [
                                    { scale: patientButtonScale },
                                    { rotateY: patientRotateYInterpolate },
                                    { perspective: 1000 }
                                ]
                            }
                        ]}
                    >
                        <Pressable
                            onPress={() => handleRoleSelect('patient')}
                            onPressIn={() => handleButtonPressIn('patient')}
                            onPressOut={() => handleButtonPressOut('patient')}
                            style={styles.roleButton}
                        >
                            <Ionicons name="heart-outline" size={24} color="white" style={styles.buttonIcon} />
                            <Text style={styles.buttonText}>Patient</Text>
                        </Pressable>
                    </Animated.View>

                    {/* Doctor Button */}
                    <Animated.View
                        style={[
                            styles.buttonWrapper,
                            {
                                transform: [
                                    { scale: doctorButtonScale },
                                    { rotateY: doctorRotateYInterpolate },
                                    { perspective: 1000 }
                                ]
                            }
                        ]}
                    >
                        <Pressable
                            onPress={() => handleRoleSelect('doctor')}
                            onPressIn={() => handleButtonPressIn('doctor')}
                            onPressOut={() => handleButtonPressOut('doctor')}
                            style={styles.roleButton}
                        >
                            <Ionicons name="medkit-outline" size={24} color="white" style={styles.buttonIcon} />
                            <Text style={styles.buttonText}>Doctor</Text>
                        </Pressable>
                    </Animated.View>
                </Animated.View>
            </View>

            {/* Full Screen Transition Overlay */}
            {isTransitioning && (
                <Animated.View
                    style={[
                        styles.transitionOverlay,
                        {
                            opacity: backgroundOpacity,
                        }
                    ]}
                >
                    <Animated.View
                        style={[
                            styles.transitionIconContainer,
                            {
                                opacity: transitionOpacity,
                                transform: [{ scale: transitionScale }]
                            }
                        ]}
                    >
                        <Ionicons 
                            name={getTransitionIcon()} 
                            size={120} 
                            color="white" 
                        />
                    </Animated.View>
                </Animated.View>
            )}

            {/* Decorative Elements */}
            <Animated.View
                style={[
                    styles.decorativeCircle1,
                    {
                        opacity: titleOpacity,
                        transform: [{ translateY: floatingTranslateY }]
                    }
                ]}
            />
            <Animated.View
                style={[
                    styles.decorativeCircle2,
                    {
                        opacity: buttonsOpacity,
                        transform: [{ translateY: Animated.multiply(floatingTranslateY, -0.5) }]
                    }
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    logoContainer: {
        position: 'absolute',
        top: 60,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 2,
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 8,
    },
    logoText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#198754',
        fontFamily: 'IstokWeb',
    },
    contentContainer: {
        alignItems: 'center',
        zIndex: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'IstokWeb',
        color: '#34495e',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 50,
        fontFamily: 'IstokWeb',
        color: '#7f8c8d',
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 10,
    },
    buttonWrapper: {
        width: '42%',
    },
    roleButton: {
        backgroundColor: '#2e7d32',
        padding: 24,
        borderRadius: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        // Static shadow properties that work with animations
        ...Platform.select({
            ios: {
                shadowColor: '#2e7d32',
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowOpacity: 0.25,
                shadowRadius: 6,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    buttonIcon: {
        marginRight: 12,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'IstokWeb',
        fontWeight: '600',
    },
    transitionOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#2e7d32',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    transitionIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    decorativeCircle1: {
        position: 'absolute',
        top: height * 0.2,
        left: -30,
        width: 80,
        height: 80,
        backgroundColor: 'rgba(46, 125, 50, 0.1)',
        borderRadius: 40,
        zIndex: 0,
    },
    decorativeCircle2: {
        position: 'absolute',
        bottom: height * 0.25,
        right: -40,
        width: 100,
        height: 100,
        backgroundColor: 'rgba(25, 135, 84, 0.08)',
        borderRadius: 50,
        zIndex: 0,
    },
});