import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function SelectScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MediTrust</Text> 
      <Text style={styles.title}>Welcome to MediTrust,{"\n"}Your Health Partner</Text>
      <Text style={styles.subtitle}>
        Securely manage your health records with fast,{"\n"}
        trusted access – anywhere, anytime.
      </Text>

    <TouchableOpacity
      style={styles.registerButton}
      onPress={() => router.push('/patient/register/step1')}
    >
      <Text style={styles.registerText}>Register</Text>
    </TouchableOpacity>

      <Text style={styles.orText}>or</Text> 

      <TouchableOpacity
        style={styles.signinButton}
        onPress={() => router.push('/patient/signin/step1')}
      >
        <Text style={styles.signinText}>Sign-in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#198754',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    marginBottom: 30,
  },
  registerButton: {
    backgroundColor: '#2E8B57',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 40,
    marginBottom: 10,
  },
  registerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  orText: {
    fontSize: 14,
    color: '#555',
    marginVertical: 10,
  },
  signinButton: {
    borderColor: '#2E8B57',
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 40,
  },
  signinText: {
    color: '#2E8B57',
    fontSize: 16,
    fontWeight: '600',
  },
});
