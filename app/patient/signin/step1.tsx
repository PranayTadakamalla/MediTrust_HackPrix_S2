import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

export default function Step1() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
    inputWrapper: {
        flexDirection: 'row',
        backgroundColor: '#A9D5AC',
        borderRadius: 30,
        alignItems: 'center',
        width: '100%',
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
