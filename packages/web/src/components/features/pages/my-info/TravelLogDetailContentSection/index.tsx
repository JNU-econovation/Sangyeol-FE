"use client";

import useTravelRecordDetailQuery from "@hooks/feature/query/query/useTravelRecordDetailQuery";
import TrashIcon from "@icons/TrashIcon";
import { Suspense } from "@suspensive/react";
import { useParams } from "next/navigation";
import TravelLogDetailContentSectionLoader from "./loader";
import Spacing from "@shared/layout/Spacing";

const TravelLogDetailContentSection = Suspense.with(
  {
    fallback: <TravelLogDetailContentSectionLoader />,
  },
  () => {
    const { recordId } = useParams<{ recordId: string }>();
    const {
      data: { coordinates, displayName, duration, endAt, length, startedAt },
    } = useTravelRecordDetailQuery(recordId);

    return (
      <section>
        <div className="px-6">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">{displayName}</p>
            <TrashIcon />
          </div>
          <span className="text-gray-900 text-sm font-medium">
            {startedAt} ~ {endAt}
          </span>
        </div>
        <Spacing size={3.5} />
        <div className="h-80 bg-gray-100"></div>
        <div className="flex">
          <div className="grow p-3.5">
            <p className="text-2xl font-bold text-center">{duration}</p>
            <p className="text-gray-900 text-base font-medium text-center">
              산행시간
            </p>
          </div>
          <div className="h-10 w-0.5 rounded-2xl my-auto bg-gray-300" />
          <div className="grow p-3.5">
            <p className="text-2xl font-bold text-center">{length}</p>
            <p className="text-gray-900 text-base font-medium text-center">
              산행거리
            </p>
          </div>
        </div>
      </section>
    );
  },
);

export default TravelLogDetailContentSection;
