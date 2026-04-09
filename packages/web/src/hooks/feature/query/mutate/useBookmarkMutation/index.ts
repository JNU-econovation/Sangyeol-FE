import { BOOKMARK_API_PATH, postBookmarkApi } from "api";
import {
  COURSES_OF_MOUNTAIN_API_PATH,
  CourseSortType,
  GetCoursesOfMountainResponse,
} from "api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import authenticatedApi from "@/api/_instances/authenticatedApi";
import { TAB_TITLE_LIST } from "@/constants/course";

interface UseBookmarkMutationProps {
  mountainId: string;
}

/**
 * 북마크 추가 Mutation
 *
 * 인자로 mountainId, sortBy를 받는 것은 낙관적 업데이트를 위함이다.(올바른 방법인지는 확인 필요)
 */
const useBookmarkMutation = ({ mountainId }: UseBookmarkMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [BOOKMARK_API_PATH],
    mutationFn: (courseId: string) =>
      postBookmarkApi(authenticatedApi, courseId),
    onMutate: (selectedCourseId) => {
      TAB_TITLE_LIST.forEach(({ sort }) => {
        const prevCoursesOfMountainResponse =
          queryClient.getQueryData<GetCoursesOfMountainResponse>([
            COURSES_OF_MOUNTAIN_API_PATH(mountainId, {
              searchParams: { sortBy: sort },
            }),
          ]);
        if (!prevCoursesOfMountainResponse) return;
        const prevCourseListData = prevCoursesOfMountainResponse.courses;

        const newCourseListData = prevCourseListData?.map((course) => {
          if (course.id === selectedCourseId) {
            return {
              ...course,
              bookmark: true,
            };
          }
          return course;
        });

        queryClient.setQueryData(
          [
            COURSES_OF_MOUNTAIN_API_PATH(mountainId, {
              searchParams: { sortBy: sort },
            }),
          ],
          {
            courses: newCourseListData,
          },
        );
      });
      // return prevCourseListData;
    },

    onSuccess: () => {
      // TODO: 낙관적 업데이트로 변경하기
      queryClient.invalidateQueries({ queryKey: [BOOKMARK_API_PATH] });
    },
    onError: (_, __, context) => {
      // queryClient.setQueryData(
      //   [
      //     COURSES_OF_MOUNTAIN_API_PATH(mountainId, {
      //       searchParams: { sortBy },
      //     }),
      //   ],
      //   {
      //     courses: context,
      //   },
      // );
      queryClient.invalidateQueries({ queryKey: [BOOKMARK_API_PATH] });
    },
  });
};

export default useBookmarkMutation;
