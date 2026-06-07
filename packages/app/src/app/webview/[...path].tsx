import PATH_ROUTE from "@constants/pathRoute";
import WebViewWithInjected from "@entities/WebViewWithInjected";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const WebViewRoute = () => {
  const { path } = useLocalSearchParams<{ path: string | string[] }>();

  // base URL과 동적 경로를 "/"가 연속 2개로 나오지 않도록 결합한다.
  const joinUri = (base: string, segment: string) => {
    const normalizedBase = base.replace(/\/+$/, "");
    const normalizedSegment = segment.replace(/^\/+/, "");

    return normalizedSegment
      ? `${normalizedBase}/${normalizedSegment}`
      : normalizedBase;
  };

  const joinedPath = Array.isArray(path) ? path.join("/") : (path ?? "");
  const uri = joinUri(PATH_ROUTE.WEBVIEW.BASE_URL, joinedPath);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebViewWithInjected
        loadingBar
        source={{
          uri,
        }}
      />
    </SafeAreaView>
  );
};

export default WebViewRoute;
