import Spacing from "@shared/components/primitives/layout/Spacing";
import { cn } from "@shared/utils/cn";

const ProfileFormSectionLoader = () => {
  return (
    <div className="flex flex-col max-h-screen overflow-y-auto gap-8">
      {Array.from({ length: 7 }).map((_, index) => (
        <div key={index}>
          <div
            className={cn(
              "h-4 bg-gray-100 rounded-xl animate-pulse",
              index % 3 === 0 && "w-28",
              index % 3 === 1 && "w-12",
              index % 3 === 2 && "w-20",
            )}
          />
          <Spacing size={2} />
          <div className="w-full h-10 bg-gray-100 rounded-xl animate-pulse" />
        </div>
      ))}
    </div>
  );
};

export default ProfileFormSectionLoader;
