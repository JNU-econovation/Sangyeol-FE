"use client";

import ROUTE from "@/constants/route";
import useTravelRecordListQuery from "@hooks/feature/query/query/useTravelRecordListQuery";
import TravelLogList from "@shared/ui/TravelLogList";
import { Suspense } from "@suspensive/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useStackLinkRouter } from "stack-link";

const TravelLogListSection = Suspense.with(
  {
    fallback: null,
  },
  () => {
    const { navigate } = useStackLinkRouter({});
    const searchParams = useSearchParams();

    const year = +searchParams.get("year");
    const month = +searchParams.get("month");
    const date = +searchParams.get("date");

    const {
      data: { records },
    } = useTravelRecordListQuery({ year, month });

    if (!year || !month || !date) return null;

    const filteredRecords = records.filter((record) => {
      const recordDate = new Date(record.date);
      return (
        recordDate.getFullYear() === year &&
        recordDate.getMonth() + 1 === month &&
        recordDate.getDate() === date
      );
    });

    if (filteredRecords.length === 0)
      return (
        <p className="py-10 text-center text-xl text-gray-500">
          산행 기록 없음
        </p>
      );

    return (
      <div className="flex flex-col gap-3 py-4">
        {filteredRecords.map((record) => (
          <TravelLogList
            {...record}
            key={record.id}
            name={record.displayName}
            imageSrc={record.image}
            onButtonClick={() => {
              navigate({
                href: ROUTE.TRAVEL_LOG_DETAIL(record.id),
              });
            }}
          />
        ))}
      </div>
    );
  },
);

export default TravelLogListSection;
