import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface Allergy {
  allergen: string;
  reaction: string;
  severity: string;
  age: number;
  note: string;
}

interface Surgery {
  procedure: string;
  date: string;
  facility: string;
  surgeon: string;
  outcome: string;
}

interface PatientZKP {
  blood_type: string;
  allergies: Allergy[];
  previous_surgeries: Surgery[];
}
const DoctorView: React.FC = () => {
  const router = useRouter();
  const [patientData, setPatientData] = useState<PatientZKP | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('http://10.0.1.105:8000/api/zkp/');
        if (!response.ok) {
          throw new Error('Failed to fetch patient data');
        }
        const result = await response.json();
        const data: PatientZKP = result.zkp_payload; // ⬅️ Extract actual payload
        setPatientData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Doctor Dashboard</Text>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {patientData && (
          <>
            {/* Blood Type */}
            <Text style={styles.sectionHeader}>🩸 Blood Type</Text>
            <View style={styles.card}>
              <Text style={styles.cardText}>{patientData.blood_type || 'Not available'}</Text>
            </View>

            {/* Allergies */}
            <Text style={styles.sectionHeader}>🚨 Allergies</Text>
            {patientData.allergies?.length > 0 ? (
              patientData.allergies.map((item, index) => (
                <View key={index} style={styles.card}>
                  <Text style={styles.cardText}>Allergen: {item.allergen}</Text>
                  <Text style={styles.cardText}>Reaction: {item.reaction}</Text>
                  <Text style={styles.cardText}>Severity: {item.severity}</Text>
                  <Text style={styles.cardText}>Age: {item.age}</Text>
                  <Text style={styles.cardText}>Note: {item.note}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.cardText}>No allergy records found.</Text>
            )}

            {/* Surgeries */}
            <Text style={styles.sectionHeader}>🏥 Surgeries</Text>
            {patientData.previous_surgeries?.length > 0 ? (
              patientData.previous_surgeries.map((surgery, index) => (
                <View key={index} style={styles.card}>
                  <Text style={styles.cardText}>Procedure: {surgery.procedure}</Text>
                  <Text style={styles.cardText}>Date: {surgery.date}</Text>
                  <Text style={styles.cardText}>Facility: {surgery.facility}</Text>
                  <Text style={styles.cardText}>Surgeon: {surgery.surgeon}</Text>
                  <Text style={styles.cardText}>Outcome: {surgery.outcome}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.cardText}>No surgery records found.</Text>
            )}
          </>
        )}
      </ScrollView>

      {/* Bottom Navigation Bar */}

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
              <TouchableOpacity
                        style={styles.navItem}
                        onPress={() => router.push('/doctor/emergency')}
                      >
                        <Ionicons name="eye-outline" size={24} color="#000" />
                      </TouchableOpacity>
              </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 80,
    backgroundColor: '#F5FDF6',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D9B51',
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#2D9B51',
  },
  card: {
    backgroundColor: '#E4F4E5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#C4E3C5',
  },
  cardText: {
    fontSize: 15,
    color: '#000',
    marginBottom: 4,
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

export default DoctorView;

