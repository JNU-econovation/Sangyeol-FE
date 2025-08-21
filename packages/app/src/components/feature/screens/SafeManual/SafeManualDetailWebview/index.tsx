import PATH_ROUTE from "@constants/pathRoute";
import WebViewWithInjected from "@entities/WebViewWithInjected";
import { useLocalSearchParams } from "expo-router";

const SafeManualDetailWebview = () => {
  const { manual } = useLocalSearchParams();

  if (!manual || typeof manual !== "string") {
    console.error("Invalid manual parameter");
    return null;
  }

  return (
    <WebViewWithInjected
      source={{
        uri: PATH_ROUTE.WEBVIEW.SAFE_MANUAL_DETAIL({
          manual: manual,
        }),
      }}
    />
  );
};

export default SafeManualDetailWebview;
