import PATH_ROUTE from "@constants/pathRoute";
import WebViewWithInjected from "@entities/WebViewWithInjected";
import { useLocalSearchParams } from "expo-router";

const CustomerCenterWebview = () => {
  const { tab } = useLocalSearchParams();

  return (
    <WebViewWithInjected
      source={{ uri: PATH_ROUTE.WEBVIEW.CUSTOMER_CENTER(tab ?? "FAQ") }}
    />
  );
};

export default CustomerCenterWebview;
