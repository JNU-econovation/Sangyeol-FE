import StopButton from "@components/common/shared/ui/buttons/StopButton";
import SocketManager from "@service/socket/manager";
import useTravelStateStore from "@store/travel";
import { useLocalSearchParams } from "expo-router";

const TravelEndButton = () => {
  const { courseId } = useLocalSearchParams();
  const socketManager = SocketManager.getInstance();
  const { connectedURL } = useTravelStateStore();

  const handleEnd = () => {
    const message = courseId
      ? {
          event: "end",
          data: {
            coordinate: [],
            courseId,
            time: Date.now(),
          },
        }
      : {
          event: "end",
          data: {
            coordinate: [],
            time: Date.now(),
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
