import useTravelWithoutCourse from "@hooks/feature/travel/useTravelWithoutCourse";
import { useKeepAwake } from "expo-keep-awake";
import { useEffect } from "react";

const TravelWithoutCourseProcessSection = () => {
  const { start } = useTravelWithoutCourse();
  useKeepAwake();
  useEffect(() => {
    start();
  }, []);
  return null;
};

export default TravelWithoutCourseProcessSection;
