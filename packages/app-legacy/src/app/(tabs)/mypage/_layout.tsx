import { useMypageWebviewStore } from "@store/webviewRef/mypageWebviewStore";
import Stack from "expo-router/stack";

const _MypageLayout = () => {
  const canGoBack = useMypageWebviewStore((state) => state.canGoBack);
  const gestureEnabled = !canGoBack;

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
