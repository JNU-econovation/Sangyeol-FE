import { AxiosInstance } from "axios";

export type CourseSortType = "length" | "difficulty";

export const RELATED_MOUNTAINS_API_PATH = (keyword: string) =>
  `/api/v1/mountains/relations/${encodeURIComponent(keyword)}`;

interface GetRelatedMountainsParams {
  keyword: string;
}

export interface Mountain {
  mountainId: string;
  name: string;
}

export interface GetRelatedMountainsResponse {
  relatedMountainList: Mountain[];
}

export const getRelatedMountains = async (
  instance: AxiosInstance,
  { keyword }: GetRelatedMountainsParams,
) => {
  const response = await instance<GetRelatedMountainsResponse>({
    method: "get",
    url: RELATED_MOUNTAINS_API_PATH(keyword),
  });

  return response.data;
};
