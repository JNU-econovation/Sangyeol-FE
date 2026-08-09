import CourseBookmarkContentSection from "@modules/widgets/course-bookmark/CourseBookmarkContentSection";
import CourseBookmarkHeaderSection from "@modules/widgets/course-bookmark/CourseBookmarkHeaderSection";
import Spacing from "@shared/components/primitives/layout/Spacing";

const CourseBookmarkPage = () => {
  return (
    <>
      <CourseBookmarkHeaderSection />
      <div className="h-screen flex flex-col bg-gray-300">
        <Spacing size={14} />
        <CourseBookmarkContentSection />
      </div>
    </>
  );
};

export default CourseBookmarkPage;
