import authenticatedApi from "@/api/_instances/authenticatedApi";
import type { BaseMarker } from "@/types/map";

export const BASES_API_PATH = (mountainId: string) =>
  `api/v1/bases?mountainId=${mountainId}`;

interface GetBasesApiResponse {
  mountainId: string;
  bases: BaseMarker[];
}

// GET
export const getBasesApi = async (mountainId: string) => {
  const response = await authenticatedApi<GetBasesApiResponse>({
    method: "get",
    url: BASES_API_PATH(mountainId),
  });

  return response.data;
};
