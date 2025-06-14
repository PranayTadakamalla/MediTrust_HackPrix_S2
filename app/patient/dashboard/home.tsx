import {
    View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Image, BackHandler
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';

export default function Dashboard() {
    const router = useRouter();
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);

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

    const handleUpload = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Required', 'Permission to access media library is required!');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const file = result.assets[0];
                const fileUri = file.uri;
                const fileName = fileUri.split('/').pop() || 'image.jpg';

                const formData = new FormData();
                formData.append('file', {
                    uri: fileUri,
                    name: fileName,
                    type: 'image/jpeg',
                } as unknown as Blob);

                const response = await fetch('http://10.15.54.177:8000/upload-image/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData,
                });

                if (response.ok) {
                    const json = await response.json();
                    console.log('Upload successful:', json);
                    setUploadedFiles((prev) => [...prev, fileUri]);
                    Alert.alert('Success', `Uploaded: ${fileName}`);
                } else {
                    console.error('Upload failed:', await response.text());
                    Alert.alert('Error', 'Upload failed.');
                }
            }
        } catch (error) {
            console.error('Upload error:', error);
            Alert.alert('Error', 'An error occurred during file upload.');
        }
    };

    const handleDelete = (fileUri: string) => {
        Alert.alert('Delete File', 'Are you sure you want to delete this file?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: () => {
                    setUploadedFiles((prev) => prev.filter((file) => file !== fileUri));
                    Alert.alert('Deleted', 'File has been deleted.');
                },
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Dashboard</Text>
                <View style={styles.greenCurve} />
            </View>
            <Text style={styles.subtitle}>Your Health, Your Control</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Upload your latest docs here</Text>
                <TouchableOpacity style={styles.uploadBox} onPress={handleUpload}>
                    <Ionicons name="cloud-upload-outline" size={40} color="#000" />
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>View your uploaded health records here</Text>
                <View style={styles.viewBox}>
                    {uploadedFiles.length > 0 ? (
                        <FlatList
                            contentContainerStyle={{ padding: 10 }}
                            data={uploadedFiles}
                            keyExtractor={(item, index) => `${item}-${index}`}
                            renderItem={({ item }) => (
                                <View style={styles.fileContainer}>
                                    <Image source={{ uri: item }} style={styles.imagePreview} resizeMode="cover" />
                                    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item)}>
                                        <Ionicons name="trash-outline" size={20} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            )}
                            horizontal
                        />
                    ) : (
                        <Text style={{ color: '#000' }}>No records uploaded yet.</Text>
                    )}
                </View>
            </View>

            <View style={styles.navBar}>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/patient/dashboard/home')}>
                    <Ionicons name="home-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/patient/dashboard/notification')}>
                    <Ionicons name="notifications-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/patient/dashboard/option')}>
                    <Ionicons name="medkit-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/patient/dashboard/profile')}>
                    <Ionicons name="person-outline" size={24} color="#000" />
                </TouchableOpacity>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#D1E5D3', padding: 20 },
    header: { position: 'relative', marginBottom: 20 },
    headerText: { fontSize: 24, fontWeight: 'bold', color: '#000' },
    greenCurve: {
        position: 'absolute', top: -600.35, left: 65, width: 729.55, height: 715.37,
        backgroundColor: '#2D9B51', borderRadius: 364.775,
    },
    subtitle: { fontSize: 18, fontWeight: '600', color: '#000', marginBottom: 30 },
    section: { marginBottom: 30 },
    sectionTitle: { fontSize: 16, fontWeight: '500', color: '#000', marginBottom: 10 },
    uploadBox: {
        backgroundColor: '#A9D5AC', borderRadius: 10, width: '100%', height: 150,
        justifyContent: 'center', alignItems: 'center',
    },
    viewBox: {
        backgroundColor: '#A9D5AC', borderRadius: 10, width: '100%', height: 150,
        justifyContent: 'center', alignItems: 'center',
    },
    fileContainer: { position: 'relative', marginRight: 10 },
    imagePreview: { width: 100, height: 100, margin: 5 },
    deleteButton: {
        position: 'absolute', top: 5, right: 5, backgroundColor: 'red',
        borderRadius: 15, padding: 5,
    },
    navBar: {
        flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#A9D5AC',
        paddingVertical: 10, position: 'absolute', bottom: 0, left: 0, right: 0,
    },
    navItem: { justifyContent: 'center', alignItems: 'center' },
});
