import { View, Text, TouchableOpacity, StyleSheet, Switch, Dimensions, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';

const { width, height } = Dimensions.get('window');

export default function Profile() {
  const router = useRouter();

  const [consents, setConsents] = useState({
    processingHealthData: false,
    emergencyAccess: false,
    aadhaarID: false,
    shareDocuments: false,
  });

  const toggleSwitch = (key: keyof typeof consents) => {
    setConsents((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const navigateTo = (page: string) => {
    router.push(`/`);
  };

  const handleSaveChanges = () => {
    console.log('Saved consents:', consents);
  };

  const handleLogout = () => {
    console.log('User logged out');
    router.push('/patient/dashboard/login'); // Navigate to the login page
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={50} color="#000" />
          </View>
          <Text style={styles.label}>Email :</Text>
          <Text style={styles.value}>user@example.com</Text>
          <Text style={styles.label}>Public ID :</Text>
          <Text style={styles.value}>XYZ123</Text>
        </View>

        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsCard}>
            <Text style={styles.settingText}>
              I consent to the processing of my health data for MediTrust services.
            </Text>
            <Switch
              onValueChange={() => toggleSwitch('processingHealthData')}
              value={consents.processingHealthData}
              trackColor={{ false: '#A9D5AC', true: '#2D9B51' }}
              thumbColor={consents.processingHealthData ? '#fff' : '#fff'}
            />
            <Text style={styles.settingText}>
              I consent to emergency access for 60 seconds in critical situations.
            </Text>
            <Switch
              onValueChange={() => toggleSwitch('emergencyAccess')}
              value={consents.emergencyAccess}
              trackColor={{ false: '#A9D5AC', true: '#2D9B51' }}
              thumbColor={consents.emergencyAccess ? '#fff' : '#fff'}
            />
            <Text style={styles.settingText}>
              I consent to using my Aadhaar ID for emergency authentication.
            </Text>
            <Switch
              onValueChange={() => toggleSwitch('aadhaarID')}
              value={consents.aadhaarID}
              trackColor={{ false: '#A9D5AC', true: '#2D9B51' }}
              thumbColor={consents.aadhaarID ? '#fff' : '#fff'}
            />
            <Text style={styles.settingText}>
              I consent to make my documents shareable to doctors.
            </Text>
            <Switch
              onValueChange={() => toggleSwitch('shareDocuments')}
              value={consents.shareDocuments}
              trackColor={{ false: '#A9D5AC', true: '#2D9B51' }}
              thumbColor={consents.shareDocuments ? '#fff' : '#fff'}
            />
          </View>
         

        </View>
      </ScrollView>

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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D1E5D3',
    padding: width * 0.05,
  },
  bottomRightLogout: {
    position: 'absolute',
    bottom: height * 0.1,
    right: width * 0.05,
    zIndex: 10,
  },
  floatingLogout: {
    backgroundColor: '#2D9B51',
    padding: 15,
    borderRadius: 30, 
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  header: {
    position: 'relative',
    marginBottom: height * 0.05,
  },
  headerText: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#000',
  },
  
  scrollContent: {
    paddingBottom: height * 0.1,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: height * 0.05,
  },
  avatar: {
    backgroundColor: '#A9D5AC',
    borderRadius: width * 0.25,
    width: width * 0.25,
    height: width * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  label: {
    fontSize: width * 0.04,
    fontWeight: '500',
    color: '#000',
    marginBottom: height * 0.01,
  },
  value: {
    fontSize: width * 0.04,
    color: '#000',
    marginBottom: height * 0.02,
  },
  settingsSection: {
    marginBottom: height * 0.02,
  },
  sectionTitle: {
    fontSize: width * 0.045,
    fontWeight: '600',
    color: '#000',
    marginBottom: height * 0.01,
  },
  settingsCard: {
    backgroundColor: '#A9D5AC',
    borderRadius: 10,
    padding: width * 0.05,
    marginBottom: height * 0.02,
  },
  settingText: {
    fontSize: width * 0.035,
    color: '#000',
    marginBottom: height * 0.01,
  },
  saveButton: {
    backgroundColor: '#2D9B51',
    borderRadius: 25,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.2,
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  saveText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 25,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.2,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#A9D5AC',
    paddingVertical: height * 0.015,
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

