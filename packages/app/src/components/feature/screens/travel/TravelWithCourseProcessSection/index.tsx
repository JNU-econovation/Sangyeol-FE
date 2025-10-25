import useTravelCourse from "@hooks/feature/travel/useTravelCourse";
import { useKeepAwake } from "expo-keep-awake";
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
  useKeepAwake();

  useEffect(() => {
    start();
  }, []);
  return null;
});

export default TravelWithCourseProcessSection;
