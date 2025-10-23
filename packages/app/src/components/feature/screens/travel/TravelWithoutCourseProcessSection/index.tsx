import useTravelWithoutCourse from "@hooks/feature/travel/useTravelWithoutCourse";
import { useEffect } from "react";

const TravelWithoutCourseProcessSection = () => {
  const { start } = useTravelWithoutCourse();
  useEffect(() => {
    start();
  }, []);
  return null;
};

export default TravelWithoutCourseProcessSection;
