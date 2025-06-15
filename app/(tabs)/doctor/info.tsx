import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';

const DoctorInfo = () => {
    const [imageUrl, setImageUrl] = useState("http://10.0.1.105:8000/uploads/d2deb95a-e597-4bd9-88a5-11c2d9726b5e.jpeg");

    return (
        <View>
            <TouchableOpacity onPress={() => console.log("Image clicked!")}>
                {imageUrl ? (
                    <>
                        <Image
                            source={{ uri: imageUrl }}
                            style={styles.fullscreenImage}
                        />
                        <Image
                            source={{ uri: imageUrl }}
                            style={styles.thumbnailImage}
                        />
                    </>
                ) : (
                    <View style={styles.placeholder}>
                        <Text>No Image Available</Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    fullscreenImage: {
        width: '100%',
        height: 200,
    },
    thumbnailImage: {
        width: 100,
        height: 100,
    },
    placeholder: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        backgroundColor: '#ccc',
    },
});

export default DoctorInfo;