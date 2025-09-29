import Text from "@shared/ui/Text";
import BackButton from "@widgets/route/BackButton";

interface WeekHeaderProps {
  headerText?: string;
}

export default function WeekHeader({ headerText }: WeekHeaderProps) {
  return (
    <header className="border-gray-30 flex justify-center relative pb-3 bg-main-white">
      <div className="absolute left-0">
        <BackButton />
      </div>
      <h1 className="text-center justify-center text-black text-base font-medium">
        {headerText}
      </h1>
    </header>
  );
}
