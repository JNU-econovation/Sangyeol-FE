import MAP from "@/constants/map";
import type { FacilityMarker } from "@/types/map";

export const getFacilitiesByFacilityType = (
  facilities: FacilityMarker[],
  type: keyof typeof MAP.BASE_AND_FACILITY
) => {
  return facilities.filter(
    (facility) => facility.facilityType === type
  ) as FacilityMarker[];
};
