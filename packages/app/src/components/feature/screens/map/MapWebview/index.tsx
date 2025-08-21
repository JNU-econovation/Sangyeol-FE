import PATH_ROUTE from "@constants/pathRoute";
import WebViewWithInjected from "@entities/WebViewWithInjected";
import useGetCurrentPosition from "@hooks/feature/useGetCurrentPosition";

const MapWebview = () => {
  const { location } = useGetCurrentPosition();

  return (
    <WebViewWithInjected
      source={{
        uri: PATH_ROUTE.WEBVIEW.MAP,
      }}
      onMessage={({ method, name }) => {
        if (name === "get-current-position" && method === "GET") {
          return {
            name: "get-current-position",
            status: "success",
            data: location,
          };
        }

        return {
          name: "unknown-message",
          status: "error",
          data: "Unknown message received",
        };
      }}
    />
  );
};

export default MapWebview;
