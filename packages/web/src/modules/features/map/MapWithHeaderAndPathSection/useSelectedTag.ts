import MAP from "@/shared/constants/map";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const useSelectedTag = () => {
  const searchParams = useSearchParams();
  const raw = searchParams.getAll("tag");

  const selectedTagIds = useMemo(() => {
    const allowed = new Set<string>([
      MAP.BASE.id,
      ...Object.keys(MAP.BASE_AND_FACILITY),
    ]);
    return Array.from(new Set(raw.filter((t) => allowed.has(t)))) as (
      | keyof typeof MAP.BASE_AND_FACILITY
      | typeof MAP.BASE.id
    )[];
  }, [raw]);

  return {
    selectedTagIds,
  };
};

export default useSelectedTag;
