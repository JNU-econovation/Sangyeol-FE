import Text from "@shared/ui/Text";
import BackButton from "@widgets/route/BackButton";

interface WeekHeaderProps {
  headerText?: string;
}

export default function WeekHeader({ headerText }: WeekHeaderProps) {
  return (
    <header className="border-gray-30 flex justify-center pt-4 pb-3 bg-main-white fixed w-screen top-0 z-10">
      <div className="absolute left-4">
        <BackButton />
      </div>
      <h1 className="text-center justify-center text-black text-base font-medium">
        {headerText}
      </h1>
    </header>
  );
}
