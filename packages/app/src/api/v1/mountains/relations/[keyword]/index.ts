import authenticatedApi from "@api/_instances/authenticatedApi";

export type CourseSortType = "length" | "difficulty";

export const RELATED_MOUNTAINS_API_PATH = (keyword: string) =>
  `/api/v1/mountains/relations/${keyword}`;

interface GetRelatedMountainsParams {
  keyword: string;
}

interface Mountain {
  mountainId: string;
  name: string;
}

export interface GetRelatedMountainsResponse {
  relatedMountainList: Mountain[];
}

export const getRelatedMountains = async ({
  keyword,
}: GetRelatedMountainsParams) => {
  const response = await authenticatedApi<GetRelatedMountainsResponse>({
    method: "get",
    url: RELATED_MOUNTAINS_API_PATH(keyword),
  });

  return response.data;
};
