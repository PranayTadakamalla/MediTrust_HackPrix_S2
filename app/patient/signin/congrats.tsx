import { View, Text, TouchableOpacity, StyleSheet, BackHandler, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export default function Step2() {
  const router = useRouter();

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Logout', 'Do you want to logout?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await SecureStore.deleteItemAsync('email');
            router.replace('/patient/signin/step1');
          },
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MediTrust</Text>

      <TouchableOpacity style={styles.tickButton}>
        <Ionicons name="checkmark" size={40} color="#2D9B51" />
      </TouchableOpacity>

      <Text style={styles.title}>Congratulations!</Text>
      <Text style={styles.subtitle}>You've logged in successfully</Text>

      <TouchableOpacity
        style={styles.goButton}
        onPress={() => router.push('/patient/dashboard/home')}
      >
        <Text style={styles.goText}>Let's Go</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#D1E5D3', justifyContent: 'center',
    alignItems: 'center', padding: 20,
  },
  logo: {
    fontSize: 28, fontWeight: 'bold', color: '#198754', marginBottom: 40,
  },
  tickButton: {
    backgroundColor: '#A9D5AC', borderRadius: 30,
    padding: 10, marginBottom: 20,
  },
  title: {
    fontSize: 24, fontWeight: 'bold', color: '#000', marginBottom: 10,
  },
  subtitle: {
    fontSize: 16, color: '#000', marginBottom: 40, textAlign: 'center',
  },
  goButton: {
    backgroundColor: '#2D9B51', borderRadius: 25,
    paddingVertical: 12, paddingHorizontal: 50,
  },
  goText: {
    color: '#fff', fontSize: 16, fontWeight: 'bold',
  },
});
