import { useCallback } from "react";
import Toast from "react-native-toast-message";

interface UseToastProps {
  type: "success" | "info" | "error";
  text1: string;
  text2: string;
}
const useToast = () => {
  return useCallback((props: UseToastProps) => {
    Toast.show({
      text1Style: {
        fontSize: 18,
        fontWeight: "bold",
        paddingBlock: 10,
      },
      text2Style: {
        fontSize: 14,
        marginBottom: 10,
      },
      topOffset: 70,
      ...props,
    });
  }, []);
};

export default useToast;
