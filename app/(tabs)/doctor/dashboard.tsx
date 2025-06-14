import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  BackHandler,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

export default function Dashboard() {
  const router = useRouter();
  const [urn, setUrn] = useState('');
  const [approvedData, setApprovedData] = useState<string | null>(null);
  const [isRequested, setIsRequested] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Logout Confirmation',
          'Are you sure you want to logout?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Logout',
              style: 'destructive',
              onPress: () => router.replace('/'),
            },
          ]
        );
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  const handleFind = async () => {
    try {
      const response = await fetch(
        `http://10.0.1.105:8000/api/search-patient/${urn}/`
      );
      const result = await response.json();

      if (result.urn) {
        setApprovedData(result.urn);
        setIsRequested(false);
      } else {
        Alert.alert('Not Approved', 'The URN is not approved.');
        setApprovedData(null);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to fetch data.');
    }
  };

  const handleRequest = () => {
    setIsRequested(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Dashboard</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionText}>Enter URN to find patient data:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter URN"
          value={urn}
          onChangeText={setUrn}
        />
        <TouchableOpacity style={styles.findButton} onPress={handleFind}>
          <Text style={styles.textBtn}>Find</Text>
        </TouchableOpacity>
      </View>

      {approvedData && (
        <View style={styles.approvedDataSection}>
          <Text style={styles.sectionText}>Approved Data:</Text>
          <Text style={styles.approvedDataText}>{approvedData}</Text>
          <TouchableOpacity
            style={styles.findButton}
            onPress={handleRequest}
            disabled={isRequested}
          >
            <Text style={styles.textBtn}>
              {isRequested ? 'Requested' : 'Request'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.replace('/doctor/dashboard')}
        >
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D1E5D3',
    padding: 20,
  },
  header: {
    marginBottom: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  section: {
    marginBottom: 30,
  },
  sectionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  findButton: {
    backgroundColor: '#2D9B51',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  textBtn: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  approvedDataSection: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#A9D5AC',
    borderRadius: 10,
  },
  approvedDataText: {
    fontSize: 16,
    color: '#000',
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
