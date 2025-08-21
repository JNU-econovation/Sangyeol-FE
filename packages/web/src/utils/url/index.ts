/**
 * 인자값들을 입력받아서 url을 조합하여 만들어 반환합니다.
 * @params {string} href - 원본 URL. 주지 않으면 현재 위치의 값을 사용합니다.
 * @params {string} searchParamName - 수정할 쿼리 파라미터 이름
 * @params {string | null | undefined} paramValue - 수정할 쿼리 파라미터 값
 */
export const updateSearchParams = ({
  href,
  searchParamName,
  paramValue,
}: {
  href?: string;
  searchParamName: string;
  paramValue: string | null | undefined;
}) => {
  let url;
  if (!href) {
    if (typeof window === "undefined")
      throw new Error(
        "[updateSearchParams] href값을 주지 않으면, 꼭 클라이언트단에서만 사용되어야 합니다."
      );

    url = new URL(window.location.href);
  } else url = new URL(href);

  // 파라미터 값 설정 (null이나 undefined면 삭제)
  if (paramValue === null || paramValue === undefined) {
    url.searchParams.delete(searchParamName);
  } else {
    url.searchParams.set(searchParamName, paramValue);
  }

  return url.toString();
};
