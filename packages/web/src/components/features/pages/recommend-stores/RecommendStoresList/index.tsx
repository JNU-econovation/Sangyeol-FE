import Spacing from "@shared/layout/Spacing";
import Button from "@shared/ui/Button";
import CopyIcon from "@shared/ui/icons/CopyIcon";

const RecommendStoresList = () => {
  return (
    <ul className="flex flex-col gap-4">
      {Array.from({ length: 10 }).map(() => (
        <li className="p-2 rounded-xl bg-white">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">부곡정</h3>
            <div className="text-gray-700 flex items-center gap-1">
              주소 복사하기
              <CopyIcon />
            </div>
          </div>
          <Spacing size={4} />
          <hr className="opacity-20" />
          <Spacing size={4} />
          <div className="flex gap-2">
            {/* images */}
            <div className="w-28 h-20 bg-amber-200" />
            <div className="w-28 h-20 bg-amber-200" />
            <div className="w-28 h-20 bg-amber-200" />
          </div>
          <Spacing size={4} />
          <p className="text-lg">푸짐한 보리밥 한상과 불향 가득한 연탄구이</p>
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold text-red-500">{"10"}% 할인</p>
            <Button size="sm">쿠폰 사용</Button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RecommendStoresList;
