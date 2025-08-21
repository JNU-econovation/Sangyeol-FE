import styled from "@emotion/native";
import { COLORS } from "@styles/colorPalette";
import Animated, {
  Easing,
  ReduceMotion,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { TouchableOpacityProps } from "react-native";

interface StopButtonProps extends TouchableOpacityProps {}

const StopButton = ({ onPressIn, onPressOut, ...props }: StopButtonProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressInHandler = () => {
    scale.value = withTiming(0.98, {
      duration: 150,
      easing: Easing.inOut(Easing.ease),
      reduceMotion: ReduceMotion.System,
    });
  };

  const onPressOutHandler = () => {
    scale.value = withTiming(1, {
      duration: 150,
      easing: Easing.inOut(Easing.ease),
      reduceMotion: ReduceMotion.System,
    });
  };

  return (
    <Animated.View style={animatedStyle}>
      <ActionButton
        activeOpacity={0.8}
        onPressIn={(e) => {
          onPressInHandler();
          onPressIn?.(e);
        }}
        onPressOut={(e) => {
          onPressOutHandler();
          onPressOut?.(e);
        }}
        {...props}
      >
        <StopSquare />
      </ActionButton>
    </Animated.View>
  );
};

const ActionButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  background-color: ${COLORS.mainGreen};
  width: 64px;
  height: 64px;
  border-radius: 32px;
`;

const StopSquare = styled.View`
  background-color: ${COLORS.mainWhite};
  width: 20px;
  height: 20px;
  border-radius: 1px;
`;

export default StopButton;
