// import { CourseSortType } from "@/api/v1/mountains/[mountainId]/courses";
import type { CourseDifficulty } from "@shared/types/course";
import useBookmarkMutation from "@shared/api/mutates/useBookmarkMutation";
import useDeleteBookmarkMutation from "@shared/api/mutates/useDeleteBookmarkMutation";
import CoursePathwayPrefetcher from "@modules/widgets/course/CoursePathwayPrefetcher";
import CourseList from "@shared/components/primitives/ui/CourseList";
import { useParams } from "next/navigation";

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
