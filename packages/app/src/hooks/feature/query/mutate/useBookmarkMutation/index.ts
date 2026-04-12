import { BOOKMARK_API_PATH, postBookmarkApi } from "api";
import {
  COURSES_OF_MOUNTAIN_API_PATH,
  CourseSortType,
  GetCoursesOfMountainResponse,
} from "api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import authenticatedApi from "@api/_instances/authenticatedApi";

interface UseBookmarkMutationProps {
  mountainId: string;
  sortBy: CourseSortType;
}

/**
 * 북마크 추가 Mutation
 *
 * 인자로 mountainId, sortBy를 받는 것은 낙관적 업데이트를 위함이다.(올바른 방법인지는 확인 필요)
 */
const useBookmarkMutation = ({
  mountainId,
  sortBy,
}: UseBookmarkMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [BOOKMARK_API_PATH],
    mutationFn: (courseId: string) =>
      postBookmarkApi(authenticatedApi, courseId),
    onMutate: async (selectedCourseId) => {
      const queryKey = [
        COURSES_OF_MOUNTAIN_API_PATH(mountainId, {
          searchParams: { sortBy },
        }),
      ];

      await queryClient.cancelQueries({ queryKey });

      const prevCoursesResponse =
        queryClient.getQueryData<GetCoursesOfMountainResponse>(queryKey);
      if (prevCoursesResponse == null) return null;

      queryClient.setQueryData(queryKey, {
        ...prevCoursesResponse,
        courses: prevCoursesResponse.courses.map((course) =>
          course.id === selectedCourseId
            ? { ...course, bookmark: true }
            : course,
        ),
      });

      return prevCoursesResponse;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BOOKMARK_API_PATH] });
    },
    onError: (_, __, context) => {
      if (context == null) return;
      queryClient.setQueryData(
        [
          COURSES_OF_MOUNTAIN_API_PATH(mountainId, {
            searchParams: { sortBy },
          }),
        ],
        context,
      );
    },
  });
};

export default useBookmarkMutation;
