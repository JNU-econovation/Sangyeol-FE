import PATH_TO_ROUTE from "@constants/bridge";
import { Href } from "expo-router";
import { RefObject } from "react";
import WebView from "react-native-webview";

export const postMessage = (
  ref: RefObject<WebView<{}> | null>,
  message: string,
) => {
  ref.current?.postMessage(message);
};

interface GetPathToRouteProps {
  path: keyof typeof PATH_TO_ROUTE;
  params?: { [key: string]: string | number }[];
}

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
