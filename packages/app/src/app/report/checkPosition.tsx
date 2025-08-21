import WebViewWithInjected from "@components/common/entities/WebViewWithInjected";
import PATH_ROUTE from "@constants/pathRoute";
import useGetCurrentPosition from "@hooks/feature/useGetCurrentPosition";
import ScreenContainer from "@shared/layout/Screen";
import Header from "@shared/ui/Header";
import { useReportPositionStore } from "@store/report/useReportPositionStore";

const CheckPositionScreen = () => {
  const { isLoading, location } = useGetCurrentPosition();
  const { setReportPosition } = useReportPositionStore();

  if (isLoading || !location) {
    return null;
  }

  const {
    coords: { latitude, longitude },
  } = location;

  return (
    <ScreenContainer>
      <Header />
      {/* TODO: 분리 */}
      <WebViewWithInjected
        source={{ uri: PATH_ROUTE.WEBVIEW.CHECK_POSITION(latitude, longitude) }}
        onMessage={({ method, name, body }) => {
          if (name === "set-report-position" && method === "POST") {
            const { latitude, longitude } = body as {
              latitude: number;
              longitude: number;
            };
            setReportPosition({ latitude, longitude });

            return {
              name: "set-report-position",
              status: "success",
            };
          }
          return {
            name: "set-report-position",
            status: "error",
            message: "Invalid request",
          };
        }}
      />
    </ScreenContainer>
  );
};

export default CheckPositionScreen;
