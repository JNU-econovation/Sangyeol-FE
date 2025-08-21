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

interface StartButtonProps extends TouchableOpacityProps {}

const StartButton = ({ onPressIn, onPressOut, ...props }: StartButtonProps) => {
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
        <PlayTriangle />
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

const PlayTriangle = styled.View`
  width: 0px;
  height: 0px;
  background-color: transparent;
  border-style: solid;
  border-left-width: 12px;
  border-right-width: 0px;
  border-bottom-width: 8px;
  border-top-width: 8px;
  border-left-color: ${COLORS.mainWhite};
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-top-color: transparent;
  margin-left: 3px;
`;

export default StartButton;
