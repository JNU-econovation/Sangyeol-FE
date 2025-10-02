import { AxiosInstance } from "axios";

export const TRAVEL_RECORD_API_PATH = (recordId: string) =>
  `/api/v1/travel/records/${recordId}`;

// TODO: api 변경 반영 필요

// [delete] 산행 기록 삭제
export const deleteTravelRecord = async (
  instance: AxiosInstance,
  recordId: string,
) => {
  const response = await instance({
    method: "DELETE",
    url: TRAVEL_RECORD_API_PATH(recordId),
  });

  return response.data;
};
