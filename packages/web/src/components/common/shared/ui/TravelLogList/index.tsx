import Spacing from "@shared/layout/Spacing";
import Button from "@shared/ui/Button";
import CourseMetaDataUi from "@shared/ui/CourseMetaDataUi";
import Image from "next/image";

interface TravelLogListProps {
  name: string;
  duration: number;
  length: number;
  imageSrc: string;
}

const TravelLogList = ({
  name,
  duration,
  length,
  imageSrc,
}: TravelLogListProps) => {
  return (
    <li className="flex gap-4 justify-between bg-white rounded-lg p-3 shadow-sm">
      <div className="grow">
        <span className="text-lg font-semibold">{name}</span>
        <Spacing size={1} />
        <CourseMetaDataUi time={duration} distance={length} />
        <Spacing size={1} />
        <Button size="sm">나의 기록</Button>
      </div>
      <div className="w-24 h-24 bg-slate-100 rounded-xl relative overflow-hidden">
        <Image src={imageSrc} alt="코스 경로" width={96} height={96} />
      </div>
    </li>
  );
};

export default TravelLogList;
