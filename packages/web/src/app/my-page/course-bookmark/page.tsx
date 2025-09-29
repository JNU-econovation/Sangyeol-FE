import CourseBookmarkContentSection from "@pages/course-bookmark/CourseBookmarkContentSection";
import CourseBookmarkHeaderSection from "@pages/course-bookmark/CourseBookmarkHeaderSection";
import Spacing from "@shared/layout/Spacing";

const CourseBookmarkPage = () => {
  return (
    <div className="h-screen flex flex-col">
      <Spacing size={4} />
      <CourseBookmarkHeaderSection />
      <CourseBookmarkContentSection />
    </div>
  );
};

export default CourseBookmarkPage;
