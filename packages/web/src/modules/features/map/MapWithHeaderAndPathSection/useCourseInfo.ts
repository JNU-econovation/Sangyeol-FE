import { useParams } from "next/navigation";

const useCourseInfo = () => {
  const params = useParams<{
    courseId: string;
  }>();

  const { courseId } = params;

  return {
    courseId,
  };
};

export default useCourseInfo;
