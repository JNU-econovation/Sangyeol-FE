import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <StatusBar barStyle={"dark-content"} />
      <Stack.Screen
        name="index"
        options={{
          animation: "fade",
          animationDuration: 100,
        }}
      />
      <Stack.Screen
        name="immediatelyReport"
        options={{
          animation: "fade",
          animationDuration: 100,
        }}
      />
      <Stack.Screen
        name="detailReport"
        options={{
          animation: "fade",
          animationDuration: 100,
        }}
      />
    </Stack>
  );
}
