import MountainSnowIcon from "@icons/MountainSnowIcon";

const ICON_SIZE = 12;

export default function NormalDifficultyBadge() {
  return (
    <div className="border-difficulty-normal/20 bg-difficulty-normal-bg flex shrink-0 items-center gap-1 rounded-full border px-2 py-[3px]">
      <MountainSnowIcon
        size={ICON_SIZE}
        className="text-difficulty-normal shrink-0"
      />
      <span className="text-difficulty-normal text-[11px] font-semibold">
        보통
      </span>
    </div>
  );
}
