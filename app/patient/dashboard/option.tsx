import { View, Text, TouchableOpacity, StyleSheet, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

const OptionScreen = () => {
    const [selectedToggles, setSelectedToggles] = useState({
        allergies: false,
        pastSurgeries: false,
        bloodGroup: false,
        doctorAccess: {
            tenDays: false,
            twentyDays: false,
            thirtyDays: false,
        },
    });

    const toggleSwitch = (key: keyof typeof selectedToggles) => {
        const activeToggles = Object.values(selectedToggles).filter(value => typeof value === 'boolean' && value).length;

        if (selectedToggles[key]) {
            // Allow toggling off
            setSelectedToggles(prevState => ({ ...prevState, [key]: false }));
        } else if (activeToggles < 3) {
            // Allow toggling on if less than 3 are active
            setSelectedToggles(prevState => ({ ...prevState, [key]: true }));
        }
    };

    const toggleDoctorAccess = (key: keyof typeof selectedToggles['doctorAccess']) => {
        setSelectedToggles(prevState => ({
            ...prevState,
            doctorAccess: {
                tenDays: false,
                twentyDays: false,
                thirtyDays: false,
                [key]: true,
            },
        }));
    };

    const handleSubmit = async () => {
        try {
            const email = await SecureStore.getItemAsync('email');
            const apiUrl = 'http://10.15.54.177:8000/api/preferences/';

            const payload = {
                email,
                preferences: selectedToggles,
            };

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Data successfully submitted:', data);
            Alert.alert('Success', 'Your data has been submitted successfully.');
        } catch (error) {
            console.error('Error submitting data:', error);
            Alert.alert('Error', 'There was an error submitting your data.');
        }
    };

    return (
        <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>My Records</Text>
            <View style={styles.settingsCard}>
                <Text style={styles.settingText}>I consent to share my allergies-related data.</Text>
                <Switch
                    onValueChange={() => toggleSwitch('allergies')}
                    value={selectedToggles.allergies}
                    trackColor={{ false: '#A9D5AC', true: '#2D9B51' }}
                    thumbColor={selectedToggles.allergies ? '#fff' : '#fff'}
                />
                <Text style={styles.settingText}>I consent to share my past surgeries data.</Text>
                <Switch
                    onValueChange={() => toggleSwitch('pastSurgeries')}
                    value={selectedToggles.pastSurgeries}
                    trackColor={{ false: '#A9D5AC', true: '#2D9B51' }}
                    thumbColor={selectedToggles.pastSurgeries ? '#fff' : '#fff'}
                />
                <Text style={styles.settingText}>I consent to share my blood group data.</Text>
                <Switch
                    onValueChange={() => toggleSwitch('bloodGroup')}
                    value={selectedToggles.bloodGroup}
                    trackColor={{ false: '#A9D5AC', true: '#2D9B51' }}
                    thumbColor={selectedToggles.bloodGroup ? '#fff' : '#fff'}
                />
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.sectionTitle}>Doctor Access Permissions</Text>
            <View style={styles.settingsCard}>
                <Text style={styles.settingText}>Allow doctor to access data for 10 days.</Text>
                <Switch
                    onValueChange={() => toggleDoctorAccess('tenDays')}
                    value={selectedToggles.doctorAccess.tenDays}
                    trackColor={{ false: '#A9D5AC', true: '#2D9B51' }}
                    thumbColor={selectedToggles.doctorAccess.tenDays ? '#fff' : '#fff'}
                />
                <Text style={styles.settingText}>Allow doctor to access data for 20 days.</Text>
                <Switch
                    onValueChange={() => toggleDoctorAccess('twentyDays')}
                    value={selectedToggles.doctorAccess.twentyDays}
                    trackColor={{ false: '#A9D5AC', true: '#2D9B51' }}
                    thumbColor={selectedToggles.doctorAccess.twentyDays ? '#fff' : '#fff'}
                />
                <Text style={styles.settingText}>Allow doctor to access data for 30 days.</Text>
                <Switch
                    onValueChange={() => toggleDoctorAccess('thirtyDays')}
                    value={selectedToggles.doctorAccess.thirtyDays}
                    trackColor={{ false: '#A9D5AC', true: '#2D9B51' }}
                    thumbColor={selectedToggles.doctorAccess.thirtyDays ? '#fff' : '#fff'}
                />
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={async () => {
                        try {
                            const email = await SecureStore.getItemAsync('email');
                            const apiUrl = 'http://172.25.11.179:8000/api/doctor-access/';
                            const payload = {
                                email,
                                doctorAccess: selectedToggles.doctorAccess,
                            };
                            const response = await fetch(apiUrl, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(payload),
                            });
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            const data = await response.json();
                            console.log('Doctor access data submitted:', data);
                            Alert.alert('Success', 'Doctor access permissions submitted successfully.');
                        } catch (error) {
                            console.error('Error submitting doctor access data:', error);
                            Alert.alert('Error', 'There was an error submitting doctor access permissions.');
                        }
                    }}
                >
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.navBar}>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/patient/dashboard/home')}>
                    <Ionicons name="home-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/patient/dashboard/notification')}>
                    <Ionicons name="notifications-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/patient/dashboard/option')}>
                    <Ionicons name="medkit-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/patient/dashboard/profile')}>
                    <Ionicons name="person-outline" size={24} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    settingsSection: {
        flex: 1,
        padding: 16,
        backgroundColor: '#D1E5D3',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    settingsCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        elevation: 2,
        marginBottom: 16,
    },
    settingText: {
        fontSize: 16,
        marginBottom: 8,
    },
    submitButton: {
        marginTop: 16,
        backgroundColor: '#2D9B51',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#A9D5AC',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
        position: 'absolute',
        bottom: 0,
        width: '110%',
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default OptionScreen;
