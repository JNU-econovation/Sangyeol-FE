import { useWebviewHistoryStore } from "@shared/model/webviewHistoryStore";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const canGoBack = useWebviewHistoryStore((state) => state.canGoBack);

  // 웹뷰 내부에 뒤로 갈 페이지가 남아 있으면 앱의 스와이프 뒤로가기를 막는다.
  const gestureEnabled = !canGoBack;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="webview/[path]/index" options={{ gestureEnabled }} />
        <Stack.Screen
          name="external-webview/[uri]/index"
          options={{ presentation: "modal" }}
        />
      </Stack>
    </ThemeProvider>
  );
}
