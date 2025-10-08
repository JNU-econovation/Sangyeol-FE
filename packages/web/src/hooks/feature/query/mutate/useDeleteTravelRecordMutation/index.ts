import authenticatedApi from "@/api/_instances/authenticatedApi";
import { useMutation } from "@tanstack/react-query";
import { deleteTravelRecord, TRAVEL_RECORD_API_PATH } from "api";

// 산행 기록 삭제
const useDeleteTravelRecordMutation = () => {
  return useMutation({
    mutationKey: [TRAVEL_RECORD_API_PATH],
    mutationFn: (recordId: string) =>
      deleteTravelRecord(authenticatedApi, recordId),
  });
};

export default useDeleteTravelRecordMutation;
