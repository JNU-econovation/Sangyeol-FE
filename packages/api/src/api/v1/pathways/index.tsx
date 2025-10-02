import { AxiosInstance } from "axios";
import { CourseDifficulty } from "@model/course";
import { Coordinate } from "@model/map";

/**
 * @public
 * @category Constants
 * @description 등산로 경로 조회 API 경로를 생성하는 함수
 * @param courseId - 코스 ID
 * @returns API 경로 문자열
 */
export const PATHWAY_API_PATH = (courseId: string) =>
  `/api/v1/pathways?courseId=${encodeURIComponent(courseId)}`;

/**
 * @public
 * @category Types
 * @interface Pathway
 * @description 등산로 경로 정보 타입
 * @property {string} pathwayId - 경로 ID
 * @property {number} deptBaseId - 출발 베이스 ID
 * @property {number} destBaseId - 도착 베이스 ID
 * @property {CourseDifficulty} difficulty - 난이도
 * @property {Coordinate[]} coordinates - GPS 좌표 배열
 */
export interface Pathway {
  pathwayId: string;
  deptBaseId: number;
  destBaseId: number;
  difficulty: CourseDifficulty;
  coordinates: Coordinate[];
}

/**
 * @public
 * @category Types
 * @interface GetPathwayOfCourseResponse
 * @description 등산로 경로 조회 응답 타입
 * @property {Pathway[]} pathways - 등산로 경로 목록
 */
export interface GetPathwayOfCourseResponse {
  pathways: Pathway[];
}

/**
 * @public
 * @category Pathways
 * @description 특정 코스의 등산로 경로 정보를 조회합니다 (GPS 좌표 포함)
 * @param instance - Axios 인스턴스
 * @param courseId - 코스 ID
 * @returns 등산로 경로 목록
 * @example
 * const result = await getPathwayOfCourse(axiosInstance, "course123");
 * result.pathways.forEach(pathway => {
 *   console.log(pathway.coordinates); // GPS 경로
 * });
 */
export const getPathwayOfCourse = async (
  instance: AxiosInstance,
  courseId: string,
) => {
  const response = await instance<GetPathwayOfCourseResponse>({
    method: "get",
    url: PATHWAY_API_PATH(courseId),
  });

  return response.data;
};
