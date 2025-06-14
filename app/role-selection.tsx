import { View, Text, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Importing vector icons
import { useFonts } from 'expo-font'; // Importing custom fonts

export default function RoleSelection() {
    const router = useRouter();

    const [fontsLoaded] = useFonts({
        IstokWeb: require('../assets/fonts/IstokWeb-Regular.ttf'), // Loading custom font
    });

    if (!fontsLoaded) {
        return null; // Return null while the font is loading
    }

    const handleRoleSelect = (role: 'patient' | 'doctor') => {
        if (role === 'patient') {
            router.push('/patient/register/Select'); // Navigate to the patient registration flow
        } else {
            router.push('/doctor/choose'); // Placeholder — doctor flow can be handled later
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' }}> 
        <View
  style={{
    position: 'absolute',
    top: 40, // Adjust as needed for spacing from top
    alignSelf: 'center', 
    flexDirection: 'row',
    alignItems: 'center', 
    marginBottom: 20,
  }}
>
  <Image
    source={require('../assets/images/Logo1.jpg')}
    style={{
      width: 40,
      height: 40,
      marginRight: 5,
    }}
    resizeMode="contain"
  />
  <Text
    style={{
      fontSize: 28, 
      fontWeight: 'bold',
      color: '#198754', 
    }}
  >
    MediTrust
  </Text>
</View> 
            <Text style={{
                fontSize: 24, 
                fontWeight: 'bold',
                marginBottom: 10, 
                fontFamily: 'IstokWeb',
                color: '#34495e',
            }}> 
                Who are you?
            </Text>
            <Text style={{
                fontSize: 16,
                marginBottom: 40, 
                fontFamily: 'IstokWeb',
                color: '#34495e',
            }}>
                Select your role to continue
            </Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                <Pressable
                    onPress={() => handleRoleSelect('patient')}
                    style={{
                        backgroundColor: '#2e7d32',
                        padding: 20,
                        borderRadius: 30,
                        width: '40%',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}
                >
                    <Ionicons name="heart-outline" size={20} color="white" style={{ marginRight: 10 }} />
                    <Text style={{ color: 'white', fontSize: 16, fontFamily: 'IstokWeb' }}>Patient</Text>
                </Pressable>

                <Pressable
                    onPress={() => handleRoleSelect('doctor')}
                    style={{
                        backgroundColor: '#2e7d32',
                        padding: 20,
                        borderRadius: 30,
                        width: '40%',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}
                >
                    <Ionicons name="medkit-outline" size={20} color="white" style={{ marginRight: 10 }} />
                    <Text style={{ color: 'white', fontSize: 16, fontFamily: 'IstokWeb' }}>Doctor</Text>
                </Pressable>
            </View>
        </View>
    );
}