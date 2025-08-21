import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="[courseId]"
        options={{
          animation: "fade",
          animationDuration: 100,
        }}
      />
      <Stack.Screen
        name="withoutCourse"
        options={{
          animation: "fade",
          animationDuration: 100,
        }}
      />
    </Stack>
  );
}
