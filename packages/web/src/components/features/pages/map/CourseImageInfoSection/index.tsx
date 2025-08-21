"use client";

import useBasesDetailQuery from "@hooks/feature/query/query/useBasesDetailQuery";
import { Suspense } from "@suspensive/react";

import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";

export default Suspense.with(
  {
    fallback: (
      <div className="h-10 w-full animate-pulse bg-gray-100 rounded-2xl border border-main-green opacity-50" />
    ),
    name: "CourseImageInfoSection",
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
    const { baseDetails } = data;
    if (!selectedBaseId) {
      return <div className="p-4">기본 정보가 없습니다.</div>;
    }

    const baseDetail = baseDetails.find(
      ({ baseId }) => `${baseId}` === `${selectedBaseId}`
    );

    if (!baseDetail) {
      return <div className="p-4">기본 정보가 없습니다.</div>;
    }

    const { images } = baseDetail;
    return (
      //height값이 고정되어있습니다! 주의해주세요! (h-28)
      <div className="grid grid-cols-2 bg-green-10 rounded-2xl p-2 h-28">
        <div className="flex items-center justify-center w-full h-full">
          <Image
            src={images[0]}
            alt="코스 상세 사진"
            width={110}
            height={100}
          />
        </div>
        <div className="flex items-center justify-center">
          <Image
            src={images[1]}
            alt="코스 상세 사진"
            width={110}
            height={110}
          />
        </div>
      </div>
    );
  }
);
