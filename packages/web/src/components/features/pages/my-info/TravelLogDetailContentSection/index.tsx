"use client";

import useTravelRecordDetailQuery from "@hooks/feature/query/query/useTravelRecordDetailQuery";
import TrashIcon from "@icons/TrashIcon";
import { timestampToDateValues } from "@sangyeol/utils";
import Spacing from "@shared/layout/Spacing";
import { Suspense } from "@suspensive/react";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import TravelLogDetailContentSectionLoader from "./loader";

const TravelLogDetailContentSection = Suspense.with(
  {
    fallback: <TravelLogDetailContentSectionLoader />,
  },
  () => {
    const { recordId } = useParams<{ recordId: string }>();

    if (!recordId) {
      throw new Error("recordId is required");
    }

    const {
      data: { coordinates, displayName, duration, endAt, length, startedAt },
    } = useTravelRecordDetailQuery(recordId);

    const dateString = useMemo(() => {
      const { year, month, day, hour, minute, second } =
        timestampToDateValues(startedAt);
      const {
        hour: endHour,
        minute: endMinute,
        second: endSecond,
      } = timestampToDateValues(endAt);
      return `${year}.${month}.${day} ${hour}:${minute}:${second} ~ ${endHour}:${endMinute}:${endSecond}`;
    }, []);

    return (
      <section>
        <div className="px-6">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">{displayName}</p>
            <TrashIcon />
          </div>
          <span className="text-gray-900 text-sm font-medium">
            {dateString}
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
