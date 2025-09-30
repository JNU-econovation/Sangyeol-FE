import { AxiosInstance } from "axios";

export const USER_ALERT_API_PATH = "/api/v1/users/alert";

export interface GetAlertResponse {
  eventAlert: boolean;
  travelRecordCountAlert: boolean;
  travelDeviationAlert: boolean;
  accidentProneAreaAlert: boolean;
}

// TODO: api 변경 반영 필요

// [get] 알림 조회
export const getAlert = async (instance: AxiosInstance) => {
  const response = await instance({
    method: "GET",
    url: USER_ALERT_API_PATH,
  });

  return response.data;
};

// [put] 알림 생성
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
