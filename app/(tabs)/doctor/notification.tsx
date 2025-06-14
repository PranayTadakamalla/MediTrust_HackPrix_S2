import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';

interface Notification {
  id: string;
  message: string;
  patientId: string;
}

export default function Notifications() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch notifications from backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('https://api.example.com/notifications');
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        Alert.alert('Error', 'Failed to load notifications. Showing fallback data.');
        // Dummy fallback data for testing UI
        setNotifications([
          { id: '1', message: 'Patient ABC approved your request.', patientId: 'abc123' },
          { id: '2', message: 'Patient XYZ shared updated info.', patientId: 'xyz456' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  // Handle "View PHR" click
  const handleViewPHR = async (patientId: string) => {
    try {
      console.log(`Fetching PHR for Patient ID: ${patientId}`);
      const response = await fetch(`https://api.example.com/patients/${patientId}/phr`);
      if (!response.ok) throw new Error('Failed to fetch PHR');
      const data = await response.json();
      console.log('PHR Data:', data);
      // Navigate or handle the data
    } catch (error) {
      console.error('Error fetching PHR:', error);
      Alert.alert('Error', 'Failed to fetch patient health record.');
    }
  };

  // Render individual notification card
  const renderNotification = ({ item }: { item: Notification }) => (
    <View style={styles.notificationCard}>
      <Text style={styles.notificationText}>{item.message}</Text>
      <TouchableOpacity style={styles.viewButton} onPress={() => handleViewPHR(item.patientId)}>
        <Text style={styles.buttonText}>View PHR</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#2D9B51" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
      </View>

      {/* Notification List */}
      <View style={{ flex: 1 }}>
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderNotification}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Go to Full View Button */}
      
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
                  style={styles.navItem} onPress={() => router.push('/doctor/emergency')}>
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
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'relative',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  notificationCard: {
    backgroundColor: '#A9D5AC',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  notificationText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 15,
  },
  viewButton: {
    backgroundColor: '#2D9B51',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fullViewButton: {
    backgroundColor: '#2D9B51',
    paddingVertical: 10,
    borderRadius: 30,
    marginTop: 8,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullViewText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#A9D5AC',
    paddingVertical: 10, // Decreased from 10
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
