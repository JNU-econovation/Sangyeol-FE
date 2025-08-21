import type { Coordinate } from "@/types/map";
import useCoursePathwayQuery from "@hooks/feature/query/query/useCoursePathwayQuery";

interface UseGetCoursePathByCourseIdParams {
  courseId: string;
}

/**
 * courseId로 코스의 경로를 위경도 배열로 가져오는 훅입니다.
 *
 * [!warning] 해당 훅은 suspense query를 포함하고있습니다!
 * 필요시 suspense를 사용해야만 합니다.
 */

const useGetCoursePathByCourseId = ({
  courseId,
}: UseGetCoursePathByCourseIdParams) => {
  const { data } = useCoursePathwayQuery({ courseId });

  return data.pathways.flatMap(
    ({ coordinates }) => coordinates
  ) as Coordinate[];
};

export default useGetCoursePathByCourseId;
