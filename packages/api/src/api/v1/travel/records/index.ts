import { AxiosInstance } from "axios";

export const TRAVEL_RECORDS_API_PATH = ({
  year,
  month,
}: {
  year: number;
  month: number;
}) => `/api/v1/travel/records?year=${year}&month=${month}`;

interface Record {
  id: string;
  date: number;
  displayName: string;
  length: number;
  duration: number;
  difficulty: "EASY" | "NORMAL" | "HARD";
  image: string;
}

export interface GetTravelRecordsResponse {
  records: Record[];
}

// TODO: api 변경 반영 필요

// [get] 산행 기록 조회
export const getTravelRecord = async (
  instance: AxiosInstance,
  { year, month }: { year: number; month: number },
) => {
  const response = await instance<GetTravelRecordsResponse>({
    method: "GET",
    url: TRAVEL_RECORDS_API_PATH({ year, month }),
  });

  return response.data;
};
