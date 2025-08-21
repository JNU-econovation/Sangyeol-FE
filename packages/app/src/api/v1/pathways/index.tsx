import authenticatedApi from "@api/_instances/authenticatedApi";
import { CourseDifficulty } from "@model/course";
import { Coordinate } from "@model/map";

export const PATHWAY_API_PATH = (courseId: string) =>
  `api/v1/pathways?courseId=${encodeURIComponent(courseId)}`;

interface Pathway {
  pathwayId: string;
  deptBaseId: number;
  destBaseId: number;
  difficulty: CourseDifficulty;
  coordinates: Coordinate[];
}

interface GetPathwayOfCourseResponse {
  pathways: Pathway[];
}

export const getPathwayOfCourse = async (courseId: string) => {
  const response = await authenticatedApi<GetPathwayOfCourseResponse>({
    method: "get",
    url: PATHWAY_API_PATH(courseId),
  });

  return response.data;
};
