/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { cn } from "@/utils/cn";
import { memo, PropsWithChildren, useEffect, useRef, useState } from "react";

const MIN_CONTENT_HEIGHT = 0; // 최소 컨텐츠 높이
const SNAP_THRESHOLD = 1; // 스냅 임계값

interface BottomSheetProps extends PropsWithChildren {
  debug?: boolean;
}

export default memo(function BottomSheet({
  debug,
  children,
}: BottomSheetProps) {
  const [isReady, setIsReady] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [startY, setStartY] = useState(0); // 드래그 시작 Y 좌표
  const [currentY, setCurrentY] = useState(0); // 현재 드래그 Y 좌표
  const [contentHeight, setContentHeight] = useState(0); // 현재 컨텐츠 높이
  const [maxContentHeight, setMaxContentHeight] = useState(0); // 최대 컨텐츠 높이
  const [isOpen, setIsOpen] = useState(true); // BottomSheet 열림 상태

  const bottomSheet = useRef<HTMLDivElement | null>(null);
  const bottomSheetContent = useRef<HTMLDivElement | null>(null);

  // 초기 설정
  useEffect(() => {
    if (bottomSheet.current && bottomSheetContent.current) {
      setMaxContentHeight(bottomSheetContent.current.scrollHeight);
      setContentHeight(bottomSheetContent.current.scrollHeight);
      setIsReady(true);
    }
  }, []);

  // 마우스의 움직임에 따라 BottomSheet의 높이를 조정하는 핸들러
  const handleMove = (e: MouseEvent) => {
    if (!isPressed) return;

    const deltaY = e.clientY - startY;
    const newHeight = Math.max(
      MIN_CONTENT_HEIGHT,
      Math.min(maxContentHeight, contentHeight - deltaY)
    );

    setCurrentY(e.clientY);

    if (bottomSheetContent.current) {
      bottomSheetContent.current.style.height = `${newHeight}px`;
    }
  };

  // 마우스가 어디로 이동했는지에 따라 열거나 닫는 핸들러
  const handleMouseUp = (e: MouseEvent) => {
    if (!isPressed) return;

    setIsPressed(false);

    const deltaY = e.clientY - startY;
    const newHeight = Math.max(
      MIN_CONTENT_HEIGHT,
      Math.min(maxContentHeight, contentHeight - deltaY)
    );

    // 스냅 로직
    let finalHeight = newHeight;

    if (Math.abs(deltaY) > SNAP_THRESHOLD) {
      if (deltaY > 0) {
        setIsOpen(false);
        finalHeight = MIN_CONTENT_HEIGHT;
      } else {
        setIsOpen(true);
        finalHeight = maxContentHeight;
      }
    }

    setContentHeight(finalHeight);
  };

  // 손가락 터치에 따라 BottomSheet의 높이를 조정하는 핸들러
  const handleTouchMove = (e: TouchEvent) => {
    if (!isPressed) return;
    e.preventDefault();

    const deltaY = e.touches[0].clientY - startY;
    const newHeight = Math.max(
      MIN_CONTENT_HEIGHT,
      Math.min(maxContentHeight, contentHeight - deltaY)
    );

    setCurrentY(e.touches[0].clientY);

    // 실시간으로 높이 변경
    if (bottomSheetContent.current) {
      bottomSheetContent.current.style.height = `${newHeight}px`;
    }
  };

  // 손가락 터치가 끝났을 때 BottomSheet를 열거나 닫는 핸들러
  const handleTouchEnd = (e: TouchEvent) => {
    if (!isPressed) return;

    setIsPressed(false);

    const deltaY = e.changedTouches[0].clientY - startY;
    const newHeight = Math.max(
      MIN_CONTENT_HEIGHT,
      Math.min(maxContentHeight, contentHeight - deltaY)
    );

    // 스냅 로직
    let finalHeight = newHeight;

    if (Math.abs(deltaY) > SNAP_THRESHOLD) {
      if (deltaY > 0) {
        setIsOpen(false);
        finalHeight = MIN_CONTENT_HEIGHT;
      } else {
        setIsOpen(true);
        finalHeight = maxContentHeight;
      }
    }

    setContentHeight(finalHeight);
  };

  // 이벤트 리스너 등록
  useEffect(() => {
    if (isPressed) {
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);

      document.body.style.userSelect = "none";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.userSelect = "";
      document.body.style.touchAction = "";

      if (bottomSheetContent.current) {
        bottomSheetContent.current.style.height = `${contentHeight}px`;
      }
    }

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      document.body.style.userSelect = "";
      document.body.style.touchAction = "";
    };
  }, [
    isPressed,
    startY,
    contentHeight,
    handleMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd,
  ]);

  return (
    <div
      ref={bottomSheet}
      className={cn(
        "rounded-3xl bg-white overflow-hidden transition-all transform-gpu shadow-md"
      )}
    >
      <button
        className="w-full flex items-center justify-center pt-3 pb-6 select-none h-fit"
        onMouseDown={(e) => {
          e.preventDefault();
          setIsPressed(true);
          setStartY(e.clientY);
          setCurrentY(e.clientY);
        }}
        onTouchStart={(e) => {
          e.preventDefault();
          setIsPressed(true);
          setStartY(e.touches[0].clientY);
          setCurrentY(e.touches[0].clientY);
        }}
      >
        <div className="w-16 h-2 bg-main-green rounded-2xl" />
      </button>

      {debug && (
        <div className="p-4 text-sm bg-gray-100 border-b">
          <p>시작 Y: {startY}</p>
          <p>현재 Y: {currentY}</p>
          <p>이동 거리: {currentY - startY}</p>
          <p>현재 높이: {contentHeight}px</p>
          <p>최대 높이: {maxContentHeight}px</p>
          <p>최소 높이: {MIN_CONTENT_HEIGHT}px</p>
          <p>드래그 중: {isPressed ? "Yes" : "No"}</p>
          <p>준비 완료: {isReady ? "Yes" : "No"}</p>
          <p>열림 상태: {isOpen ? "Yes" : "No"}</p>
        </div>
      )}

      <div
        ref={bottomSheetContent}
        className="px-4"
        style={{
          transition: isPressed ? "none" : "height 0.25s ease-out",
        }}
      >
        {children}
      </div>
    </div>
  );
});
