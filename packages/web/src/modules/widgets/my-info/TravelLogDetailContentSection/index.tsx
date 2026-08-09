"use client";

import useTravelLogDeleteModal from "@shared/hooks/domain/modal/useTravelLogDeleteModal";
import useTravelRecordDetailQuery from "@shared/api/suspenseQueries/useTravelRecordDetailQuery";
import TrashIcon from "@icons/TrashIcon";
import { msToTimeText, timestampToDateValues } from "@sangyeol/utils";
import Spacing from "@shared/components/primitives/layout/Spacing";
import { Suspense } from "@suspensive/react";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import dynamic from "next/dynamic";

const TravelResultPathMapView = dynamic(
  () =>
    import("@modules/features/map/TravelResultPathMapView/index").then(
      (mod) => mod.default,
    ),
  {
    ssr: false,
  },
);

import TravelLogDetailContentSectionLoader from "./components/loader";

const TravelLogDetailContentSection = Suspense.with(
  {
    fallback: <TravelLogDetailContentSectionLoader />,
  },
  () => {
    const { recordId } = useParams<{ recordId: string }>();

    const {
      data: { coordinates, displayName, duration, endAt, length, startedAt },
    } = useTravelRecordDetailQuery(recordId);
    const { openTravelLogDeleteModal } = useTravelLogDeleteModal();

    const dateString = useMemo(() => {
      const { year, month, day, hour, minute } =
        timestampToDateValues(startedAt);
      const { hour: endHour, minute: endMinute } = timestampToDateValues(endAt);
      return `${year}.${month}.${day} ${hour}:${minute} ~ ${endHour}:${endMinute}`;
    }, []);

    return (
      <section>
        <div className="px-6 flex justify-between">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold">{displayName}</p>
            </div>
            <span className="text-gray-900 text-sm font-medium">
              {dateString}
            </span>
          </div>
          <button onClick={openTravelLogDeleteModal} className="pl-4 pr-2">
            <TrashIcon width={16} height={16} />
          </button>
        </div>
        <Spacing size={3.5} />
        <div className="h-80 bg-gray-100 select-none">
          <TravelResultPathMapView traveledPath={coordinates} />
        </div>
        <div className="flex">
          <div className="grow p-3.5">
            <p className="text-2xl font-bold text-center">
              {msToTimeText(duration).split(":").slice(1).join(":")}
            </p>
            <p className="text-gray-900 text-base font-medium text-center">
              산행시간
            </p>
          </div>
          <div className="h-10 w-0.5 rounded-2xl my-auto bg-gray-300" />
          <div className="grow p-3.5">
            <p className="text-2xl font-bold text-center">{length}</p>
            <p className="text-gray-900 text-base font-medium text-center">
              산행거리(km)
            </p>
          </div>
        </div>
      </section>
    );
  },
);

export default TravelLogDetailContentSection;
