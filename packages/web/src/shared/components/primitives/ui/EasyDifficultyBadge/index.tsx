import MountainIcon from "@icons/MountainIcon";

const ICON_SIZE = 12;

export default function EasyDifficultyBadge() {
  return (
    <div className="border-primary/20 flex shrink-0 items-center gap-1 rounded-full border bg-green-600 px-2 py-[3px]">
      <MountainIcon size={ICON_SIZE} className="shrink-0 text-primary" />
      <span className="text-[11px] font-semibold text-primary">쉬움</span>
    </div>
  );
}
