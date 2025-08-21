import MountainCourseWebview from "@screens/course/MountainCourseWebview";
import ScreenContainer from "@shared/layout/Screen";

// 더이상 사용하지 않는 페이지입니다. 모든 코스 관련 페이지는 ./index.tsx를 확인해주세요
const MountainCourseScreen = () => {
  return (
    <ScreenContainer>
      <MountainCourseWebview />
    </ScreenContainer>
  );
};

export default MountainCourseScreen;
