const MyInfoSectionLoader = () => {
  return (
    <section>
      {/* header */}
      <div className="px-6">
        <div className="flex justify-center">
          <div className="h-7 w-28 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="h-5" />
        <hr className="w-full mx-auto text-gray-300" />
      </div>
      <div className="h-7" />

      {/* content */}
      <div className="flex flex-col items-center">
        {/* 프로필 이미지 */}
        <div className="w-24 h-24 bg-gray-200 rounded-full animate-pulse" />
        <div className="h-5" />

        {/* 프로필 변경 텍스트 */}
        <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
        <div className="h-5" />

        {/* 이름 */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="w-2.5 h-2.5 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="h-4" />

        {/* 산행 기록, 코스 북마크 */}
        <div className="flex flex-row items-center gap-22">
          <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 w-28 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default MyInfoSectionLoader;
