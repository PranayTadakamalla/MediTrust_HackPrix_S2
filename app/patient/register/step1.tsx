import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';


export default function Step1() {
    const router = useRouter();
    const [country, setCountry] = useState('India');
    const [govtId, setGovtId] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

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

    const handleNext = async() => {
        if (
            fullName.trim() !== '' &&
            email.trim() !== '' &&
            phoneNumber.trim() !== '' &&
            govtId.trim() !== ''
        ) {
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
                    
                    // Optionally save a token or user id
                    // await AsyncStorage.setItem('user_id', data.id.toString());
                    await SecureStore.setItemAsync('email', email);
                    router.push('/patient/register/step2');
                } else {
                    const error = await response.json();
                    alert(`Error: ${error.message || 'Something went wrong'}`);
                }
            } catch (err) {
                console.error('API Error:', err);
                alert('Network error. Please try again.');
            }
        } else {
            alert('Please fill all the fields correctly.');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.logo}>MediTrust</Text>
                <Text style={styles.heading}>Step 1: </Text> 
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your full name" 
                        value={fullName}
                        onChangeText={setFullName}
                        selectionColor="#4CAF50" 
                    />
                    <Ionicons name="person" size={20} color="#000000" style={styles.icon} /> 
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email" 
                        value={email}
                        onChangeText={setEmail} 
                        keyboardType="email-address"
                    />
                    <Ionicons name="mail" size={20} color="#000000" style={styles.icon} />
                </View>
                <Picker  
                    selectedValue={country} 
                    onValueChange={(itemValue: string) => setCountry(itemValue)}
                    style={styles.picker} 
                > 
                    <Picker.Item label="Select Country" value="" />
                    <Picker.Item label="India" value="India" />
                    <Picker.Item label="USA" value="USA" /> 
                    <Picker.Item label="UK" value="UK" /> 
                    <Picker.Item label="Other" value="Other" />
                </Picker>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your phone number"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        keyboardType="phone-pad" 
                    /> 
                    <Ionicons name="call" size={20} color="#000000" style={styles.icon} /> 
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder={`Enter your ${getIdLabel()}`}
                        value={govtId}
                        onChangeText={setGovtId}
                        keyboardType="numeric" 
                    /> 
                    <Ionicons name="card" size={20} color="#000000" style={styles.icon} />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    logo: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#198754', 
        textAlign: 'center',
        marginBottom: 25, 
    },
    container: {
        flex: 1,
        backgroundColor: '#fff', 
    },
    scrollContainer: {
        padding: 20,
        justifyContent: 'center',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 25, 
        textAlign: 'left', 
        color: 'black', 
        letterSpacing: 1,
    },
    label: {
        fontSize: 16,
        marginTop: 15,
        color: '#000000',
        opacity: 0.7,
    },
    picker: {
        height: 50,
        width: '100%',
        backgroundColor: '#F1F8E9',
        borderRadius: 8,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#A5D6A7',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F8E9', 
        borderRadius: 25, 
        marginTop: 10,
        paddingHorizontal: 15,
    },
    icon: {
        marginRight: 10,
        color: 'black', 
        marginLeft: 5, 
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: '#000',
        backgroundColor: 'transparent', 
        paddingVertical: 0,
        paddingHorizontal: 5,
        borderWidth: 0,
    },
    button: {
        backgroundColor: '#198754', 
        padding: 15,
        borderRadius: 25,
        marginTop: 30,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
});
