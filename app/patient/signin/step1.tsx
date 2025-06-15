import React, { useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Animated, Dimensions, Keyboard } from 'react-native';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

const { width, height } = Dimensions.get('window');

// Define the type for errors
interface ErrorState {
  general?: string;
  email?: string;
  password?: string;
}


export default function Step1() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<ErrorState>({});
    const [successMessage, setSuccessMessage] = useState('');

    // Animation values - Native driver compatible (transforms only)
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const logoScale = useRef(new Animated.Value(0.8)).current;
    const titleOpacity = useRef(new Animated.Value(0)).current;
    const titleTranslateY = useRef(new Animated.Value(30)).current;
    
    // Email input animations - separate for transforms and colors
    const emailInputOpacity = useRef(new Animated.Value(0)).current;
    const emailInputTranslateX = useRef(new Animated.Value(-50)).current;
    const emailBorderColorAnimation = useRef(new Animated.Value(0)).current;
    const emailShakeAnimation = useRef(new Animated.Value(0)).current;
    
    // Password input animations - separate for transforms and colors
    const passwordInputOpacity = useRef(new Animated.Value(0)).current;
    const passwordInputTranslateX = useRef(new Animated.Value(50)).current;
    const passwordBorderColorAnimation = useRef(new Animated.Value(0)).current;
    const passwordShakeAnimation = useRef(new Animated.Value(0)).current;
    
    const buttonsOpacity = useRef(new Animated.Value(0)).current;
    const buttonsScale = useRef(new Animated.Value(0.8)).current;
    
    // Floating animation
    const floatingAnimation = useRef(new Animated.Value(0)).current;
    const backButtonScale = useRef(new Animated.Value(1)).current;
    const forwardButtonScale = useRef(new Animated.Value(1)).current;

    // Error and success message animations
    const errorOpacity = useRef(new Animated.Value(0)).current;
    const errorTranslateY = useRef(new Animated.Value(-20)).current;
    const errorScale = useRef(new Animated.Value(0.8)).current;
    const successOpacity = useRef(new Animated.Value(0)).current;
    const successScale = useRef(new Animated.Value(0.8)).current;

    // Loading animation
    const [isLoading, setIsLoading] = useState(false);
    const loadingRotation = useRef(new Animated.Value(0)).current;
    const loadingScale = useRef(new Animated.Value(1)).current;

    // Progress dots animation
    const dot1Opacity = useRef(new Animated.Value(0.3)).current;
    const dot2Opacity = useRef(new Animated.Value(0.3)).current;
    const dot3Opacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        startEntranceAnimations();
        startFloatingAnimation();
    }, []);

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

        // Email input entrance (slide from left)
        setTimeout(() => {
            Animated.parallel([
                Animated.timing(emailInputOpacity, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.spring(emailInputTranslateX, {
                    toValue: 0,
                    tension: 50,
                    friction: 8,
                    useNativeDriver: true,
                }),
            ]).start();
        }, 800);

        // Password input entrance (slide from right)
        setTimeout(() => {
            Animated.parallel([
                Animated.timing(passwordInputOpacity, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.spring(passwordInputTranslateX, {
                    toValue: 0,
                    tension: 50,
                    friction: 8,
                    useNativeDriver: true,
                }),
            ]).start();
        }, 1000);

        // Buttons entrance
        setTimeout(() => {
            Animated.parallel([
                Animated.timing(buttonsOpacity, {
                    toValue: 1,
                    duration: 700,
                    useNativeDriver: true,
                }),
                Animated.spring(buttonsScale, {
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

    const startLoadingAnimation = () => {
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
        loadingRotation.stopAnimation();
        loadingScale.stopAnimation();
        dot1Opacity.stopAnimation();
        dot2Opacity.stopAnimation();
        dot3Opacity.stopAnimation();
        loadingRotation.setValue(0);
        loadingScale.setValue(1);
    };

    // Validation functions
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string): boolean => {
        return password.length >= 6;
    };

    // Shake animation for validation errors
    const shakeInput = (shakeAnimation: Animated.Value) => {
        Animated.sequence([
            Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true }),
        ]).start();
    };

    // Show error message with animation
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

        // Auto hide after 4 seconds
        setTimeout(() => {
            hideError();
        }, 4000);
    };

    // Hide error message with animation
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

    // Show success message with animation
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

    // Input focus animations - using separate values for color animations
    const handleEmailFocus = () => {
        hideError();
        Animated.timing(emailBorderColorAnimation, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false, // Color animations need this
        }).start();
    };

    const handleEmailBlur = () => {
        Animated.timing(emailBorderColorAnimation, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();

        // Validate email on blur
        if (email && !validateEmail(email)) {
            shakeInput(emailShakeAnimation);
            showError('Please enter a valid email address');
        }
    };

    const handlePasswordFocus = () => {
        hideError();
        Animated.timing(passwordBorderColorAnimation, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false, // Color animations need this
        }).start();
    };

    const handlePasswordBlur = () => {
        Animated.timing(passwordBorderColorAnimation, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();

        // Validate password on blur
        if (password && !validatePassword(password)) {
            shakeInput(passwordShakeAnimation);
            showError('Password must be at least 6 characters long');
        }
    };

    // Button press animations
    const handleBackPress = () => {
        Animated.sequence([
            Animated.timing(backButtonScale, {
                toValue: 0.9,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(backButtonScale, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start(() => {
            router.push('/patient/register/Select');
        });
    };

    const handleNext = async () => {
        // Hide any existing errors
        hideError();

        // Validate inputs
        let hasErrors = false;
        
        if (!email.trim()) {
            shakeInput(emailShakeAnimation);
            showError('Please enter your email address');
            hasErrors = true;
        } else if (!validateEmail(email)) {
            shakeInput(emailShakeAnimation);
            showError('Please enter a valid email address');
            hasErrors = true;
        }

        if (!password.trim()) {
            if (!hasErrors) {
                shakeInput(passwordShakeAnimation);
                showError('Please enter your password');
            }
            hasErrors = true;
        } else if (!validatePassword(password)) {
            if (!hasErrors) {
                shakeInput(passwordShakeAnimation);
                showError('Password must be at least 6 characters long');
            }
            hasErrors = true;
        }

        if (hasErrors) return;

        // Start loading animation
        setIsLoading(true);
        startLoadingAnimation();

        // Button press animation
        Animated.sequence([
            Animated.timing(forwardButtonScale, {
                toValue: 0.9,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(forwardButtonScale, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();


    const handleNext = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Validation Error', 'Please enter both email and password');
            return;
        }


        try {
            const response = await fetch('http://10.0.1.105:8000/api/login/step1/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                showError(errorData.message || 'Login failed. Please check your credentials.');
                return;
            }

            // Show success message
            showSuccess('Login successful! Redirecting...');
            
            await SecureStore.setItemAsync('email', email);
            
            // Delay navigation to show success message
            setTimeout(() => {
                router.push('/patient/signin/step2');
            }, 1500);

        } catch (error) {
            console.error('Login error:', error);
            showError('Network error. Please check your connection and try again.');
        } finally {
            setIsLoading(false);
            stopLoadingAnimation();
        }
    };

    // Interpolations
    const floatingTranslateY = floatingAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -8],
    });

    const emailInputBorderColor = emailBorderColorAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(169, 213, 172, 1)', 'rgba(46, 125, 50, 1)'],
    });

    const passwordInputBorderColor = passwordBorderColorAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(169, 213, 172, 1)', 'rgba(46, 125, 50, 1)'],
    });

    const loadingRotate = loadingRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const emailShakeTranslate = emailShakeAnimation.interpolate({
        inputRange: [-10, 0, 10],
        outputRange: [-10, 0, 10],
    });

    const passwordShakeTranslate = passwordShakeAnimation.interpolate({
        inputRange: [-10, 0, 10],
        outputRange: [-10, 0, 10],
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
                MediTrust
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
                Secure Patient Access: Your Health,{"\n"}Your Control
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

            {/* Email Input - Separated into two layers */}
            <Animated.View
                style={[
                    {
                        opacity: emailInputOpacity,
                        transform: [{ translateX: emailInputTranslateX }]
                    }
                ]}
            >
                <Animated.View
                    style={[
                        styles.inputWrapper,
                        {
                            borderColor: emailInputBorderColor,
                            borderWidth: 2,
                            transform: [{ translateX: emailShakeTranslate }]
                        }
                    ]}
                >
                    <Ionicons name="mail" size={20} color="black" style={styles.icon} />
                    <TextInput
                        placeholder="Enter Email"
                        placeholderTextColor="#666"
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                        onFocus={handleEmailFocus}
                        onBlur={handleEmailBlur}
                    />
                </Animated.View>
            </Animated.View>

            {/* Password Input - Separated into two layers */}
            <Animated.View
                style={[
                    {
                        opacity: passwordInputOpacity,
                        transform: [{ translateX: passwordInputTranslateX }]
                    }
                ]}
            >
                <Animated.View
                    style={[
                        styles.inputWrapper,
                        {
                            borderColor: passwordInputBorderColor,
                            borderWidth: 2,
                            transform: [{ translateX: passwordShakeTranslate }]
                        }
                    ]}
                >
                    <Ionicons name="lock-closed" size={20} color="black" style={styles.icon} />
                    <TextInput
                        placeholder="Enter Password"
                        placeholderTextColor="#666"
                        secureTextEntry
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        onFocus={handlePasswordFocus}
                        onBlur={handlePasswordBlur}
                    />
                </Animated.View>
            </Animated.View>

            {/* Loading Indicator */}
            {isLoading && (
                <View style={styles.loadingContainer}>
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
                        <Ionicons name="refresh" size={24} color="#2e7d32" />
                    </Animated.View>
                    <Text style={styles.loadingText}>Signing you in...</Text>
                    <View style={styles.progressDots}>
                        <Animated.View style={[styles.dot, { opacity: dot1Opacity }]} />
                        <Animated.View style={[styles.dot, { opacity: dot2Opacity }]} />
                        <Animated.View style={[styles.dot, { opacity: dot3Opacity }]} />
                    </View>
                </View>
            )}

            {/* Animated Navigation Buttons */}
            <Animated.View
                style={[
                    styles.navButtons,
                    {
                        opacity: buttonsOpacity,
                        transform: [{ scale: buttonsScale }]
                    }
                ]}
            >
                <Animated.View style={{ transform: [{ scale: backButtonScale }] }}>
                    <TouchableOpacity 
                        style={styles.circleButton} 
                        onPress={handleBackPress}
                        activeOpacity={0.8}
                        disabled={isLoading}
                    >
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                </Animated.View>
                
                <Animated.View style={{ transform: [{ scale: forwardButtonScale }] }}>
                    <TouchableOpacity
                        style={[styles.circleButton, isLoading && styles.loadingButton]}
                        onPress={handleNext}
                        disabled={isLoading}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="arrow-forward" size={24} color="black" />
                    </TouchableOpacity>
                </Animated.View>
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
            <Animated.View
                style={[
                    styles.decorativeCircle3,
                    {
                        opacity: titleOpacity,
                        transform: [{ translateY: Animated.multiply(floatingTranslateY, 0.7) }]
                    }
                ]}
            />
                Alert.alert('Registration Failed', errorData.message || 'Something went wrong.');
                return;
            }

            await SecureStore.setItemAsync('email', email); // Store email for next steps
            router.push('/patient/signin/step2');
        } catch (error) {
            console.error('Registration error:', error);
            Alert.alert('Network Error', 'Could not connect to the server.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>MediTrust</Text>
            <Text style={styles.title}>
                Secure Patient Access: Your Health,{"\n"}Your Control
            </Text>

            {/* Email Input */}
            <View style={styles.inputWrapper}>
                <Ionicons name="mail" size={20} color="black" style={styles.icon} />
                <TextInput
                    placeholder="Enter Email"
                    placeholderTextColor="#000"
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            {/* Password Input */}
            <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed" size={20} color="black" style={styles.icon} />
                <TextInput
                    placeholder="Enter Password"
                    placeholderTextColor="#000"
                    secureTextEntry
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            {/* Navigation Buttons */}
            <View style={styles.navButtons}>
                <TouchableOpacity style={styles.circleButton} onPress={() => router.push('/patient/register/Select')}>
                                <Ionicons name="arrow-back" size={24} color="black" />
                              </TouchableOpacity>
                
                <TouchableOpacity
                    style={styles.circleButton}
                    onPress={handleNext}
                >
                    <Ionicons name="arrow-forward" size={24} color="black" />
                </TouchableOpacity>
            </View>

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
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 26,
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
        color: '#000',
        textAlign: 'center',
        marginBottom: 40,

    },
    inputWrapper: {
        flexDirection: 'row',
        backgroundColor: '#A9D5AC',
        borderRadius: 30,
        alignItems: 'center',
        width: '100%',
        marginVertical: 12,
        paddingHorizontal: 20,
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
        fontSize: 16,
        color: '#000',
    },
    icon: {
        marginRight: 12,
    },
    loadingContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    loadingSpinner: {
        marginBottom: 10,
    },
    loadingText: {
        color: '#2e7d32',
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 10,
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
        marginVertical: 10,
        paddingHorizontal: 20,
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 14,
        color: '#000',
    },
    icon: {
        marginRight: 10,

    },
    navButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
        marginTop: 30,
    },
    circleButton: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: '#A9D5AC',
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
    loadingButton: {
        opacity: 0.6,
    },
    decorativeCircle1: {
        position: 'absolute',
        top: height * 0.12,
        left: -30,
        width: 80,
        height: 80,
        backgroundColor: 'rgba(46, 125, 50, 0.15)',
        borderRadius: 40,
        zIndex: -1,
    },
    decorativeCircle2: {
        position: 'absolute',
        bottom: height * 0.15,
        right: -40,
        width: 100,
        height: 100,
        backgroundColor: 'rgba(169, 213, 172, 0.3)',
        borderRadius: 50,
        zIndex: -1,
    },
    decorativeCircle3: {
        position: 'absolute',
        top: height * 0.3,
        right: -20,
        width: 60,
        height: 60,
        backgroundColor: 'rgba(25, 135, 84, 0.12)',
        borderRadius: 30,
        zIndex: -1,
    },
});
        marginTop: 40,
    },
    circleButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#A9D5AC',
        justifyContent: 'center',
        alignItems: 'center',
    },
});


