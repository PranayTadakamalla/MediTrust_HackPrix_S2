import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Notifications() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<{ id: number; doctor: string; message: string }[]>([]);

  // Simulate incoming access request from a doctor
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Simulate a notification for a specific doctor ID
      const simulatedNotification = {
        id: 1, // Unique ID for the notification
        doctor: 'DOC2468101', // Doctor ID
        message: 'is requesting access to your EHR data.',
      };
      setNotifications([simulatedNotification]);
    }, 3000); // Simulate delay

    return () => clearTimeout(timeout);
  }, []);

  const handleApprove = (id: number) => {
    console.log(`Approved access for notification ID: ${id}`);
    Alert.alert('Access Approved', 'You approved access to your EHR data.');
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    // Integrate backend logic here
  };

  const handleDeny = (id: number) => {
    console.log(`Denied access for notification ID: ${id}`);
    Alert.alert('Access Denied', 'You denied access to your EHR data.');
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    // Integrate backend logic here
  };

  const navigateTo = (page: string) => {
    router.push(`/`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
        <View style={styles.greenCurve} />
      </View>

      {notifications.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20, color: '#555' }}>
          No new notifications.
        </Text>
      ) : (
        notifications.map((note) => (
          <View key={note.id} style={styles.notificationCard}>
            <Text style={styles.notificationText}>
              {note.doctor} {note.message}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.approveButton}
                onPress={() => {
                  handleApprove(note.id);
                  router.push('/patient/dashboard/urn');
                }}
              >
                <Text style={styles.buttonText}>Approve</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.denyButton}
                onPress={() => handleDeny(note.id)}
              >
                <Text style={styles.buttonText}>Deny</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}

      {/* Bottom Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/patient/dashboard/home')}
        >
          <Ionicons name="home-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/patient/dashboard/notification')}
        >
          <Ionicons name="notifications-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/patient/dashboard/option')}
        >
          <Ionicons name="medkit-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/patient/dashboard/profile')}
        >
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
    padding: 20,
    paddingBottom: 80,
  },
  header: {
    position: 'relative',
    marginBottom: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  greenCurve: {
    position: 'absolute',
    top: -600.35,
    left: 65,
    width: 729.55,
    height: 715.37,
    backgroundColor: '#2D9B51',
    borderRadius: 364.775,
  },
  notificationCard: {
    backgroundColor: '#A9D5AC',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  approveButton: {
    backgroundColor: '#2D9B51',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  denyButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
  buttonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
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

