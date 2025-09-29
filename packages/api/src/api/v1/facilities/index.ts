import { AxiosInstance } from "axios";
import type { FacilityMarker } from "@model/map";

export const FACILITY_API_PATH = (mountainId: string) =>
  `/api/v1/facilities?mountainId=${mountainId}`;

export interface GetFacilitiesApiResponse {
  mountainId: string;
  facilities: FacilityMarker[];
}

// GET
export const getFacilitiesApi = async (
  instance: AxiosInstance,
  mountainId: string,
) => {
  const response = await instance<GetFacilitiesApiResponse>({
    method: "get",
    url: FACILITY_API_PATH(mountainId),
  });

  return response.data;
};
