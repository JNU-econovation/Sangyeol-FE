import useTravelCourse from "@hooks/feature/travel/useTravelCourse";
import { useLocalSearchParams } from "expo-router";
import { memo, useEffect } from "react";

const TravelWithCourseProcessSection = memo(() => {
  const { courseId, mountainId } = useLocalSearchParams<{
    courseId: string;
    mountainId: string;
  }>();
  const { start } = useTravelCourse({
    mountainId: mountainId,
    courseId: courseId,
  });

  useEffect(() => {
    start();
  }, []);
  return null;
});

export default TravelWithCourseProcessSection;
