import { useMypageWebviewStore } from "@store/webviewRef/mypageWebviewStore";
import Stack from "expo-router/stack";

const _MypageLayout = () => {
  const gestureEnabled = !useMypageWebviewStore().canGoBack;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled,
      }}
    />
  );
};

export default _MypageLayout;
