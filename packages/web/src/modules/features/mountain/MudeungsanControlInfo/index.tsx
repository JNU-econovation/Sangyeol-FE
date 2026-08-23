"use client";

import { Fragment } from "react";

import TriangleAlertIcon from "@shared/components/primitives/ui/icons/TriangleAlertIcon";
import useRouteToExternalWebviewBridge from "@shared/hooks/domain/bridge/useRouteToExternalWebviewBridge";

import ControlAreaItem from "./components/ControlAreaItem";

const KNPS_CONTROL_DETAIL_PAGE_URL = (rstId: string) =>
  `https://www.knps.or.kr/front/portal/safe/acsCtrDtl.do?menuNo=8000340&rstId=${rstId}`;

interface ControlArea {
  id: string;
  name: string;
  rstId: string;
}

const CONTROL_AREAS: ControlArea[] = [
  { id: "mudeungsan", name: "무등산", rstId: "0025" },
  { id: "mudeungsan-east", name: "무등산동부", rstId: "0026" },
];

const MudeungsanControlInfo = () => {
  const routeToExternalWebview = useRouteToExternalWebviewBridge();

  const handleAreaClick = (rstId: string) => {
    routeToExternalWebview(KNPS_CONTROL_DETAIL_PAGE_URL(rstId));
  };

  return (
    <div className="flex w-full flex-col gap-3 rounded-2xl border border-gray-600 bg-main-white p-4 shadow-md">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <TriangleAlertIcon size={16} className="text-error" />
          <h3 className="text-base font-semibold text-black-900">
            실시간 통제정보
          </h3>
        </div>
        <p className="text-xs font-normal text-gray-900">
          국립공원공단 · 실시간
        </p>
      </div>

      <div className="flex w-full flex-col rounded-xl bg-gray-300">
        {CONTROL_AREAS.map((area, index) => (
          <Fragment key={area.id}>
            {index > 0 && <div className="h-px w-full bg-gray-600" />}
            <ControlAreaItem
              name={area.name}
              rstId={area.rstId}
              onClick={() => handleAreaClick(area.rstId)}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default MudeungsanControlInfo;
