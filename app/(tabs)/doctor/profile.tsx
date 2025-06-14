import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
export default function Profile() {
  const router = useRouter();

  // Simulate user data (replace with data from login/signup)
  const user = {
    fullName: 'Dr. John Doe',
    email: 'doctor@example.com',
    phoneNumber: '123-456-7890',
    country: 'USA',
    licenseId: 'LIC12345',
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No user data found. Please register or log in first.</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/doctor/step1')}>
          <Text style={styles.buttonText}>Go to Registration</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile</Text>

      <View style={styles.profileSection}>
        <Text style={styles.label}>Full Name:</Text>
        <Text style={styles.value}>{user.fullName}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>

        <Text style={styles.label}>Phone Number:</Text>
        <Text style={styles.value}>{user.phoneNumber}</Text>

        <Text style={styles.label}>Country:</Text>
        <Text style={styles.value}>{user.country}</Text>

        <Text style={styles.label}>License ID:</Text>
        <Text style={styles.value}>{user.licenseId}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/doctor/step1')}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={() => router.push('/doctor/step3')}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/doctor/dashboard')}>
          <Ionicons name="home-outline" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/doctor/notification')}>
          <Ionicons name="notifications-outline" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(tabs)/doctor/emergency')}>
          <Ionicons name="medkit-outline" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/doctor/profile')}>
          <Ionicons name="person-outline" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/doctor/emergency')}>
          <Ionicons name="eye-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#D1E5D3',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  },
  profileSection: {
    marginBottom: 20,
    backgroundColor: '#A9D5AC',
    padding: 15,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#000',
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#2D9B51',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#d32f2f',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    fontSize: 18,
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 20,
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