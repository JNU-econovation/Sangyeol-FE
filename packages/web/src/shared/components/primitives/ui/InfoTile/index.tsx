import { PropsWithChildren } from "react";

interface InfoTileProps {
  label: string;
  sub: string;
}

/**
 * 미디어 영역(78px)을 소유하는 정보 타일.
 * children은 프레임을 채우도록 `fill`(next/image) 또는 `h-full w-full`로 전달해야 합니다.
 */
export default function InfoTile({
  label,
  sub,
  children,
}: PropsWithChildren<InfoTileProps>) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <div className="relative h-[78px] w-full overflow-hidden rounded-lg">
        {children}
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-[13px] font-semibold text-black-900">{label}</p>
        <p className="text-[11px] text-gray-900">{sub}</p>
      </div>
    </div>
  );
}
