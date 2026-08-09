import { Fragment } from "react";

import SwitchCase from "@shared/components/composites/SwitchCase";
import PartialControlBadge from "@shared/components/primitives/ui/CourseControlBadges/PartialControlBadge";
import PreparingControlBadge from "@shared/components/primitives/ui/CourseControlBadges/PreparingControlBadge";
import WorkingOnControlBadge from "@shared/components/primitives/ui/CourseControlBadges/WorkingOnControlBadge";
import MapPinIcon from "@shared/components/primitives/ui/icons/MapPinIcon";
import TriangleAlertIcon from "@shared/components/primitives/ui/icons/TriangleAlertIcon";

type ControlInfoStatus = "working" | "partial" | "preparing";
interface ControlInfo {
  id: string;
  name: string;
  status: ControlInfoStatus;
}

const MudeungsanControlInfo = () => {
  const controlAreas: ControlInfo[] = [
    { id: "mudeungsan", name: "무등산", status: "working" },
    { id: "mudeungsan-east", name: "무등산동부", status: "partial" },
    { id: "mudeungsan-west", name: "무등산서부", status: "preparing" },
  ];

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
        {controlAreas.map((area, index) => (
          <Fragment key={area.id}>
            {index > 0 && <div className="h-px w-full bg-gray-600" />}
            <div className="flex w-full items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <MapPinIcon size={14} className="text-gray-900" />
                <p className="text-sm font-medium text-black-900">
                  {area.name}
                </p>
              </div>
              <SwitchCase
                value={area.status}
                caseBy={{
                  working: <WorkingOnControlBadge />,
                  partial: <PartialControlBadge />,
                  preparing: <PreparingControlBadge />,
                }}
                defaultComponent={<PartialControlBadge />}
              ></SwitchCase>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default MudeungsanControlInfo;
