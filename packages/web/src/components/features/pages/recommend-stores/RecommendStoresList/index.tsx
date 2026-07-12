// "use client";

import ROUTE from "@/constants/route";
import Button from "@shared/ui/Button";
import CopyIcon from "@shared/ui/icons/CopyIcon";
import { StackLink } from "stack-link";

interface RecommendStore {
  id: number;
  name: string;
  description: string;
  discount: number;
}

const STORES: RecommendStore[] = [
  {
    id: 1,
    name: "부곡정",
    description: "푸짐한 보리밥 한상과 불향 가득한 연탄구이",
    discount: 10,
  },
  {
    id: 2,
    name: "산골식당",
    description: "정성 가득한 산골 밥상과 직접 담근 장맛",
    discount: 10,
  },
  {
    id: 3,
    name: "능선쉼터",
    description: "막걸리 한잔에 어울리는 손두부와 도토리묵",
    discount: 15,
  },
];

const RecommendStoresList = () => {
  return (
    <ul className="flex flex-col gap-3">
      {STORES.map((store) => (
        <li
          key={store.id}
          className="overflow-hidden rounded-md border border-gray-400 bg-main-white"
        >
          <div className="relative h-[158px] bg-gray-300">
            <div className="absolute inset-0 flex items-center justify-center font-mono text-xs tracking-wide text-gray-700">
              [ 가게 사진 ]
            </div>
            <span className="absolute bottom-3.5 left-3.5 bg-yellow px-3 py-1 text-[13px] font-bold text-black-800 rounded-sm">
              {store.discount}% 할인
            </span>
          </div>

          <div className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-black-800">
                {store.name}
              </span>
              <button
                type="button"
                className="flex items-center gap-1 text-xs text-gray-800"
              >
                <CopyIcon />
                주소 복사
              </button>
            </div>
            <p className="mt-2 text-base leading-6 text-gray-900">
              {store.description}
            </p>
            <StackLink href={ROUTE.DISCOUNT_COUPON}>
              <Button
                type="button"
                className="mt-4 h-12 w-full rounded-sm bg-primary text-base font-semibold text-white"
              >
                쿠폰 사용
              </Button>
            </StackLink>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RecommendStoresList;
