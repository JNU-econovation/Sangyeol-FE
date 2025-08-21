"use client";

import { cn } from "@/utils/cn";
import Spacing from "@shared/layout/Spacing";
import { ReactNode, useEffect, useRef, useState } from "react";

interface CarouselProps {
  items: ReactNode[];
}

//TODO: 캐러샐 ui를 사용하는 곳에서 변경 가능하게 수정 필요
//TODO: 캐러샐에서 컴포넌트를 배열로 받게 되면 key값 이슈가 발생할 수 있음. 수정 필요
export default function Carousel({ items }: CarouselProps) {
  const [prevX, setPrevX] = useState(0);
  const [x, setX] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.getElementById(`page-${currentIndex}`)?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [currentIndex, items.length]);

  return (
    <div>
      <div
        ref={ref}
        className="flex max-w-full overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 transition-all"
        onTouchStart={(e) => {
          setPrevX(e.currentTarget.scrollLeft);
        }}
        onScroll={(e) => {
          if (e.currentTarget.scrollLeft <= 0) setX(0);
          setX(e.currentTarget.scrollLeft);
        }}
        onTouchEnd={(e) => {
          if (x <= 0) {
            setCurrentIndex(0);
            e.currentTarget.scrollLeft = prevX;
            return;
          }
          if (currentIndex >= items.length - 1 && x > prevX) {
            // no swipe
            setCurrentIndex(items.length - 1);
            e.currentTarget.scrollLeft = prevX;
            return;
          }
          if (x > prevX) {
            //right swipe
            const nextIndex =
              currentIndex >= items.length ? currentIndex : currentIndex + 1;
            document.getElementById(`page-${nextIndex}`)?.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "start",
            });
            setCurrentIndex(nextIndex);
          }
          if (x < prevX) {
            //left swipe
            const nextIndex = currentIndex <= 0 ? 0 : currentIndex - 1;
            document.getElementById(`page-${nextIndex}`)?.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "start",
            });
            setCurrentIndex(nextIndex);
          } else {
            // no swipe
            document.getElementById(`page-${currentIndex}`)?.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "start",
            });
          }
        }}
      >
        {items.map((component, index) => (
          <div
            key={index * 123 + 10}
            id={`page-${index}`}
            className="flex-shrink-0 w-full snap-center"
          >
            {component}
          </div>
        ))}
      </div>
      <Spacing size={1} />
      <div className="flex items-center justify-center gap-2">
        {items.map((_, index) => (
          <div
            className={cn("w-2 h-2 rounded-full", {
              "bg-main-green": currentIndex === index,
              "bg-gray-20": currentIndex !== index,
            })}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
