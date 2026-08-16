// import Text from "@shared/components/primitives/ui/Text";
import BackButton from "@modules/features/route/BackButton";

interface WeekHeaderProps {
  headerText?: string;
}

/**
 *
 * 이전 prev버전의 사용자 페이지에서 주로 사용되었던 헤더 컴포넌트입니다.
 * 현재 v(n)의 디자인과는 맞지 않음으로 사용하지 마세요
 */
export default function WeekHeader({ headerText }: WeekHeaderProps) {
  return (
    <header className="border-gray-30 flex justify-center pt-4 pb-3 bg-main-white sticky w-full top-0 z-10">
      <div className="absolute left-4">
        <BackButton />
      </div>
      <h1 className="text-center justify-center text-black text-base font-medium">
        {headerText}
      </h1>
    </header>
  );
}
