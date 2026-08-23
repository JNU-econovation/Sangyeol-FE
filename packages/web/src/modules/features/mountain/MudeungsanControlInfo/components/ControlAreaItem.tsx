import useKnpsControlInfoQuery from "@shared/api/queries/useKnpsControlInfoQuery";
import SwitchCase from "@shared/components/composites/SwitchCase";
import PartialControlBadge from "@shared/components/primitives/ui/CourseControlBadges/PartialControlBadge";
import PreparingControlBadge from "@shared/components/primitives/ui/CourseControlBadges/PreparingControlBadge";
import WorkingOnControlBadge from "@shared/components/primitives/ui/CourseControlBadges/WorkingOnControlBadge";
import MapPinIcon from "@shared/components/primitives/ui/icons/MapPinIcon";

type ControlInfoStatus = "working" | "partial" | "preparing";

const toControlInfoStatus = (knpsStatus?: string): ControlInfoStatus => {
  if (!knpsStatus) return "preparing";
  if (knpsStatus.includes("통제")) return "partial";
  if (knpsStatus.includes("개방") || knpsStatus.includes("해제"))
    return "working";
  return "preparing";
};

interface ControlAreaItemProps {
  name: string;
  rstId: string;
  onClick: () => void;
}

const ControlAreaItem = ({ name, rstId, onClick }: ControlAreaItemProps) => {
  const { data } = useKnpsControlInfoQuery({ rstId });
  const status = toControlInfoStatus(data?.status);

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer items-center justify-between px-4 py-3 text-left"
    >
      <div className="flex items-center gap-2">
        <MapPinIcon size={14} className="text-gray-900" />
        <p className="text-sm font-medium text-black-900">{name}</p>
      </div>
      <SwitchCase
        value={status}
        caseBy={{
          working: <WorkingOnControlBadge />,
          partial: <PartialControlBadge />,
          preparing: <PreparingControlBadge />,
        }}
        defaultComponent={<PreparingControlBadge />}
      />
    </button>
  );
};

export default ControlAreaItem;
