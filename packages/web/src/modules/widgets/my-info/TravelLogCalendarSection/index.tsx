"use client";

import ROUTE from "@shared/constants/route";
import CalendarLayout from "@shared/components/composites/CalendarLayout";
import useTravelRecordListQuery from "@shared/api/suspenseQueries/useTravelRecordListQuery";
import PolygonIcon from "@icons/PolygonIcon";
import WeekPolygonIcon from "@icons/WeekPolygonIcon";
import Spacing from "@shared/components/primitives/layout/Spacing";
import { Suspense } from "@suspensive/react";
import { useRouter, useSearchParams } from "next/navigation";

const TravelLogCalendarSection = Suspense.with(
  {
    fallback: <CalendarLayout content={() => <WeekPolygonIcon />} />,
    clientOnly: true,
  },
  () => {
    const searchParams = useSearchParams();
    const year = +searchParams.get("year");
    const month = +searchParams.get("month");

    const {
      data: { records },
    } = useTravelRecordListQuery({ year, month });

    const router = useRouter();

    return (
      <section className="bg-white">
        <CalendarLayout
          onDateClick={(date) => {
            router.replace(
              ROUTE.TRAVEL_LOG({
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                date: date.getDate(),
              }),
            );
          }}
          content={({ date }) => {
            const recordForTheDay = records.find((record) => {
              const recordDate = new Date(record.date);
              return (
                recordDate.getFullYear() === date.getFullYear() &&
                recordDate.getMonth() === date.getMonth() &&
                recordDate.getDate() === date.getDate()
              );
            });
            if (recordForTheDay) return <PolygonIcon />;
            return <WeekPolygonIcon />;
          }}
        />
        <Spacing size={4} />
      </section>
    );
  },
);

export default TravelLogCalendarSection;
