interface NaverMapPublicRouteUrlParams {
  dlat: number;
  dlng: number;
  dname: string;
  appName: string;
}

/**
 * 네이버 지도 앱의 대중교통 길찾기 URL Scheme을 생성합니다.
 * @see https://guide.ncloud-docs.com/docs/appurlscheme-appurlscheme
 */
export const getNaverMapPublicRouteUrl = ({
  dlat,
  dlng,
  dname,
  appName,
}: NaverMapPublicRouteUrlParams) => {
  const query = [
    `dlat=${dlat}`,
    `dlng=${dlng}`,
    `dname=${encodeURIComponent(dname)}`,
    `appname=${appName}`,
  ].join("&");

  return `nmap://route/public?${query}`;
};
