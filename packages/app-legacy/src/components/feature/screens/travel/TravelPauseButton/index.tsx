import SocketManager from "@service/socket/manager";
import PauseButton from "@shared/ui/buttons/PauseButton";
import useTravelStateStore from "@store/travel";
import * as Location from "expo-location";
import { useLocalSearchParams } from "expo-router";

const TravelPauseButton = () => {
  const { courseId } = useLocalSearchParams<{ courseId?: string }>();
  const socketManager = SocketManager.getInstance();
  const { connectedURL } = useTravelStateStore();

  const handlePause = async () => {
    try {
      const { latitude, longitude } = (
        await Location.getCurrentPositionAsync({})
      ).coords;

      const coordinate = [longitude, latitude];
      const message = courseId
        ? {
            event: "pause",
            data: {
              coordinate,
              courseId,
              time: Date.now(),
            },
          }
        : {
            event: "pause",
            data: {
              coordinate,
              time: Date.now(),
            },
          };

      if (!connectedURL) {
        console.warn("[TravelPauseButton] No connected URL found.");
        return;
      }
      const socket = socketManager.getSocket(connectedURL);

      if (!socket) {
        console.warn("[TravelPauseButton] No socket found.");
        return;
      }
      socket.sendMessage(message);
    } catch (error) {
      console.error("[TravelPauseButton] 위치 가져오기 실패:", error);
    }
  };

  return <PauseButton onPressOut={handlePause} />;
};

export default TravelPauseButton;
