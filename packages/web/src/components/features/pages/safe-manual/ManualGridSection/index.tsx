"use client";

import useRouteBridge from "@/hooks/feature/bridge/useRouteBridge";
import ManualAnimalIcon from "@icons/ManualAnimalIcon";
import ManualDistressIcon from "@icons/ManualDistressIcon";
import ManualPainManIcon from "@icons/ManualPainManIcon";
import ManualTemperatureIcon from "@icons/ManualTemperatureIcon";
import Spacing from "@shared/layout/Spacing";

export default function ManualGridSection() {
  const routeManualDetailInjury = useRouteBridge({
    path: "manual-detail",
    routeType: "push",
    params: [{ manual: "신체 부상" }],
  });
  const routeManualDetailTemperature = useRouteBridge({
    path: "manual-detail",
    routeType: "push",
    params: [{ manual: "체온 및 대사 이상" }],
  });
  const routeManualDetailAnimal = useRouteBridge({
    path: "manual-detail",
    routeType: "push",
    params: [{ manual: "동물 및 자연환경 피해" }],
  });
  const routeManualDetailDistress = useRouteBridge({
    path: "manual-detail",
    routeType: "push",
    params: [{ manual: "조난 및 고립" }],
  });

  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        className="p-4 rounded-lg shadow break-keep"
        onClick={routeManualDetailInjury}
      >
        <span className="text-main-green font-bold text-lg text-center">
          신체 부상
        </span>
        <Spacing size={8} />
        <ManualPainManIcon alt="신체 부상" className="self-center mx-auto" />
        <Spacing size={8} />
        <p className="text-sm">
          외부 충격에 의한 일반적인 부상에 대한 응급조치
        </p>
      </button>
      <button
        className="p-4 rounded-lg shadow break-keep"
        onClick={routeManualDetailTemperature}
      >
        <span className="text-main-green font-bold text-lg text-center">
          체온 및 대사 이상
        </span>
        <Spacing size={8} />
        <ManualTemperatureIcon
          alt="체온 및 대사 이상"
          className="self-center mx-auto"
        />
        <Spacing size={8} />
        <span className="text-sm leading-0">
          체온 저하 또는 탈수 등 체내 이상 징후 대응법
        </span>
      </button>
      <button
        className="p-4 rounded-lg shadow break-keep"
        onClick={routeManualDetailAnimal}
      >
        <span className="text-main-green font-bold text-lg text-center">
          동물 및 자연환경 피해
        </span>
        <Spacing size={2} />
        <ManualAnimalIcon
          alt="동물 및 자연환경 피해"
          className="self-center mx-auto"
        />
        <Spacing size={8} />
        <span className="text-sm leading-0">
          야생동물과 외부 환경에 의한 부상 대응
        </span>
      </button>
      <button
        className="p-4 rounded-lg shadow break-keep"
        onClick={routeManualDetailDistress}
      >
        <span className="text-main-green font-bold text-lg text-center">
          조난 및 고립
        </span>
        <Spacing size={8} />
        <ManualDistressIcon
          alt="조난 및 고립"
          className="self-center mx-auto"
        />
        <Spacing size={8} />
        <span className="text-sm leading-0">
          길을 잃거나 고립된 상황에서의 대응
        </span>
      </button>
    </div>
  );
}
