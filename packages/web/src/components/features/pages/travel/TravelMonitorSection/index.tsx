"use client";

import Spacing from "@shared/layout/Spacing";
import { useEffect, useRef, useState } from "react";

const msToTimeText = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

// 해당 코드는 더이상 사용되지 않습니다.
// 앱에서 해당 작업을 모두 처리하고 있습니다.
export default function TravelMonitorSection() {
  const ref = useRef({ startTime: Date.now() });
  const [elapsedTime, setElapsedTime] = useState(0); // milliseconds

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Date.now() - ref.current.startTime);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white rounded-xl z-50 px-4">
      <div className="flex justify-center items-center gap-6 -translate-y-1/2">
        <button className="bg-main-green rounded-full w-16 h-16 flex justify-center items-center gap-2  active:scale-95 transition-transform duration-200 ease-in-out">
          <div className="h-8 w-1.5 bg-white rounded-xs" />
          <div className="h-8 w-1.5 bg-white rounded-xs" />
        </button>
        <button className="bg-main-green rounded-full w-16 h-16 flex justify-center items-center active:scale-95 transition-transform duration-200 ease-in-out">
          <div className="bg-white w-5 h-5 rounded-xs" />
        </button>
      </div>
      <p className="text-3xl font-semibold text-center">
        {msToTimeText(elapsedTime)}
      </p>
      <span className="text-center text-gray-20">산행 시간</span>

      <Spacing size={4} />

      <div className="bg-green-20 rounded-xl p-4 flex justify-between items-center ">
        <div className="flex gap-2 translate-y-2">
          <span>🏃‍♂️‍➡️</span>
          <div>
            <p className="font-semibold text-base">0.00</p>
            <p className="text-sm text-end">km</p>
          </div>
        </div>
        <div className="h-10 border border-gray-20 opacity-50" />
        <div className="flex gap-2">
          <span>🔥</span>
          <p className="font-semibold text-base">03:24</p>
        </div>
        <div className="h-10 border border-gray-20 opacity-50" />
        <div className="flex gap-2">
          <p>⛰️</p>
          <p className="font-semibold text-base">01:20</p>
        </div>
      </div>

      <Spacing size={4} />
    </section>
  );
}
