import { AxiosInstance } from "axios";

/**
 * @public
 * @category Constants
 * @description 알림 설정 API 경로
 */
export const USER_ALERT_API_PATH = "/api/v1/users/alert";

/**
 * @public
 * @category Types
 * @interface GetAlertResponse
 * @description 알림 설정 응답 타입
 * @property {boolean} eventAlert - 이벤트 알림
 * @property {boolean} travelRecordCountAlert - 등산 기록 횟수 알림
 * @property {boolean} travelDeviationAlert - 등산로 이탈 알림
 * @property {boolean} accidentProneAreaAlert - 사고 다발 지역 알림
 */
export interface GetAlertResponse {
  eventAlert: boolean;
  travelRecordCountAlert: boolean;
  travelDeviationAlert: boolean;
  accidentProneAreaAlert: boolean;
}

// TODO: api 변경 반영 필요

/**
 * @public
 * @category Users
 * @description 사용자의 알림 설정을 조회합니다
 * @param instance - Axios 인스턴스
 * @returns 알림 설정 정보
 * @example
 * const result = await getAlert(axiosInstance);
 * console.log(result.eventAlert); // true/false
 */
export const getAlert = async (instance: AxiosInstance) => {
  const response = await instance({
    method: "GET",
    url: USER_ALERT_API_PATH,
  });

  return response.data;
};

/**
 * @public
 * @category Users
 * @description 사용자의 알림 설정을 수정합니다
 * @param instance - Axios 인스턴스
 * @param body - 변경할 알림 설정
 * @returns 수정된 알림 설정
 * @example
 * await putAlert(axiosInstance, {
 *   eventAlert: true,
 *   travelRecordCountAlert: false,
 *   travelDeviationAlert: true,
 *   accidentProneAreaAlert: true
 * });
 */
export const putAlert = async (
  instance: AxiosInstance,
  body: GetAlertResponse,
) => {
  const response = await instance({
    method: "PUT",
    url: USER_ALERT_API_PATH,
    data: body,
  });

  return response.data;
};
