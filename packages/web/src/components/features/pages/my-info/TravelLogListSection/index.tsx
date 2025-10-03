"use client";

import useTravelRecordListQuery from "@hooks/feature/query/query/useTravelRecordListQuery";
import TravelLogList from "@shared/ui/TravelLogList";
import { Suspense } from "@suspensive/react";
import { useSearchParams } from "next/navigation";

const TravelLogListSection = Suspense.with(
  {
    fallback: null,
  },
  () => {
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
            key={record.id}
            {...record}
            name={record.displayName}
            imageSrc={record.image}
          />
        ))}
      </div>
    );
  },
);

export default TravelLogListSection;
