import { Stack } from "expo-router";

export default function TravelLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      {/* <Stack.Screen
        name="index"
        options={{ animation: "fade_from_bottom", animationDuration: 200 }}
      /> */}
      <Stack.Screen
        name="travel"
        options={{ animation: "fade_from_bottom", animationDuration: 200 }}
      />
    </Stack>
  );
}
