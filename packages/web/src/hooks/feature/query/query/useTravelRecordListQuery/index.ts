import authenticatedApi from "@/api/_instances/authenticatedApi";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getTravelRecordList } from "api";
import { TRAVEL_RECORDS_API_PATH } from "api";

const useTravelRecordListQuery = (params: { year: number; month: number }) => {
  return useSuspenseQuery({
    queryKey: [TRAVEL_RECORDS_API_PATH, params],
    queryFn: () => getTravelRecordList(authenticatedApi, params),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};

export default useTravelRecordListQuery;
