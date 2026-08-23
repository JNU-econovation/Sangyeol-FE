"use client";

import SunIcon from "@icons/SunIcon";
import useKmaWeatherQuery from "@shared/api/queries/useKmaWeatherQuery";
import InfoTile from "@shared/components/primitives/ui/InfoTile";
import { MUDEUNGSAN_KMA_DONG_CODE } from "@shared/constants/mountain/index";
import Image from "next/image";

export default function CourseWeatherClothesInfoSection() {
  const { data: weather } = useKmaWeatherQuery({
    code: MUDEUNGSAN_KMA_DONG_CODE,
  });

  return (
    <div className="flex w-full gap-3">
      <InfoTile label="준비물" sub="등산화 권장">
        <Image
          src="/images/shoe-eider.webp"
          alt="등산화"
          fill
          sizes="33vw"
          className="object-cover"
        />
      </InfoTile>

      <InfoTile label="날씨" sub={`체감 ${weather?.feelsLike?.toFixed(1) ?? "-"}℃`}>
        <div className="flex h-full w-full flex-col items-center justify-center bg-green-500 text-primary">
          <SunIcon size={22} />
          <p className="text-base font-bold">
            {weather?.temperature?.toFixed(1) ?? "-"}℃
          </p>
        </div>
      </InfoTile>

      <InfoTile label="식당" sub="근처 3곳">
        <Image
          src="/images/thumb-food.webp"
          alt="음식"
          fill
          sizes="33vw"
          className="object-cover"
        />
      </InfoTile>
    </div>
  );
}
