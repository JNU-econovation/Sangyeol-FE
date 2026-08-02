import { useCourseWebviewStore } from "@store/webviewRef/courseWebviewStore";
import { Stack } from "expo-router";

export default function HomeLayout() {
  const gestureEnabled = !useCourseWebviewStore().canGoBack;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "default",
      }}
    >
      <Stack.Screen
        name="course"
        options={{
          gestureEnabled,
        }}
      />
    </Stack>
  );
}
