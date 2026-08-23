import useCoursesOfMountainQuery from "@shared/api/suspenseQueries/useCoursesOfMountainQuery";

interface UseGetCourseDetailsProps {
  mountainId: string;
  courseId?: string;
}

/**
 * 산과 코스 id값을 받아 해당 산의 해당 코스의 상세 정보를 반환하는 훅입니다.
 *
 * useCoursesOfMountainQuery 훅을 바탕으로 필터링 하며, 해당 훅은 suspense query를 사용하므로 사용에 주의해주세요
 */
const useGetCourseDetails = ({
  mountainId,
  courseId,
}: UseGetCourseDetailsProps) => {
  const { data } = useCoursesOfMountainQuery({
    mountainId,
  });

  const courseIndex = data?.courses.findIndex(
    (course) => +course.id === +courseId,
  );

  if (courseIndex === -1)
    throw new Error("[useGetCourseDetails] 존재하지 않는 코스입니다.");

  return data?.courses[courseIndex];
};

export default useGetCourseDetails;
