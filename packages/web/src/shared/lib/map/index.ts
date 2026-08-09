import MAP from "@shared/constants/map";
import type { FacilityMarker } from "@shared/types/map";

export const getFacilitiesByFacilityType = (
  facilities: FacilityMarker[],
  type: keyof typeof MAP.BASE_AND_FACILITY
) => {
  return facilities.filter(
    (facility) => facility.facilityType === type
  ) as FacilityMarker[];
};
