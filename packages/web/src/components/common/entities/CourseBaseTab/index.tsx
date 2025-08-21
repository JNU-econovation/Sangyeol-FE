"use client";

import { cn } from "@/utils/cn";
import { ReactNode, useState } from "react";

interface CourseBaseTabProps {
  courseList: string[];
  onChange?: (courseName: string) => void;
  children?: ({
    selectedCourseName,
  }: {
    selectedCourseName: string;
  }) => ReactNode;
}

export default function CourseBaseTab({
  courseList,
  onChange,
  children,
}: CourseBaseTabProps) {
  const [selectedCourseName, setSelectedCourseName] = useState<string | null>(
    courseList[0]
  );

  return (
    <>
      <div className="flex items-center justify-center bg-gray-30 rounded-full mx-auto w-full">
        {courseList.map((courseName, index) => (
          <button
            className={cn(
              "px-4 py-1 rounded-full transition-all grow shrink-0",
              {
                "border border-main-green bg-white":
                  selectedCourseName === courseName,
              }
            )}
            key={`${index}-${courseName}`}
            onClick={() => {
              if (selectedCourseName === courseName) return;

              setSelectedCourseName(courseName);
              if (onChange) onChange(courseName);
            }}
          >
            <span className="font-bold text-xl">{courseName}</span>
          </button>
        ))}
      </div>
      {children &&
        children({
          selectedCourseName: selectedCourseName ?? "",
        })}
    </>
  );
}
