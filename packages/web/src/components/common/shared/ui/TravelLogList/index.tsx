import Spacing from "@shared/layout/Spacing";
import Button from "@shared/ui/Button";
import CourseMetaDataUi from "@shared/ui/CourseMetaDataUi";

interface TravelLogListProps {
  name: string;
  duration: number;
  length: number;
  imageSrc: string;
  onButtonClick?: () => void;
}

const TravelLogList = ({
  name,
  duration,
  length,
  imageSrc,
  onButtonClick,
}: TravelLogListProps) => {
  return (
    <li className="flex gap-4 justify-between bg-white rounded-lg p-3 shadow-sm">
      <div className="grow">
        <span className="text-lg font-semibold">{name}</span>
        <Spacing size={1} />
        <CourseMetaDataUi time={duration} distance={length} />
        <Spacing size={1} />
        <Button size="sm" onClick={() => onButtonClick?.()}>
          나의 기록
        </Button>
      </div>
      <div
        role="img"
        aria-label={name}
        className="w-24 h-24 bg-slate-100 rounded-xl relative overflow-hidden"
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </li>
  );
};

export default TravelLogList;
