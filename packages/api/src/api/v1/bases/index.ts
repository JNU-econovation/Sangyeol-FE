import { AxiosInstance } from "axios";
import type { BaseMarker } from "@model/map";

export const BASES_API_PATH = (mountainId: string) =>
  `/api/v1/bases?mountainId=${mountainId}`;

export interface GetBasesApiResponse {
  mountainId: string;
  bases: BaseMarker[];
}

// GET
export const getBasesApi = async (
  Instance: AxiosInstance,
  mountainId: string,
) => {
  const response = await Instance<GetBasesApiResponse>({
    method: "get",
    url: BASES_API_PATH(mountainId),
  });

  return response.data;
};
