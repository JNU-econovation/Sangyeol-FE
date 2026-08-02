import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="search"
        options={{
          animation: "fade",
          animationDuration: 50,
        }}
      />
      <Stack.Screen name="[mountainId]" />
    </Stack>
  );
};

export default _layout;
