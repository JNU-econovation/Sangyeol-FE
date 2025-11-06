import WebViewWithInjected from "@entities/WebViewWithInjected";
import ScreenContainer from "@shared/layout/Screen";
import { useMypageWebviewStore } from "@store/webviewRef/mypageWebviewStore";
import { useLocalSearchParams } from "expo-router";

const MyPageWebviewScreen = () => {
  const { url } = useLocalSearchParams<{ url: string }>();
  const { setCanGoBack } = useMypageWebviewStore();

  return (
    <ScreenContainer>
      {url && (
        <WebViewWithInjected
          source={{
            uri: decodeURIComponent(url.trim()),
          }}
          onNavigate={({ canGoBack }) => setCanGoBack(canGoBack)}
        />
      )}
    </ScreenContainer>
  );
};

export default MyPageWebviewScreen;
