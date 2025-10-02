import { AxiosInstance } from "axios";

export const TRAVEL_RECORDS_API_PATH = ({ recordId }: { recordId: string }) =>
  `/api/v1/travel/records/${recordId}/details`;

interface Record {
  recordId: string;
  displayName: string;
  startedAt: number;
  endAt: number;
  duration: number;
  length: number;
  coordinates: [number, number][];
  courseId: string;
  mountainId: string;
}

export interface GetTravelRecordsResponse {
  records: Record[];
}

// TODO: api 변경 반영 필요

// [get] 산행 기록 상세 조회
export const getTravelRecordDetails = async (
  instance: AxiosInstance,
  { recordId }: { recordId: string },
) => {
  const response = await instance<GetTravelRecordsResponse>({
    method: "GET",
    url: TRAVEL_RECORDS_API_PATH({ recordId }),
  });

  return response.data;
};
