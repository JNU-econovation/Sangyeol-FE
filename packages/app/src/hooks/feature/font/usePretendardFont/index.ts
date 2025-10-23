import { useFonts } from "expo-font";

const usePretendardFont = () => {
  return useFonts({
    "pretendard-black": require("@/assets/fonts/Pretendard-Black.otf"),
    "pretendard-bold": require("@/assets/fonts/Pretendard-Bold.otf"),
    "pretendard-extrabold": require("@/assets/fonts/Pretendard-ExtraBold.otf"),
    "pretendard-extralight": require("@/assets/fonts/Pretendard-ExtraLight.otf"),
    "pretendard-light": require("@/assets/fonts/Pretendard-Light.otf"),
    "pretendard-medium": require("@/assets/fonts/Pretendard-Medium.otf"),
    "pretendard-regular": require("@/assets/fonts/Pretendard-Regular.otf"),
    "pretendard-semibold": require("@/assets/fonts/Pretendard-SemiBold.otf"),
    "pretendard-thin": require("@/assets/fonts/Pretendard-Thin.otf"),
  });
};

export default usePretendardFont;
