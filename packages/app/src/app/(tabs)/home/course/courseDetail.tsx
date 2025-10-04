import CourseDetailWebview from "@screens/map/CourseDetailWebview";
import ScreenContainer from "@shared/layout/Screen";

// 더 이상 사용하지 않습니다. /sangyeol/packages/app/src/app/(tabs)/home/course/[moundtainId]/[courseId]/[params].tsx를 확인해주세요
const CourseDetailScreen = () => {
  return (
    <ScreenContainer>
      <CourseDetailWebview />
    </ScreenContainer>
  );
};

export default CourseDetailScreen;
