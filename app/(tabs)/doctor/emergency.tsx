import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function EmergencyAccessScreen() {
    const router = useRouter();
    const [patientURN, setPatientURN] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const [aadhaarSSN, setAadhaarSSN] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fullImageUrl, setFullImageUrl] = useState('');

    const handleEmergencyAccess = () => {
        const requestData = {
            patientURN,
            licenseNumber,
            aadhaarSSN,
        };

        setLoading(true);

        fetch('http://10.0.1.105:8000/api/emergency/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Invalid credentials');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Success:', data);
                const imageUrl = 'http://10.0.1.105:8000/uploads/21f3d01b-c61d-488a-aef6-3ee35cbd3109.jpeg';
                setFullImageUrl(imageUrl);
                setShowImage(true);
            })
            .catch((error) => {
                console.error('Error:', error);
                setShowImage(false);
                alert('Invalid credentials. Please try again.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.greenCurve} />
                <Text style={styles.title}>Doctor</Text>
                <Text style={styles.heading}>Emergency Access</Text>

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

                <TouchableOpacity style={styles.button} onPress={handleEmergencyAccess} disabled={loading}>
                    <Text style={styles.buttonText}>
                        {loading ? 'Please wait...' : 'Emergency Access'}
                    </Text>
                </TouchableOpacity>

                {showImage && (
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Image
                            source={{ uri: fullImageUrl }}
                            style={styles.thumbnailImage}
                        />
                    </TouchableOpacity>
                )}

                <Modal visible={modalVisible} transparent={true} animationType="fade">
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Ionicons name="close" size={30} color="#fff" />
                        </TouchableOpacity>
                        <Image
                            source={{ uri: fullImageUrl }}
                            style={styles.fullscreenImage}
                        />
                    </View>
                </Modal>
            </ScrollView>

            <View style={styles.navBar}>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/doctor/dashboard')}>
                    <Ionicons name="home-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/doctor/notification')}>
                    <Ionicons name="notifications-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/doctor/view')}>
                    <Ionicons name="medkit-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/doctor/profile')}>
                    <Ionicons name="person-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/doctor/emergency')}>
                    <Ionicons name="eye-outline" size={24} color="#000" />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8F5E9',
    },
    scrollContent: {
        flexGrow: 1,
        padding: 20,
        paddingBottom: 100,
    },
    greenCurve: {
        position: 'absolute',
        top: -100,
        right: -100,
        width: 200,
        height: 200,
        backgroundColor: '#2D9B51',
        borderRadius: 100,
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
        marginTop: 50,
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F8E9',
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
        backgroundColor: '#2D9B51',
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
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 2,
    },
    fullscreenImage: {
        width: '90%',
        height: '80%',
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
