import authenticatedApi from "@shared/api/_instances/authenticatedApi";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getTravelRecordDetails, TRAVEL_RECORD_DETAILS_API_PATH } from "api";

const useTravelRecordDetailQuery = (recordId: string) => {
  return useSuspenseQuery({
    queryKey: [TRAVEL_RECORD_DETAILS_API_PATH({ recordId })],
    queryFn: () => getTravelRecordDetails(authenticatedApi, { recordId }),
  });
};

export default useTravelRecordDetailQuery;
