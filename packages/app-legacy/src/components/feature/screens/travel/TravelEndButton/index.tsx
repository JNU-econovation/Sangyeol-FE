import SocketManager from "@service/socket/manager";
import StopButton from "@shared/ui/buttons/StopButton";
import useTravelStateStore from "@store/travel";
import { useLocalSearchParams } from "expo-router";
import * as Location from "expo-location";

const TravelEndButton = () => {
  const { courseId } = useLocalSearchParams();
  const socketManager = SocketManager.getInstance();
  const { connectedURL, getElapsedTime } = useTravelStateStore();

  const handleEnd = async () => {
    const { latitude, longitude } = (await Location.getCurrentPositionAsync({}))
      .coords;
    const message = courseId
      ? {
          event: "end",
          data: {
            coordinate: [longitude, latitude],
            courseId,
            time: Date.now(),
            totalTravelTime: getElapsedTime(),
          },
        }
      : {
          event: "end",
          data: {
            coordinate: [longitude, latitude],
            time: Date.now(),
            totalTravelTime: getElapsedTime(),
          },
        };

    if (!connectedURL) {
      console.warn("[TravelEndButton] No connected URL found.");
      return;
    }
    const socket = socketManager.getSocket(connectedURL);

    if (!socket) {
      console.warn("[TravelEndButton] No socket found.");
      return;
    }
    socket.sendMessage(message);
  };

  return <StopButton onPressOut={handleEnd} />;
};

export default TravelEndButton;
