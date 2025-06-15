"use client"

import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Image, BackHandler, Dimensions } from "react-native"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { useState, useEffect } from "react"
import * as ImagePicker from "expo-image-picker"
import * as SecureStore from "expo-secure-store"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  withSequence,
  withDelay,
  interpolate,
  runOnJS,
  FadeIn,
  SlideInLeft,
  SlideInRight,
  BounceIn,
  ZoomOut,
} from "react-native-reanimated"
import LottieView from "lottie-react-native"

const { width, height } = Dimensions.get("window")

export default function Dashboard() {
  const router = useRouter()
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)

  // Animation shared values
  const headerOpacity = useSharedValue(0)
  const headerTranslateY = useSharedValue(-50)
  const subtitleOpacity = useSharedValue(0)
  const subtitleScale = useSharedValue(0.8)
  const uploadBoxScale = useSharedValue(1)
  const uploadBoxRotation = useSharedValue(0)
  const viewBoxOpacity = useSharedValue(0)
  const navBarTranslateY = useSharedValue(100)
  const floatingAnimation = useSharedValue(0)
  const pulseAnimation = useSharedValue(1)
  const uploadProgress = useSharedValue(0)
  const successAnimation = useSharedValue(0)
  const deleteAnimation = useSharedValue(1)
  const backgroundCircle1 = useSharedValue(0)
  const backgroundCircle2 = useSharedValue(0)
  const backgroundWave = useSharedValue(0)
  const heartBeat = useSharedValue(1)
  const sparkleRotation = useSharedValue(0)

  useEffect(() => {
    startEntranceAnimations()
    startContinuousAnimations()
  }, [])

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Logout", "Do you want to logout?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await SecureStore.deleteItemAsync("email")
            router.replace("/patient/signin/step1")
          },
        },
      ])
      return true
    }

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction)
    return () => backHandler.remove()
  }, [])

  const startEntranceAnimations = () => {
    // Header entrance
    headerOpacity.value = withDelay(200, withTiming(1, { duration: 800 }))
    headerTranslateY.value = withDelay(200, withSpring(0, { damping: 8, stiffness: 100 }))

    // Subtitle entrance
    subtitleOpacity.value = withDelay(400, withTiming(1, { duration: 600 }))
    subtitleScale.value = withDelay(400, withSpring(1, { damping: 8, stiffness: 80 }))

    // View box entrance
    viewBoxOpacity.value = withDelay(600, withTiming(1, { duration: 700 }))

    // Navigation bar entrance
    navBarTranslateY.value = withDelay(800, withSpring(0, { damping: 8, stiffness: 80 }))

    // Background elements
    backgroundCircle1.value = withDelay(300, withTiming(1, { duration: 1000 }))
    backgroundCircle2.value = withDelay(500, withTiming(1, { duration: 1000 }))
    backgroundWave.value = withDelay(700, withTiming(1, { duration: 1200 }))
  }

  const startContinuousAnimations = () => {
    // Floating animation
    floatingAnimation.value = withRepeat(
      withSequence(withTiming(1, { duration: 3000 }), withTiming(0, { duration: 3000 })),
      -1,
      false,
    )

    // Pulse animation
    pulseAnimation.value = withRepeat(
      withSequence(withTiming(1.05, { duration: 1500 }), withTiming(1, { duration: 1500 })),
      -1,
      false,
    )

    // Heart beat animation
    heartBeat.value = withRepeat(
      withSequence(withTiming(1.2, { duration: 600 }), withTiming(1, { duration: 600 })),
      -1,
      false,
    )

    // Sparkle rotation
    sparkleRotation.value = withRepeat(withTiming(360, { duration: 8000 }), -1, false)
  }

  const animateUploadBox = () => {
    uploadBoxScale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withTiming(1.05, { duration: 200 }),
      withTiming(1, { duration: 100 }),
    )
    uploadBoxRotation.value = withSequence(
      withTiming(5, { duration: 100 }),
      withTiming(-5, { duration: 100 }),
      withTiming(0, { duration: 100 }),
    )
  }

  const startUploadAnimation = () => {
    uploadProgress.value = withTiming(1, { duration: 2000 })
  }

  const showSuccessAnimation = () => {
    successAnimation.value = withSequence(
      withTiming(1, { duration: 300 }),
      withDelay(1500, withTiming(0, { duration: 300 })),
    )
  }

  const animateDelete = (callback: () => void) => {
    deleteAnimation.value = withSequence(
      withTiming(0.8, { duration: 150 }),
      withTiming(0, { duration: 200 }, () => {
        runOnJS(callback)()
        deleteAnimation.value = 1
      }),
    )
  }

  const handleUpload = async () => {
    try {
      animateUploadBox()

      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== "granted") {
        Alert.alert("Permission Required", "Permission to access media library is required!")
        return
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      })

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setIsUploading(true)
        startUploadAnimation()

        const file = result.assets[0]
        const fileUri = file.uri
        const fileName = fileUri.split("/").pop() || "image.jpg"

        const formData = new FormData()
        formData.append("file", {
          uri: fileUri,
          name: fileName,
          type: "image/jpeg",
        } as unknown as Blob)

        const response = await fetch("http://10.0.1.105:8000/upload-image/", {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        })

        if (response.ok) {
          const json = await response.json()
          console.log("Upload successful:", json)
          setUploadedFiles((prev) => [...prev, fileUri])
          showSuccessAnimation()
          Alert.alert("Success", `Uploaded: ${fileName}`)
        } else {
          console.error("Upload failed:", await response.text())
          Alert.alert("Error", "Upload failed.")
        }
      }
    } catch (error) {
      console.error("Upload error:", error)
      Alert.alert("Error", "An error occurred during file upload.")
    } finally {
      setIsUploading(false)
      uploadProgress.value = 0
    }
  }

  const handleDelete = (fileUri: string) => {
    Alert.alert("Delete File", "Are you sure you want to delete this file?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          animateDelete(() => {
            setUploadedFiles((prev) => prev.filter((file) => file !== fileUri))
            Alert.alert("Deleted", "File has been deleted.")
          })
        },
      },
    ])
  }

  // Animated styles
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: headerOpacity.value,
      transform: [{ translateY: headerTranslateY.value }] as const,
    }
  })

  const subtitleAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(floatingAnimation.value, [0, 1], [0, -5])
    return {
      opacity: subtitleOpacity.value,
      transform: [{ scale: subtitleScale.value }, { translateY: translateY }] as const,
    }
  })

  const uploadBoxAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(floatingAnimation.value, [0, 1], [0, -8])
    const scale = uploadBoxScale.value * pulseAnimation.value
    return {
      transform: [{ scale: scale }, { rotate: `${uploadBoxRotation.value}deg` }, { translateY: translateY }] as const,
    }
  })

  const viewBoxAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(floatingAnimation.value, [0, 1], [0, 5])
    return {
      opacity: viewBoxOpacity.value,
      transform: [{ translateY: translateY }] as const,
    }
  })

  const navBarAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: navBarTranslateY.value }] as const,
    }
  })

  const uploadProgressStyle = useAnimatedStyle(() => {
    const width = interpolate(uploadProgress.value, [0, 1], [0, 100])
    return {
      width: `${width}%`,
    }
  })

  const successAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(successAnimation.value, [0, 1], [0, 1])
    const opacity = successAnimation.value
    return {
      transform: [{ scale: scale }] as const,
      opacity: opacity,
    }
  })

  const backgroundCircle1Style = useAnimatedStyle(() => {
    const translateY = interpolate(floatingAnimation.value, [0, 1], [0, -10])
    const scale = interpolate(backgroundCircle1.value, [0, 1], [0.8, 1])
    return {
      opacity: backgroundCircle1.value * 0.3,
      transform: [{ scale: scale }, { translateY: translateY }] as const,
    }
  })

  const backgroundCircle2Style = useAnimatedStyle(() => {
    const translateY = interpolate(floatingAnimation.value, [0, 1], [0, 8])
    const scale = interpolate(backgroundCircle2.value, [0, 1], [0.9, 1])
    return {
      opacity: backgroundCircle2.value * 0.2,
      transform: [{ scale: scale }, { translateY: translateY }] as const,
    }
  })

  const heartBeatAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: heartBeat.value }] as const,
    }
  })

  const sparkleAnimatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(sparkleRotation.value, [0, 360], [0, 360])
    return {
      transform: [{ rotate: `${rotate}deg` }] as const,
    }
  })

  return (
    <View style={styles.container}>
      {/* Background Animated Elements */}
      <Animated.View style={[styles.backgroundCircle1, backgroundCircle1Style]} />
      <Animated.View style={[styles.backgroundCircle2, backgroundCircle2Style]} />

      {/* Floating Medical Icons */}
      <Animated.View style={[styles.floatingIcon1, heartBeatAnimatedStyle]}>
        <Ionicons name="heart" size={20} color="rgba(45, 155, 81, 0.4)" />
      </Animated.View>

      <Animated.View style={[styles.floatingIcon2, sparkleAnimatedStyle]}>
        <Ionicons name="medical" size={18} color="rgba(45, 155, 81, 0.3)" />
      </Animated.View>

      <Animated.View style={[styles.floatingIcon3, heartBeatAnimatedStyle]}>
        <Ionicons name="fitness" size={16} color="rgba(25, 135, 84, 0.25)" />
      </Animated.View>

      {/* Header with Animation */}
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <Text style={styles.headerText}>Dashboard</Text>
        <View style={styles.greenCurve} />
      </Animated.View>

      {/* Animated Subtitle */}
      <Animated.Text style={[styles.subtitle, subtitleAnimatedStyle]}>Your Health, Your Control</Animated.Text>

      {/* Upload Section with Animations */}
      <Animated.View style={styles.section} entering={SlideInLeft.delay(600).duration(800)}>
        <Text style={styles.sectionTitle}>Upload your latest docs here</Text>
        <Animated.View style={[styles.uploadBox, uploadBoxAnimatedStyle]}>
          <TouchableOpacity
            style={styles.uploadTouchable}
            onPress={handleUpload}
            disabled={isUploading}
            activeOpacity={0.8}
          >
            {isUploading ? (
              <View style={styles.uploadingContainer}>
                <View style={styles.lottieContainer}>
                  <LottieView
                    source={{
                      uri: "https://assets9.lottiefiles.com/packages/lf20_xxnw6vdl.json",
                    }}
                    style={styles.lottieUpload}
                    autoPlay
                    loop
                  />
                </View>
                <Text style={styles.uploadingText}>Uploading...</Text>
                <View style={styles.progressBar}>
                  <Animated.View style={[styles.progressFill, uploadProgressStyle]} />
                </View>
              </View>
            ) : (
              <>
                <Ionicons name="cloud-upload-outline" size={40} color="#000" />
                <Text style={styles.uploadText}>Tap to Upload</Text>
              </>
            )}
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      {/* View Section with Animations */}
      <Animated.View style={styles.section} entering={SlideInRight.delay(800).duration(800)}>
        <Text style={styles.sectionTitle}>View your uploaded health records here</Text>
        <Animated.View style={[styles.viewBox, viewBoxAnimatedStyle]}>
          {uploadedFiles.length > 0 ? (
            <FlatList
              contentContainerStyle={{ padding: 10 }}
              data={uploadedFiles}
              keyExtractor={(item, index) => `${item}-${index}`}
              renderItem={({ item, index }) => (
                <Animated.View
                  style={styles.fileContainer}
                  entering={BounceIn.delay(index * 100)}
                  exiting={ZoomOut.duration(300)}
                >
                  <Image source={{ uri: item }} style={styles.imagePreview} resizeMode="cover" />
                  <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item)} activeOpacity={0.7}>
                    <Ionicons name="trash-outline" size={20} color="#fff" />
                  </TouchableOpacity>
                </Animated.View>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            <Animated.View style={styles.emptyState} entering={FadeIn.delay(1000)}>
              <View style={styles.lottieContainer}>
                <LottieView
                  source={{
                    uri: "https://assets4.lottiefiles.com/packages/lf20_wd1udlcz.json",
                  }}
                  style={styles.lottieEmpty}
                  autoPlay
                  loop
                />
              </View>
              <Text style={styles.emptyText}>No records uploaded yet.</Text>
            </Animated.View>
          )}
        </Animated.View>
      </Animated.View>

      {/* Success Animation Overlay */}
      <Animated.View style={[styles.successOverlay, successAnimatedStyle]}>
        <View style={styles.lottieContainer}>
          <LottieView
            source={{
              uri: "https://assets4.lottiefiles.com/packages/lf20_jbrw3hcz.json",
            }}
            style={styles.lottieSuccess}
            autoPlay
            loop={false}
          />
        </View>
      </Animated.View>

      {/* Animated Navigation Bar */}
      <Animated.View style={[styles.navBar, navBarAnimatedStyle]}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/patient/dashboard/home")}
          activeOpacity={0.7}
        >
          <Animated.View entering={BounceIn.delay(1000)}>
            <Ionicons name="home-outline" size={24} color="#000" />
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/patient/dashboard/notification")}
          activeOpacity={0.7}
        >
          <Animated.View entering={BounceIn.delay(1100)}>
            <Ionicons name="notifications-outline" size={24} color="#000" />
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/patient/dashboard/option")}
          activeOpacity={0.7}
        >
          <Animated.View entering={BounceIn.delay(1200)}>
            <Ionicons name="medkit-outline" size={24} color="#000" />
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/patient/dashboard/profile")}
          activeOpacity={0.7}
        >
          <Animated.View entering={BounceIn.delay(1300)}>
            <Ionicons name="person-outline" size={24} color="#000" />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D1E5D3",
    padding: 20,
  },
  header: {
    position: "relative",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  greenCurve: {
    position: "absolute",
    top: -600.35,
    left: 65,
    width: 729.55,
    height: 715.37,
    backgroundColor: "#2D9B51",
    borderRadius: 364.775,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 30,
    textAlign: "center",
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginBottom: 10,
  },
  uploadBox: {
    backgroundColor: "#A9D5AC",
    borderRadius: 15,
    width: "100%",
    height: 150,
    elevation: 5,
    shadowColor: "#2D9B51",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  uploadTouchable: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  uploadingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  lottieContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  lottieUpload: {
    width: 60,
    height: 60,
  },
  uploadingText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "500",
    color: "#2D9B51",
  },
  uploadText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  progressBar: {
    width: 100,
    height: 4,
    backgroundColor: "rgba(45, 155, 81, 0.3)",
    borderRadius: 2,
    marginTop: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#2D9B51",
    borderRadius: 2,
  },
  viewBox: {
    backgroundColor: "#A9D5AC",
    borderRadius: 15,
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#2D9B51",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  fileContainer: {
    position: "relative",
    marginRight: 10,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  imagePreview: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 8,
  },
  deleteButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#ff4444",
    borderRadius: 15,
    padding: 5,
    elevation: 2,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
  },
  lottieEmpty: {
    width: 80,
    height: 80,
  },
  emptyText: {
    color: "#666",
    fontSize: 14,
    marginTop: 10,
  },
  successOverlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -50,
    marginTop: -50,
    zIndex: 1000,
  },
  lottieSuccess: {
    width: 100,
    height: 100,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#A9D5AC",
    paddingVertical: 15,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: "#2D9B51",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  navItem: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 25,
  },
  // Background elements
  backgroundCircle1: {
    position: "absolute",
    top: height * 0.1,
    left: -50,
    width: 150,
    height: 150,
    backgroundColor: "#2D9B51",
    borderRadius: 75,
    zIndex: -1,
  },
  backgroundCircle2: {
    position: "absolute",
    bottom: height * 0.3,
    right: -60,
    width: 120,
    height: 120,
    backgroundColor: "#A9D5AC",
    borderRadius: 60,
    zIndex: -1,
  },
  floatingIcon1: {
    position: "absolute",
    top: height * 0.2,
    right: width * 0.1,
    zIndex: 1,
  },
  floatingIcon2: {
    position: "absolute",
    top: height * 0.15,
    left: width * 0.1,
    zIndex: 1,
  },
  floatingIcon3: {
    position: "absolute",
    bottom: height * 0.25,
    left: width * 0.15,
    zIndex: 1,
  },
})
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

                const response = await fetch('http://10.0.1.105:8000/upload-image/', {
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


