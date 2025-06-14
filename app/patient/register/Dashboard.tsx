import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Add this
import { useRouter } from 'expo-router';

export default function Dashboard() {
  const router = useRouter();

  
  const [consentHealthData, setConsentHealthData] = useState(false);
  const [consentEmergencyAccess, setConsentEmergencyAccess] = useState(false);
  const [consentAadhaar, setConsentAadhaar] = useState(false);
  const [consentDocumentShare, setConsentDocumentShare] = useState(false);

  const handleProceed = async () => {
    try {
      const consentData = {
        consentHealthData,
        consentEmergencyAccess,
        consentAadhaar,
        consentDocumentShare,
      };

      await AsyncStorage.setItem('userConsent', JSON.stringify(consentData));
      router.push('/patient/dashboard/home');
    } catch (error) {
      console.error('Failed to save consent settings', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.greenCircle} />

      <Text style={styles.logo}>MediTrust</Text>
      <Text style={styles.title}>Your Privacy, Your Choice</Text>

      <View style={styles.card}>
        <ConsentSwitch
          value={consentHealthData}
          onChange={setConsentHealthData}
          text="I consent to the processing of my health data for MediTrust services."
        />
        <ConsentSwitch
          value={consentEmergencyAccess}
          onChange={setConsentEmergencyAccess}
          text="I consent to emergency access for 60 seconds in critical situations."
        />
        <ConsentSwitch
          value={consentAadhaar}
          onChange={setConsentAadhaar}
          text="I consent to using my Aadhaar ID for emergency authentication."
        />
        <ConsentSwitch
          value={consentDocumentShare}
          onChange={setConsentDocumentShare}
          text="I consent to make my documents shareable to doctors."
        />
      </View>

      <Text style={styles.subtext}>You can update these settings anytime in Profile.</Text>

      <TouchableOpacity style={styles.button} onPress={handleProceed}>
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
}

// ✅ Reusable switch row
const ConsentSwitch: React.FC<{ value: boolean; onChange: (value: boolean) => void; text: string }> = ({ value, onChange, text }) => (
  <View style={styles.switchRow}>
    <Switch
      value={value}
      onValueChange={onChange}
      trackColor={{ false: '#ccc', true: 'rgb(18, 156, 18)' }}
      thumbColor={value ? '#ffffff' : '#f4f3f4'}
    />
    <Text style={styles.switchText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9ead3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    // Required for absolute positioning of the circle
  },
  logo: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1c4532',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#c1e1c1',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  switchText: {
    flex: 1,
    fontSize: 14,
    color: '#033f2d',
    marginLeft: 12,
  },
  subtext: {
    fontSize: 12,
    color: '#333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#248f24',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  greenCircle: {
    position: 'absolute',
    bottom: -400, // Adjusted to move closer to the bottom edge
    right: -500,  // Adjusted to move closer to the right edge
    width: 620.55, // Specified width
    height: 715.37, // Specified height
    backgroundColor: '#2D9B51', // Green color matching MediTrust theme
    borderRadius: 364.775, // Half of width for a perfect circle (729.55 / 2)
   
  },
});