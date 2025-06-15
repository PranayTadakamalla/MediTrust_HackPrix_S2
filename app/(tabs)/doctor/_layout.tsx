import { Stack } from "expo-router"

export default function DoctorLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        title: "",
        headerTitle: "",
        headerTitleStyle: { display: "none" },
        contentStyle: { backgroundColor: "#D1E5D3" },
      }}
    >
      <Stack.Screen
        name="dashboard"
        options={{
          headerShown: false,
          title: "",
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="step1"
        options={{
          headerShown: false,
          title: "",
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="step3"
        options={{
          headerShown: false,
          title: "",
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="notification"
        options={{
          headerShown: false,
          title: "",
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="view"
        options={{
          headerShown: false,
          title: "",
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="emergency"
        options={{
          headerShown: false,
          title: "",
          headerTitle: "",
        }}
      />
    </Stack>
  )
}

