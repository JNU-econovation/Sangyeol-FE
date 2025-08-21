"use client";

import Calendar from "@entities/Calendar";
import WeekPolygonIcon from "@icons/WeekPolygonIcon";
// import PolygonIcon from "@icons/PolygonIcon";

export default function TravelLogCalendarSection() {
  //TODO: content는 서버에서 받은 값에서 등산기록이 있는 날인지 확인 후 switchcase로 하면 됨
  return <Calendar content={() => <WeekPolygonIcon />} />;
}
