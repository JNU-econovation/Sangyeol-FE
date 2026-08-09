/**
 * 산 검색 관련 상수
 */

/**
 * 검색 결과가 없을 때 사용하는 특수 mountainId
 *
 * @description
 * 사용자가 산을 직접 검색했을 때, 정확한 결과가 없는 경우
 * 이 ID를 사용하여 "검색 결과 없음" 화면을 표시합니다.
 *
 * @remarks
 * 이는 임시 workaround입니다. 향후 백엔드 API가 개선되면
 * 별도의 쿼리 파라미터나 라우팅 방식으로 변경될 예정입니다.
 *
 * @see NoResultUl 컴포넌트
 * @see MountainSearchInputSection 컴포넌트
 */
export const NO_RESULT_MOUNTAIN_ID = "-1" as const;

/**
 * localStorage에 저장되는 산 검색 이력 키
 */
export const CURRENT_SEARCH_LIST_KEY = "currentMountainSearchList" as const;

/**
 * 검색 이력 최대 저장 개수
 */
export const MAX_SEARCH_HISTORY_COUNT = 20 as const;
