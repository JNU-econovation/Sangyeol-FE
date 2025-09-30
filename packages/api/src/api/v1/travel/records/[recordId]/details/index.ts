import { AxiosInstance } from "axios";

export const TRAVEL_RECORDS_API_PATH = ({
  year,
  month,
}: {
  year: number;
  month: number;
}) => `/api/v1/travel/records?year=${year}&month=${month}`;

interface Record {
  recordId: string;
  displayName: string;
  startedAt: number;
  endAt: number;
  duration: number;
  length: number;
  coordinates: [number, number][];
}

export interface GetTravelRecordsResponse {
  records: Record[];
}

// TODO: api 변경 반영 필요

// [get] 알림 조회
export const getAlert = async (
  instance: AxiosInstance,
  { year, month }: { year: number; month: number },
) => {
  const response = await instance<GetTravelRecordsResponse>({
    method: "GET",
    url: TRAVEL_RECORDS_API_PATH({ year, month }),
  });

  return response.data;
};
