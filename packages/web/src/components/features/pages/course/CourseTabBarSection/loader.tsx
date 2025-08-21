import Spacing from "@shared/layout/Spacing";

export default function CourseTabBarSectionLoader() {
  return (
    <section className="flex flex-col flex-1 overflow-hidden">
      {/* Tab Bar Skeleton */}
      <div className="flex justify-between items-center px-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="px-3 py-1 bg-slate-100 rounded-full text-sm w-14 h-5 animate-pulse"
          />
        ))}
      </div>
      <Spacing size={4} />

      {/* Course List Skeleton */}
      <ul className="flex flex-col gap-4 bg-gray-200 p-6 overflow-y-hidden flex-1">
        {Array.from({ length: 6 }).map((_, index) => (
          <li
            key={index}
            className="flex gap-4 justify-between bg-white rounded-lg p-3 animate-pulse"
          >
            <div className="flex flex-col justify-between grow">
              <div className="h-6 bg-slate-100 rounded w-40 mb-2" />
              <div className="flex gap-2">
                <div className="h-4 bg-slate-100 rounded w-16" />
                <div className="h-4 bg-slate-100 rounded w-16" />
                <div className="h-4 bg-slate-100 rounded w-16" />
              </div>
            </div>
            <div className="w-24 h-24 bg-slate-100 rounded-xl relative" />
          </li>
        ))}
      </ul>
    </section>
  );
}
