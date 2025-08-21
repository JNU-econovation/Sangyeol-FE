import authenticatedApi from "@/api/_instances/authenticatedApi";
import type { FacilityMarker } from "@/types/map";

export const FACILITY_API_PATH = (mountainId: string) =>
  `api/v1/facilities?mountainId=${mountainId}`;

interface GetFacilitiesApiResponse {
  mountainId: string;
  facilities: FacilityMarker[];
}

// GET
export const getFacilitiesApi = async (mountainId: string) => {
  const response = await authenticatedApi<GetFacilitiesApiResponse>({
    method: "get",
    url: FACILITY_API_PATH(mountainId),
  });

  return response.data;
};
