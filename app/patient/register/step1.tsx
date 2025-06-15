import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Animated,
    Dimensions,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

const { width, height } = Dimensions.get('window');

export default function Step1() {
    const router = useRouter();
    const [country, setCountry] = useState('India');
    const [govtId, setGovtId] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    // Animation values
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const logoScale = useRef(new Animated.Value(0.8)).current;
    const headingOpacity = useRef(new Animated.Value(0)).current;
    const headingTranslateX = useRef(new Animated.Value(-50)).current;
    
    // Input animations
    const nameInputOpacity = useRef(new Animated.Value(0)).current;
    const nameInputTranslateY = useRef(new Animated.Value(30)).current;
    const emailInputOpacity = useRef(new Animated.Value(0)).current;
    const emailInputTranslateY = useRef(new Animated.Value(30)).current;
    const pickerOpacity = useRef(new Animated.Value(0)).current;
    const pickerTranslateY = useRef(new Animated.Value(30)).current;
    const phoneInputOpacity = useRef(new Animated.Value(0)).current;
    const phoneInputTranslateY = useRef(new Animated.Value(30)).current;
    const govtInputOpacity = useRef(new Animated.Value(0)).current;
    const govtInputTranslateY = useRef(new Animated.Value(30)).current;
    const buttonOpacity = useRef(new Animated.Value(0)).current;
    const buttonScale = useRef(new Animated.Value(0.8)).current;

    // Interactive animations
    const floatingAnimation = useRef(new Animated.Value(0)).current;
    const buttonPressScale = useRef(new Animated.Value(1)).current;
    
    // Focus animations for inputs
    const nameFocusAnimation = useRef(new Animated.Value(0)).current;
    const emailFocusAnimation = useRef(new Animated.Value(0)).current;
    const phoneFocusAnimation = useRef(new Animated.Value(0)).current;
    const govtFocusAnimation = useRef(new Animated.Value(0)).current;

    // Validation shake animations
    const nameShakeAnimation = useRef(new Animated.Value(0)).current;
    const emailShakeAnimation = useRef(new Animated.Value(0)).current;
    const phoneShakeAnimation = useRef(new Animated.Value(0)).current;
    const govtShakeAnimation = useRef(new Animated.Value(0)).current;

    // Loading animation
    const loadingRotation = useRef(new Animated.Value(0)).current;
    const loadingScale = useRef(new Animated.Value(1)).current;

    // Message animations
    const errorOpacity = useRef(new Animated.Value(0)).current;
    const errorTranslateY = useRef(new Animated.Value(-20)).current;
    const successOpacity = useRef(new Animated.Value(0)).current;
    const successScale = useRef(new Animated.Value(0.8)).current;

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

        // Heading entrance
        setTimeout(() => {
            Animated.parallel([
                Animated.timing(headingOpacity, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.spring(headingTranslateX, {
                    toValue: 0,
                    tension: 50,
                    friction: 8,
                    useNativeDriver: true,
                }),
            ]).start();
        }, 400);

        // Sequential input animations
        const inputAnimations = [
            { opacity: nameInputOpacity, translateY: nameInputTranslateY },
            { opacity: emailInputOpacity, translateY: emailInputTranslateY },
            { opacity: pickerOpacity, translateY: pickerTranslateY },
            { opacity: phoneInputOpacity, translateY: phoneInputTranslateY },
            { opacity: govtInputOpacity, translateY: govtInputTranslateY },
        ];

        inputAnimations.forEach((anim, index) => {
            setTimeout(() => {
                Animated.parallel([
                    Animated.timing(anim.opacity, {
                        toValue: 1,
                        duration: 600,
                        useNativeDriver: true,
                    }),
                    Animated.spring(anim.translateY, {
                        toValue: 0,
                        tension: 50,
                        friction: 8,
                        useNativeDriver: true,
                    }),
                ]).start();
            }, 800 + (index * 150));
        });

        // Button entrance
        setTimeout(() => {
            Animated.parallel([
                Animated.timing(buttonOpacity, {
                    toValue: 1,
                    duration: 700,
                    useNativeDriver: true,
                }),
                Animated.spring(buttonScale, {
                    toValue: 1,
                    tension: 50,
                    friction: 8,
                    useNativeDriver: true,
                }),
            ]).start();
        }, 1600);
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
        Animated.loop(
            Animated.timing(loadingRotation, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            })
        ).start();

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
    };

    const stopLoadingAnimation = () => {
        loadingRotation.stopAnimation();
        loadingScale.stopAnimation();
        loadingRotation.setValue(0);
        loadingScale.setValue(1);
    };

    // Validation functions
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        return phone.length >= 10;
    };

    const validateGovtId = (id) => {
        return id.length >= 8;
    };

    // Shake animation for validation errors
    const shakeInput = (shakeAnimation) => {
        Animated.sequence([
            Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true }),
        ]).start();
    };

    // Show error message with animation
    const showError = (message) => {
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

    const showSuccess = (message) => {
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

    // Input focus animations
    const handleInputFocus = (focusAnimation) => {
        hideError();
        Animated.timing(focusAnimation, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const handleInputBlur = (focusAnimation) => {
        Animated.timing(focusAnimation, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const getIdLabel = () => {
        switch (country) {
            case 'India':
                return 'Aadhaar Number';
            case 'USA':
                return 'Social Security Number (SSN)';
            case 'UK':
                return 'National Insurance Number';
            default:
                return 'Government ID';
        }
    };

    const handleNext = async () => {
        hideError();
        
        // Validation
        let hasErrors = false;
        
        if (!fullName.trim()) {
            shakeInput(nameShakeAnimation);
            showError('Please enter your full name');
            hasErrors = true;
        }
        
        if (!email.trim()) {
            if (!hasErrors) {
                shakeInput(emailShakeAnimation);
                showError('Please enter your email address');
            }
            hasErrors = true;
        } else if (!validateEmail(email)) {
            if (!hasErrors) {
                shakeInput(emailShakeAnimation);
                showError('Please enter a valid email address');
            }
            hasErrors = true;
        }
        
        if (!phoneNumber.trim()) {
            if (!hasErrors) {
                shakeInput(phoneShakeAnimation);
                showError('Please enter your phone number');
            }
            hasErrors = true;
        } else if (!validatePhone(phoneNumber)) {
            if (!hasErrors) {
                shakeInput(phoneShakeAnimation);
                showError('Please enter a valid phone number');
            }
            hasErrors = true;
        }
        
        if (!govtId.trim()) {
            if (!hasErrors) {
                shakeInput(govtShakeAnimation);
                showError('Please enter your government ID');
            }
            hasErrors = true;
        } else if (!validateGovtId(govtId)) {
            if (!hasErrors) {
                shakeInput(govtShakeAnimation);
                showError('Please enter a valid government ID');
            }
            hasErrors = true;
        }

        if (hasErrors) return;

        // Button press animation
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
        ]).start();

        setIsLoading(true);
        startLoadingAnimation();

        try {
            const response = await fetch('http://10.0.1.105:8000/api/register/step1/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    full_name: fullName,
                    email,
                    phone_number: phoneNumber,
                    government_id: govtId,
                    country,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                await SecureStore.setItemAsync('email', email);
                
                showSuccess('Registration successful! Proceeding to next step...');
                
                setTimeout(() => {
                    router.push('/patient/register/step2');
                }, 1500);
            } else {
                const error = await response.json();
                showError(error.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            console.error('API Error:', err);
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

    const loadingRotate = loadingRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const getInputBorderColor = (focusAnimation) => {
        return focusAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(165, 214, 167, 1)', 'rgba(25, 135, 84, 1)'],
        });
    };

    const getShakeTranslate = (shakeAnimation) => {
        return shakeAnimation.interpolate({
            inputRange: [-10, 0, 10],
            outputRange: [-10, 0, 10],
        });
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
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

                {/* Animated Heading */}
                <Animated.Text
                    style={[
                        styles.heading,
                        {
                            opacity: headingOpacity,
                            transform: [{ translateX: headingTranslateX }]
                        }
                    ]}
                >
                    Step 1: Personal Information
                </Animated.Text>

                {/* Error Message */}
                {errors.general && (
                    <Animated.View
                        style={[
                            styles.errorContainer,
                            {
                                opacity: errorOpacity,
                                transform: [{ translateY: errorTranslateY }]
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

                {/* Animated Name Input */}
                <Animated.View
                    style={[
                        {
                            opacity: nameInputOpacity,
                            transform: [
                                { translateY: nameInputTranslateY },
                                { translateX: getShakeTranslate(nameShakeAnimation) }
                            ]
                        }
                    ]}
                >
                    <Animated.View
                        style={[
                            styles.inputContainer,
                            {
                                borderColor: getInputBorderColor(nameFocusAnimation),
                                borderWidth: 2,
                            }
                        ]}
                    >
                        <Ionicons name="person" size={20} color="#000000" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your full name"
                            value={fullName}
                            onChangeText={setFullName}
                            selectionColor="#4CAF50"
                            onFocus={() => handleInputFocus(nameFocusAnimation)}
                            onBlur={() => handleInputBlur(nameFocusAnimation)}
                        />
                    </Animated.View>
                </Animated.View>

                {/* Animated Email Input */}
                <Animated.View
                    style={[
                        {
                            opacity: emailInputOpacity,
                            transform: [
                                { translateY: emailInputTranslateY },
                                { translateX: getShakeTranslate(emailShakeAnimation) }
                            ]
                        }
                    ]}
                >
                    <Animated.View
                        style={[
                            styles.inputContainer,
                            {
                                borderColor: getInputBorderColor(emailFocusAnimation),
                                borderWidth: 2,
                            }
                        ]}
                    >
                        <Ionicons name="mail" size={20} color="#000000" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onFocus={() => handleInputFocus(emailFocusAnimation)}
                            onBlur={() => handleInputBlur(emailFocusAnimation)}
                        />
                    </Animated.View>
                </Animated.View>

                {/* Animated Country Picker */}
                <Animated.View
                    style={[
                        {
                            opacity: pickerOpacity,
                            transform: [{ translateY: pickerTranslateY }]
                        }
                    ]}
                >
                    <View style={styles.pickerContainer}>
                        <Ionicons name="flag" size={20} color="#000000" style={styles.pickerIcon} />
                        <Picker
                            selectedValue={country}
                            onValueChange={(itemValue) => setCountry(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select Country" value="" />
                            <Picker.Item label="India" value="India" />
                            <Picker.Item label="USA" value="USA" />
                            <Picker.Item label="UK" value="UK" />
                            <Picker.Item label="Other" value="Other" />
                        </Picker>
                    </View>
                </Animated.View>

                {/* Animated Phone Input */}
                <Animated.View
                    style={[
                        {
                            opacity: phoneInputOpacity,
                            transform: [
                                { translateY: phoneInputTranslateY },
                                { translateX: getShakeTranslate(phoneShakeAnimation) }
                            ]
                        }
                    ]}
                >
                    <Animated.View
                        style={[
                            styles.inputContainer,
                            {
                                borderColor: getInputBorderColor(phoneFocusAnimation),
                                borderWidth: 2,
                            }
                        ]}
                    >
                        <Ionicons name="call" size={20} color="#000000" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            keyboardType="phone-pad"
                            onFocus={() => handleInputFocus(phoneFocusAnimation)}
                            onBlur={() => handleInputBlur(phoneFocusAnimation)}
                        />
                    </Animated.View>
                </Animated.View>

                {/* Animated Government ID Input */}
                <Animated.View
                    style={[
                        {
                            opacity: govtInputOpacity,
                            transform: [
                                { translateY: govtInputTranslateY },
                                { translateX: getShakeTranslate(govtShakeAnimation) }
                            ]
                        }
                    ]}
                >
                    <Animated.View
                        style={[
                            styles.inputContainer,
                            {
                                borderColor: getInputBorderColor(govtFocusAnimation),
                                borderWidth: 2,
                            }
                        ]}
                    >
                        <Ionicons name="card" size={20} color="#000000" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder={`Enter your ${getIdLabel()}`}
                            value={govtId}
                            onChangeText={setGovtId}
                            keyboardType="numeric"
                            onFocus={() => handleInputFocus(govtFocusAnimation)}
                            onBlur={() => handleInputBlur(govtFocusAnimation)}
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
                            <Ionicons name="refresh" size={24} color="#198754" />
                        </Animated.View>
                        <Text style={styles.loadingText}>Processing registration...</Text>
                    </View>
                )}

                {/* Animated Button */}
                <Animated.View
                    style={[
                        {
                            opacity: buttonOpacity,
                            transform: [
                                { scale: buttonScale },
                                { scale: buttonPressScale }
                            ]
                        }
                    ]}
                >
                    <TouchableOpacity
                        style={[styles.button, isLoading && styles.buttonDisabled]}
                        onPress={handleNext}
                        disabled={isLoading}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>
                            {isLoading ? 'Processing...' : 'Next'}
                        </Text>
                        {!isLoading && (
                            <Ionicons name="arrow-forward" size={20} color="white" style={styles.buttonIcon} />
                        )}
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
                />
                <Animated.View
                    style={[
                        styles.decorativeCircle2,
                        {
                            opacity: buttonOpacity,
                            transform: [{ translateY: Animated.multiply(floatingTranslateY, -0.5) }]
                        }
                    ]}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FDF8',
    },
    scrollContainer: {
        padding: 20,
        paddingTop: 60,
        minHeight: height,
    },
    logo: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#198754',
        textAlign: 'center',
        marginBottom: 25,
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 25,
        textAlign: 'left',
        color: 'black',
        letterSpacing: 1,
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F8E9',
        borderRadius: 25,
        marginTop: 15,
        paddingHorizontal: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    icon: {
        marginRight: 10,
        color: 'black',
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: '#000',
        backgroundColor: 'transparent',
        paddingVertical: 0,
        paddingHorizontal: 5,
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F8E9',
        borderRadius: 25,
        marginTop: 15,
        paddingHorizontal: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 2,
        borderColor: 'rgba(165, 214, 167, 1)',
    },
    pickerIcon: {
        marginRight: 10,
        color: 'black',
    },
    picker: {
        flex: 1,
        height: 50,
        color: '#000',
    },
    loadingContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    loadingSpinner: {
        marginBottom: 10,
    },
    loadingText: {
        color: '#198754',
        fontSize: 16,
        fontWeight: '500',
    },
    button: {
        backgroundColor: '#198754',
        padding: 15,
        borderRadius: 25,
        marginTop: 30,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        elevation: 4,
        shadowColor: '#198754',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    buttonIcon: {
        marginLeft: 8,
    },
    decorativeCircle1: {
        position: 'absolute',
        top: 100,
        left: -30,
        width: 80,
        height: 80,
        backgroundColor: 'rgba(25, 135, 84, 0.1)',
        borderRadius: 40,
        zIndex: -1,
    },
    decorativeCircle2: {
        position: 'absolute',
        bottom: 100,
        right: -40,
        width: 100,
        height: 100,
        backgroundColor: 'rgba(76, 175, 80, 0.15)',
        borderRadius: 50,
        zIndex: -1,
    },
});