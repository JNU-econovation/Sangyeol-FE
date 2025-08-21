/* eslint-disable react/jsx-key */
"use client";

import BottomSheet from "@entities/BottomSheet";
import Carousel from "@entities/Carousel";
import BaseSelector from "@pages/map/BaseSelector";
import CourseImageInfoSection from "@pages/map/CourseImageInfoSection";
import CourseWeatherClothesInfoSection from "@pages/map/CourseWeatherClothesInfoSection";
import Spacing from "@shared/layout/Spacing";
import CourseMetaDataUi from "@shared/ui/CourseMetaDataUi";

export default function CourseDetailBottomSheetSection() {
  return (
    <section>
      <BottomSheet>
        {/* TODO: 해당 div는 이미 query가 존재하는 경우 bottomsheet의 height를 잘못 계산하는 경우가 존재하여 생상혀였습니다. 추후 변경 예정 */}
        <div className="min-h-6">
          <BaseSelector />
        </div>
        <Spacing size={2} />
        {/* TODO: 추후 정보를 가져올 수 있는 방안이 생기면 수정 */}
        <CourseMetaDataUi difficulty="EASY" distance={123} time={23} />
        <Spacing size={2} />

        <Carousel
          items={[
            <CourseWeatherClothesInfoSection />,
            <CourseImageInfoSection />,
          ]}
        />
        <Spacing size={2} />
      </BottomSheet>
    </section>
  );
}
