import Spacing from "@shared/layout/Spacing";

const ChangeNumberFormSectionLoader = () => {
  return (
    <section>
      <form>
        {/* Phone Number Field Skeleton */}
        <div className="space-y-2">
          <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="flex items-center gap-2">
            <div className="flex-1 h-12 bg-gray-200 rounded animate-pulse" />
            <div className="h-12 w-18 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        <Spacing size={8} />

        {/* Verification Field Skeleton */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-12 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-12 bg-gray-200 rounded animate-pulse" />
            <div className="h-12 w-18 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        <Spacing size={20} />

        {/* Submit Button Skeleton */}
        <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />
      </form>
    </section>
  );
};

export default ChangeNumberFormSectionLoader;
