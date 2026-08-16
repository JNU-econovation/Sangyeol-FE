import PATH_TO_ROUTE from "@shared/constants/PATH_TO_ROUTE";
import { Href } from "expo-router";

interface GetPathToRouteProps {
  path: keyof typeof PATH_TO_ROUTE;
  params?: { [key: string]: string | number }[];
}

/**
 * 웹뷰가 요청한 path를 네이티브 라우트로 변환하는 함수
 */
export const getPathToRoute = ({ path, params }: GetPathToRouteProps): Href => {
  let result = PATH_TO_ROUTE[path] as string;
  if (!result) {
    throw new Error(
      `[getPathToRoute] 존재하지 않는 주소로 이동을 요청하였습니다 :  ${path}`,
    );
  }

  // params 배열의 각 원소를 순회하며 [key]를 value로 치환
  if (params && Array.isArray(params)) {
    params.forEach((paramObj) => {
      Object.entries(paramObj).forEach(([k, v]) => {
        result = result.replace(new RegExp(`\\[${k}\\]`, "g"), String(v));
      });
    });
  }

  return result as Href;
};
