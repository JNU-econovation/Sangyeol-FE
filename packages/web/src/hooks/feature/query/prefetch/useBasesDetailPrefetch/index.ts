import {
  BASES_DETAIL_API_PATH,
  getBasesDetailApi,
} from "api";
import { usePrefetchQuery } from "@tanstack/react-query";
import authenticatedApi from "@/api/_instances/authenticatedApi";

interface BasesDetailPrefetchProps {
  mountainId: string;
}

const useBasesDetailPrefetch = ({ mountainId }: BasesDetailPrefetchProps) => {
  return usePrefetchQuery({
    queryKey: [BASES_DETAIL_API_PATH(mountainId)],
    queryFn: () => getBasesDetailApi(authenticatedApi, mountainId),
  });
};

export default useBasesDetailPrefetch;
