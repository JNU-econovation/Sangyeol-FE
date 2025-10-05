import CourseBookmarkContentSection from "@pages/course-bookmark/CourseBookmarkContentSection";
import CourseBookmarkHeaderSection from "@pages/course-bookmark/CourseBookmarkHeaderSection";
import Spacing from "@shared/layout/Spacing";

const CourseBookmarkPage = () => {
  return (
    <>
      <CourseBookmarkHeaderSection />
      <div className="h-screen flex flex-col bg-gray-600">
        <Spacing size={14} />
        <CourseBookmarkContentSection />
      </div>
    </>
  );
};

export default CourseBookmarkPage;
