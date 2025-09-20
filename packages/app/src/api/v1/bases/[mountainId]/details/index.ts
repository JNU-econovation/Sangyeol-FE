import authenticatedApi from "@api/_instances/authenticatedApi";

export const BASES_DETAIL_API_PATH = (mountainId: string) =>
  `api/v1/bases/${mountainId}/details`;

export type Weather =
  | "Thunderstorm"
  | "Drizzle"
  | "Rain"
  | "Snow"
  | "Mist"
  | "Clear"
  | "Clouds";

export interface BaseInfo {
  baseId: string;
  name: string;
  weather: Weather;
  temperature: string;
  recommendedOutfit: null;
  images: [string, string];
}

export interface GetBasesDetailApiResponse {
  mountainId: string;
  baseDetails: BaseInfo[];
}

// GET
export const getBasesDetailApi = async (mountainId: string) => {
  const response = await authenticatedApi<GetBasesDetailApiResponse>({
    method: "get",
    url: BASES_DETAIL_API_PATH(mountainId),
  });

  return response.data;
};
