import SocketManager from "@service/socket/manager";
import StartButton from "@shared/ui/buttons/StartButton";
import useTravelStateStore from "@store/travel";
import { useLocalSearchParams } from "expo-router";

const TravelContinueButton = () => {
  const { courseId } = useLocalSearchParams();
  const socketManager = SocketManager.getInstance();
  const { connectedURL } = useTravelStateStore();

  const handleContinue = () => {
    const message = courseId
      ? {
          event: "restart",
          data: {
            coordinate: [],
            courseId,
            time: Date.now(),
          },
        }
      : {
          event: "restart",
          data: {
            coordinate: [],
            time: Date.now(),
          },
        };

    if (!connectedURL) {
      console.warn("[TravelContinueButton] No connected URL found.");
      return;
    }
    const socket = socketManager.getSocket(connectedURL);

    if (!socket) {
      console.warn("[TravelContinueButton] No socket found.");
      return;
    }
    socket.sendMessage(message);
  };

  return <StartButton onPressOut={handleContinue} />;
};

export default TravelContinueButton;
