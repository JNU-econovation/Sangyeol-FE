"use client";

import { getCourseById } from "@shared/api/proto";
import { Suspense } from "@suspensive/react";
import { useParams } from "next/navigation";

const CourseImageInfoSection = Suspense.with(
  {
    fallback: (
      <div className="h-10 w-full animate-pulse bg-gray-100 rounded-2xl border border-primary opacity-50" />
    ),
    name: "CourseImageInfoSection",
  },
  () => {
    const { courseId } = useParams<{
      courseId: string;
    }>();
    const { imageSrc } = getCourseById(courseId);

    return (
      //height값이 고정되어있습니다! 주의해주세요! (h-36)
      <div className="bg-green-500 rounded-2xl h-36 gap-4">
        <div
          className="flex items-center justify-center w-full h-full rounded-2xl"
          style={{
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>
    );
  },
);

export default CourseImageInfoSection;
