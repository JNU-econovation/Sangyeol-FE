import authenticatedApi from "@/api/_instances/authenticatedApi";
import { TAB_TITLE_LIST } from "@/constants/course";
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

const useDeleteBookmarkMutation = ({
  mountainId,
}: UseDeleteBookmarkMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [DELETE_BOOKMARK_API_PATH],
    mutationFn: (courseId: string) =>
      deleteBookmarkApi(authenticatedApi, courseId),

    onMutate: (selectedCourseId) => {
      TAB_TITLE_LIST.forEach(({ sort }) => {
        // const prev = queryClient.getQueryData([BOOKMARK_API_PATH]);

        // 코스 리스트 데이터가 들어있다.
        const prevCourseListData =
          queryClient.getQueryData<GetCoursesOfMountainResponse>([
            COURSES_OF_MOUNTAIN_API_PATH(mountainId, {
              searchParams: { sortBy: sort },
            }),
          ]).courses;
        const newCourseListData = prevCourseListData.map((course) => {
          if (course.id === selectedCourseId) {
            return {
              ...course,
              bookmark: false,
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
      //   queryClient.setQueryData(
      //     [
      //       COURSES_OF_MOUNTAIN_API_PATH(mountainId, {
      //         searchParams: { sortBy },
      //       }),
      //     ],
      //     {
      //       courses: context,
      //     },
      //   );
      queryClient.invalidateQueries({ queryKey: [BOOKMARK_API_PATH] });
    },
  });
};

export default useDeleteBookmarkMutation;
