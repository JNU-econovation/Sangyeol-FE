import { Href } from "expo-router";

type PathToRoute = { [key: string]: Href };

/**
 * 웹뷰에서 요청하는 path를 네이티브 라우트로 매핑하는 상수
 */
const PATH_TO_ROUTE: PathToRoute = {
  home: "/(tab)/home",
  etc: "/(tab)/etc",
};

export default PATH_TO_ROUTE;
