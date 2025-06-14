import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function EmergencyAccessScreen() {
    const router = useRouter();
    const [patientURN, setPatientURN] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const [aadhaarSSN, setAadhaarSSN] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const handleEmergencyAccess = () => {
        const requestData = {
            patientURN,
            licenseNumber,
            aadhaarSSN,
        };

        fetch('http://10.0.1.105:8000/api/emergency/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Success:', data);
                
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Green Curve at Top Right */}
                <View style={styles.greenCurve} />

                {/* Title */}
                <Text style={styles.title}>Doctor</Text>

                {/* Heading */}
                <Text style={styles.heading}>Emergency Access</Text>

                {/* Input Fields */}
                <View style={styles.inputGroup}>
                    <View style={styles.inputContainer}>
                        <Ionicons name="person" size={20} color="#333" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            value={patientURN}
                            onChangeText={setPatientURN}
                            placeholder="Enter Patient URN"
                            placeholderTextColor="#666"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons name="document-text" size={20} color="#333" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            value={licenseNumber}
                            onChangeText={setLicenseNumber}
                            placeholder="Enter License Number"
                            placeholderTextColor="#666"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons name="card-outline" size={20} color="#333" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            value={aadhaarSSN}
                            onChangeText={setAadhaarSSN}
                            placeholder="Enter Aadhaar Number/SSN"
                            placeholderTextColor="#666"
                        />
                    </View>
                </View>

                {/* Emergency Access Button */}
                <TouchableOpacity style={styles.button} onPress={handleEmergencyAccess}>
                    <Text style={styles.buttonText}>Emergency Access</Text>
                </TouchableOpacity>

                {/* Thumbnail Image */}
                {patientURN && licenseNumber && aadhaarSSN && (
                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible(true);
                        }}
                    >
                        <Image
                            source={{ uri: "http://10.0.1.105:8000/uploads/f1e95ddc-62b7-43bc-96e3-d5ff0d711ba5.jpeg" }}
                            style={styles.thumbnailImage}
                        />
                    </TouchableOpacity>
                )}

                {/* Modal for Fullscreen Image */}
                {modalVisible && (
                    <View style={styles.modalContainer}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Ionicons name="close" size={24} color="#fff" />
                        </TouchableOpacity>
                        <Image
                            source={{ uri: "http://10.15.54.177:8000/uploads/f1e95ddc-62b7-43bc-96e3-d5ff0d711ba5.jpeg" }}
                            style={styles.fullscreenImage}
                        />
                    </View>
                )}
            </ScrollView>

            {/* Bottom Navigation Bar */}
            <View style={styles.navBar}>
                   <TouchableOpacity style={styles.navItem} onPress={() => router.push('/doctor/dashboard')}>
                      <Ionicons name="home-outline" size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.navItem}
                      onPress={() => router.push('/doctor/notification')}
                    >
                      <Ionicons name="notifications-outline" size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.navItem}
                      onPress={() => router.push('/doctor/view')}
                    >
                      <Ionicons name="medkit-outline" size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.navItem}
                      onPress={() => router.push('/doctor/profile')}
                    >
                      <Ionicons name="person-outline" size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.navItem}
                      onPress={() => router.push('/doctor/emergency')}
                    >
                      <Ionicons name="eye-outline" size={24} color="#000" />
                    </TouchableOpacity>
                  </View>
            
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8F5E9', // Light green background
    },
    scrollContent: {
        flexGrow: 1,
        padding: 20,
    },
    greenCurve: {
        position: 'absolute',
        top: -100, // Adjust to position the curve off-screen
        right: -100, // Adjust to position the curve off-screen
        width: 200, // Approximate size based on image
        height: 200, // Approximate size based on image
        backgroundColor: '#2D9B51', // Green color from MediTrust theme
        borderRadius: 100, // Half of width/height for a circle
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        position: 'absolute',
        top: 20,
        left: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
        textAlign: 'center',
        marginBottom: 30,
        marginTop: 50, // Space below title
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F8E9', // Light green input background
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#A5D6A7',
        marginBottom: 15,
        paddingHorizontal: 15,
    },
    icon: {
        marginRight: 10,
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
    button: {
        backgroundColor: '#2D9B51', // Green button
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    thumbnailImage: {
        width: 100,
        height: 100,
        marginTop: 20,
        borderRadius: 10,
    },
    modalContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1,
    },
    fullscreenImage: {
        width: '90%',
        height: '90%',
        resizeMode: 'contain',
    },
      navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#A9D5AC',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
