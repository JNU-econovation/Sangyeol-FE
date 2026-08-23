"use client";

import Button from "@shared/components/primitives/ui/Button";
import ROUTE from "@shared/constants/route";
import { useParams } from "next/dist/client/components/navigation";
import { useStackLinkRouter } from "stack-link";

const CourseDetailDescriptionRedirectButton = () => {
  const { courseId } = useParams<{
    courseId: string;
  }>();

  const { navigate } = useStackLinkRouter({
    prefetchHref: courseId ? ROUTE.V1_COURSE_DESCRIPTION(courseId) : null,
  });

  const handleCourseDescriptionClick = () => {
    if (!courseId) return;
    if (courseId !== "1") return; // 현재는 당산나무 코스만 상세페이지가 존재
    navigate({ href: ROUTE.V1_COURSE_DESCRIPTION(courseId) });
  };

  if (courseId !== "1") return;

  return (
    <Button fullWidth onClick={handleCourseDescriptionClick}>
      코스 상세보기
    </Button>
  );
};

export default CourseDetailDescriptionRedirectButton;
