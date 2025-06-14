import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Lottie from 'lottie-react-native';

// 🚀 SplashScreen Component
export default function SplashScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Decorative green circle background */}
      <View style={styles.greenCircle} />

      {/* Optional animated logo (commented out by default) */}
      {/* 
      <View style={styles.logoTextContainer}>
        <Lottie
          source={require('../../assets/animations/Animation1.json')}
          autoPlay
          loop
          style={styles.logo}
        />
      </View> 
      */}

      {/* App Title */}
      <Text style={styles.title}>MediTrust</Text>

      {/* Tagline */}
      <Text style={styles.subtitle}>Fast Trust. Yours Anywhere</Text>

      {/* "Get Started" Button */}
      <Pressable
        onPress={() => router.push('/role-selection')} // Navigate to role-selection screen
        style={styles.getStartedButton}
      >
        <Text style={styles.getStartedText}>Get Started</Text>
      </Pressable>
    </View>
  );
}

// 🔧 Hide the default header (which shows "doctor" or route name)
SplashScreen.options = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  logoTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontFamily: 'IstokWeb', // Optional: make sure the font is loaded in your app config
    fontSize: 34,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontFamily: 'IstokWeb',
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginBottom: 40,
  },
  getStartedButton: {
    backgroundColor: '#2e7d32',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 28,
    elevation: 2,
  },
  getStartedText: {
    color: 'white',
    fontFamily: 'IstokWeb',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  greenCircle: {
    position: 'absolute',
    top: -400, // Pushes the circle above view
    right: -250, // Moves it off-screen to the right
    width: 480,
    height: 650,
    backgroundColor: '#2D9B51',
    borderRadius: 250,
  },
});
