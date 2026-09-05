"use client";

import useRouteToInternalWebview from "@/shared/hooks/domain/bridge/useRouteToInternalWebview";

const MudeungsanHeaderSection = () => {
  const routeToCourseListPage = useRouteToInternalWebview();

  const handleClickCourseButton = () => routeToCourseListPage("V1_COURSES");

  return (
    <div className="flex w-full items-center justify-between">
      <h2 className="text-xl font-bold tracking-tight text-black-900">
        무등산국립공원
      </h2>
      <button
        className="text-sm font-semibold text-primary"
        onClick={handleClickCourseButton}
      >
        코스 보러가기 ›
      </button>
    </div>
  );
};

export default MudeungsanHeaderSection;
