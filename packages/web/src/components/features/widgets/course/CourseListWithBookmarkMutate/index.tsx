import type { CourseDifficulty } from "@/types/course";
import useBookmarkMutation from "@hooks/feature/query/mutate/useBookmarkMutation";
import useDeleteBookmarkMutation from "@hooks/feature/query/mutate/useDeleteBookmarkMutation";
import CoursePathwayPrefetcher from "@pages/course/CoursePathwayPrefetcher";
import CourseList from "@shared/ui/CourseList";

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
  const { mutate: postBookmark } = useBookmarkMutation();
  const { mutate: deleteBookmark } = useDeleteBookmarkMutation();

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
