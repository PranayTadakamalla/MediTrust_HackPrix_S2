import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

export default function Step1() {
    const router = useRouter();
    const [country, setCountry] = useState('India');
    const [licenseId, setLicenseId] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleNext = async () => {
        if (
            fullName.trim() !== '' &&
            email.trim() !== '' &&
            phoneNumber.trim() !== '' &&
            licenseId.trim() !== ''
        ) {
            try {
                const response = await fetch('http://10.0.1.105:8000/api/doc_reg/step1/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fullName,
                        email,
                        phoneNumber,
                        country,
                        licenseId,
                    }),
                });

                if (response.ok) {
                    await SecureStore.setItemAsync('email', email);
                    router.push('/doctor/step2');
                } else {
                    console.error('Failed to register doctor:', await response.text());
                }
            } catch (error) {
                console.error('Error while sending data to backend:', error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Step 1: Verify Your Identity</Text>

            <Text style={styles.label}></Text>
            <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color="#888" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Enter your full name"
                    value={fullName}
                    onChangeText={setFullName}
                />
            </View>

            <Text style={styles.label}></Text>
            <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#888" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
            </View>

            <Text style={styles.label}>Select Country</Text>
            <Picker
                selectedValue={country}
                onValueChange={(itemValue: string) => setCountry(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="India" value="India" />
                <Picker.Item label="USA" value="USA" />
                <Picker.Item label="UK" value="UK" />
                <Picker.Item label="Other" value="Other" />
            </Picker>

            <Text style={styles.label}></Text>
            <View style={styles.inputContainer}>
                <Ionicons name="call-outline" size={20} color="#888" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                />
            </View>

            <Text style={styles.label}></Text>
            <View style={styles.inputContainer}>
                <Ionicons name="card-outline" size={20} color="#888" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Enter your License ID"
                    value={licenseId}
                    onChangeText={setLicenseId}
                    keyboardType="default"
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center',backgroundColor: '#D1E5D3', },
    heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
    label: { fontSize: 16, marginTop: 10 },
    picker: { height: 50, width: '100%' },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginTop: 10,
        paddingHorizontal: 10,
        
    },
    icon: { marginRight: 10 },
    input: { flex: 1, height: 50 },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
        marginTop: 30,
        alignItems: 'center',
    },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    
});
