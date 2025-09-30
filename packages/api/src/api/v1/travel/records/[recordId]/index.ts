import { AxiosInstance } from "axios";

export const TRAVEL_RECORDS_DELETE_API_PATH = (recordId: string) =>
  `/api/v1/travel/records/${recordId}`;

// TODO: api 변경 반영 필요

// [delete] 알림 조회
export const deleteAlert = async (
  instance: AxiosInstance,
  recordId: string,
) => {
  const response = await instance({
    method: "DELETE",
    url: TRAVEL_RECORDS_DELETE_API_PATH(recordId),
  });

  return response.data;
};
