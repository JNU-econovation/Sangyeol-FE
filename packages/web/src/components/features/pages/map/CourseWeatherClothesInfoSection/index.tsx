"use client";

import useBasesDetailQuery from "@hooks/feature/query/query/useBasesDetailQuery";
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
      <div className="w-full bg-green-10 animate-pulse h-28 opacity-20 rounded-2xl" />
    ),
    name: "CourseWeatherClothesInfoSection",
  },
  () => {
    const { mountainId } = useParams<{
      mountainId: string;
      courseId: string;
    }>();
    const searchParams = useSearchParams();
    const { data } = useBasesDetailQuery({ mountainId });

    const selectedBaseId =
      searchParams.get("baseId") || data.baseDetails[0]?.baseId;

    if (!selectedBaseId) {
      return <div className="p-4">기본 정보가 없습니다.</div>;
    }

    const { baseDetails } = data;

    const baseDetail = baseDetails.find(
      ({ baseId }) => `${baseId}` === `${selectedBaseId}`
    );

    if (!baseDetail) {
      return <div className="p-4">기본 정보가 없습니다.</div>;
    }

    const { weather, recommendedOutfit, temperature } = baseDetail;

    return (
      // height값이 고정되어있습니다! 주의해주세요!
      <div className="grid grid-cols-2 bg-green-10 rounded-2xl p-2.5 h-28">
        <p className="font-bold text-gray-20">기상 정보</p>
        <p className="font-bold text-gray-20">산행 복장</p>
        <div className="flex items-center justify-around">
          <SunnyIcon alt="맑은 날씨" />
          <div>
            <p className="text-3xl font-extralight">
              {temperature}
              <span className="text-2xl">&deg;C</span>
            </p>
            <p className="text-sm font-bold">{weather}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ClothesIcon alt="옷 아이콘" />
          <div>
            <p className="text-xl font-bold">
              {recommendedOutfit ?? "추천 복장"}
            </p>
            <p className="text-sm">긴팔 긴바지 착용 권장</p>
          </div>
        </div>
      </div>
    );
  }
);
