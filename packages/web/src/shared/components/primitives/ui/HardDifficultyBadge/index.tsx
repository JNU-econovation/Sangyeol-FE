import TriangleAlertIcon from "@icons/TriangleAlertIcon";

const ICON_SIZE = 12;

export default function HardDifficultyBadge() {
  return (
    <div className="border-difficulty-hard/20 bg-difficulty-hard-bg flex shrink-0 items-center gap-1 rounded-full border px-2 py-[3px]">
      <TriangleAlertIcon
        size={ICON_SIZE}
        className="text-difficulty-hard shrink-0"
      />
      <span className="text-difficulty-hard text-[11px] font-semibold">
        어려움
      </span>
    </div>
  );
}
