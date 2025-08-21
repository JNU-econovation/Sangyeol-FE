"use client";

import LeftChevronThinIcon from "@icons/LeftChevronThinIcon";
import RightChevronThinIcon from "@icons/RightChevronThinIcon";
import Spacing from "@shared/layout/Spacing";
import Text from "@shared/ui/Text";
import { memo, ReactNode, useState } from "react";

const DAY = ["일", "월", "화", "수", "목", "금", "토"];
const LAST_DATE = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function getLastDate(year: number, month: number) {
  if (month === 1) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28;
  }
  return LAST_DATE[month];
}

function getCalendarArray(year: number, month: number) {
  const lastDate = getLastDate(year, month);
  const firstDayNum = new Date(year, month, 1).getDay();

  const days = [
    ...Array(firstDayNum).fill(null),
    ...Array.from({ length: lastDate }, (_, i) => i + 1),
  ];

  if (firstDayNum + lastDate < 35 && firstDayNum + lastDate > 28) {
    days.push(...Array(7 - ((firstDayNum + lastDate) % 7)).fill(null));
  }
  if (firstDayNum + lastDate > 35 && firstDayNum + lastDate <= 42) {
    days.push(...Array(7 - ((firstDayNum + lastDate) % 7)).fill(null));
  }

  return Array.from({ length: Math.ceil(days.length / 7) }, (_, i) =>
    days.slice(i * 7, i * 7 + 7)
  );
}

interface CalendarProps {
  onDateClick?: (date: Date) => void;
  content?: (props?: { date: Date }) => ReactNode;
}

export default memo(function Calendar({ content, onDateClick }: CalendarProps) {
  const [date, setDate] = useState(new Date());

  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();

  const calendarArray = getCalendarArray(date.getFullYear(), date.getMonth());

  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };
  return (
    <div>
      <div className="w-full flex justify-center">
        <Text fontSize="text-lg" fontWeight="font-bold" align="text-center">
          {currentYear}년
        </Text>
      </div>
      <Spacing size={4} />
      <div className="flex items-center border-b border-gray-30 pb-2">
        {DAY.map((day, index) => (
          <div key={index} className="w-full flex items-center justify-center">
            <Text
              fontWeight="font-semibold"
              align="text-center"
              color="text-gray-20"
            >
              {day}
            </Text>
          </div>
        ))}
      </div>
      <Spacing size={4} />

      <div className="flex items-center justify-between ">
        <button onClick={handlePrevMonth} aria-label="이전 달">
          <LeftChevronThinIcon />
        </button>
        <Text fontSize="text-2xl" fontWeight="font-bold" align="text-center">
          {currentMonth + 1}월
        </Text>
        <button onClick={handleNextMonth} aria-label="다음 달">
          <RightChevronThinIcon />
        </button>
      </div>
      <Spacing size={4} />

      <div>
        {calendarArray.map((week, index) => (
          <div key={index} className="flex">
            {week.map((day, dayIndex) => (
              <button
                key={dayIndex}
                className="w-full flex flex-col items-center justify-center"
                disabled={day === null}
                aria-label={
                  day !== null
                    ? `${currentYear}년 ${currentMonth + 1}월 ${day}일`
                    : undefined
                }
                onClick={() => {
                  if (day !== null && onDateClick) {
                    onDateClick(new Date(currentYear, currentMonth, day));
                  }
                }}
              >
                <p>{day !== null ? day : ""}</p>
                <Spacing size={2} />
                {content &&
                  day !== null &&
                  content({ date: new Date(currentYear, currentMonth, day) })}
              </button>
            ))}
            <Spacing size={2} />
          </div>
        ))}
      </div>
    </div>
  );
});
