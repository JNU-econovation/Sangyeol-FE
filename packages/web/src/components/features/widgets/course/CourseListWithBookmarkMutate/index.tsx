// import { CourseSortType } from "@/api/v1/mountains/[mountainId]/courses";
import type { CourseDifficulty } from "@/types/course";
import useBookmarkMutation from "@hooks/feature/query/mutate/useBookmarkMutation";
import useDeleteBookmarkMutation from "@hooks/feature/query/mutate/useDeleteBookmarkMutation";
import CoursePathwayPrefetcher from "@pages/course/CoursePathwayPrefetcher";
import CourseList from "@shared/ui/CourseList";
import { CourseSortType } from "api";
import { useParams, useSearchParams } from "next/navigation";

interface CourseListWithBookmarkMutateProps {
  id: string;
  name: string;
  duration: number;
  length: number;
  difficulty: CourseDifficulty;
  bookmark: boolean;
  image: string;
  onSetStared?: () => void;
  onResetStared?: () => void;
}

export default function CourseListWithBookmarkMutate({
  id,
  bookmark,
  image,
  ...props
}: CourseListWithBookmarkMutateProps) {
  const { mountainId } = useParams<{ mountainId: string }>();
  const searchParams = useSearchParams();

  const { mutate: postBookmark } = useBookmarkMutation({
    mountainId,
  });
  const { mutate: deleteBookmark } = useDeleteBookmarkMutation({
    mountainId,
  });

  return (
    <>
      <CourseList
        {...props}
        imageSrc={image}
        stared={bookmark}
        onSetStared={() => postBookmark(id)}
        onResetStared={() => deleteBookmark(id)}
      />
      <CoursePathwayPrefetcher courseId={id} />
    </>
  );
}
