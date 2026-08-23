import ExternalWebView from "@shared/components/composites/ExternalWebView";
import { useLocalSearchParams } from "expo-router";

const ExternalWebviewScreen = () => {
  const { uri } = useLocalSearchParams<{ uri: string }>();

  return <ExternalWebView uri={uri} />;
};

export default ExternalWebviewScreen;
