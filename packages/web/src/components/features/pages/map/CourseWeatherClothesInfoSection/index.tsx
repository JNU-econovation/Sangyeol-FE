"use client";

import WEATHER from "@/constants/weather";
import useGetBaseDetails from "@hooks/feature/course/useGetBaseDetails";
import ClothesIcon from "@icons/ClothesIcon";
import SunnyIcon from "@icons/SunnyIcon";
import { Suspense } from "@suspensive/react";
import { useParams, useSearchParams } from "next/navigation";

//TODO: 컴포넌트 추상화 필요 / ui 와 기능으로.
// 상위 컴포넌트 역시 section임. 추상화 레벨 위반
export default Suspense.with(
  {
    // TODO: 스캘레톤 컴포넌트로 변경
    fallback: (
      <div className="w-full bg-green-500 animate-pulse h-28 opacity-20 rounded-2xl" />
    ),
    name: "CourseWeatherClothesInfoSection",
  },
  () => {
    const { mountainId } = useParams<{
      mountainId: string;
      courseId: string;
    }>();
    const searchParams = useSearchParams();
    const { weather, temperature, recommendedOutfit } = useGetBaseDetails({
      mountainId,
      baseId: searchParams.get("baseId"),
    });

    return (
      // height값이 고정되어있습니다! 주의해주세요!
      <div className="grid grid-cols-2 bg-green-500 rounded-2xl p-2.5 h-36">
        <div className="font-bold text-gray-900">기상 정보</div>
        <div className="font-bold text-gray-900">산행 복장</div>
        <div className="flex items-center justify-around">
          {WEATHER[weather]?.icon}
          <div>
            <p className="text-3xl font-extralight">
              {temperature}
              <span className="text-2xl">&deg;C</span>
            </p>
            <p className="text-sm font-bold text-gray-900">
              {WEATHER[weather]?.name}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ClothesIcon alt="옷 아이콘" />
          <div>
            <p className="text-lg font-bold text-black-800">
              {recommendedOutfit ?? "추천 복장"}
            </p>
            <p className="text-xs text-black-800">긴팔 긴바지 착용 권장</p>
            {/* <button className="w-5 h-2 bg-primary rounded-2xl" /> */}
          </div>
        </div>
      </div>
    );
  },
);
