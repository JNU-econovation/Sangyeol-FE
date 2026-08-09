import authenticatedApi from "@shared/api/_instances/authenticatedApi";
import { TAB_TITLE_LIST } from "@shared/constants/course";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  BOOKMARK_API_PATH,
  COURSES_OF_MOUNTAIN_API_PATH,
  DELETE_BOOKMARK_API_PATH,
  deleteBookmarkApi,
  type GetCoursesOfMountainResponse,
} from "api";

interface UseDeleteBookmarkMutationProps {
  mountainId: string;
}

type MutateContext = Array<{
  queryKey: string[];
  prevData: GetCoursesOfMountainResponse;
}>;

const useDeleteBookmarkMutation = ({
  mountainId,
}: UseDeleteBookmarkMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [DELETE_BOOKMARK_API_PATH],
    mutationFn: (courseId: string) =>
      deleteBookmarkApi(authenticatedApi, courseId),

    onMutate: async (selectedCourseId): Promise<MutateContext> => {
      const context: MutateContext = [];
      const processedKeys = new Set<string>();

      for (const { sort } of TAB_TITLE_LIST) {
        // SearchedCourseList에서 "my", "popular"는 sortBy 없이 요청됨
        const normalizedSort =
          sort === "my" || sort === "popular" ? undefined : sort;

        const queryKey = [
          COURSES_OF_MOUNTAIN_API_PATH(mountainId, {
            searchParams: { sortBy: normalizedSort },
          }),
        ];

        // 동일 쿼리 키 중복 처리 방지 ("my", "popular"는 같은 키)
        if (processedKeys.has(queryKey[0])) continue;
        processedKeys.add(queryKey[0]);

        await queryClient.cancelQueries({ queryKey });

        const prevData =
          queryClient.getQueryData<GetCoursesOfMountainResponse>(queryKey);
        if (!prevData) continue;

        context.push({ queryKey, prevData });

        queryClient.setQueryData(queryKey, {
          ...prevData,
          courses: prevData.courses.map((course) =>
            course.id === selectedCourseId
              ? { ...course, bookmark: false }
              : course,
          ),
        });
      }

      return context;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BOOKMARK_API_PATH] });
    },
    onError: (_, __, context) => {
      context?.forEach(({ queryKey, prevData }) => {
        queryClient.setQueryData(queryKey, prevData);
      });
    },
  });
};

export default useDeleteBookmarkMutation;
