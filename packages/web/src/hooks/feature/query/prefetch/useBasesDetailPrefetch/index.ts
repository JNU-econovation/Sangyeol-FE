import {
  BASES_DETAIL_API_PATH,
  getBasesDetailApi,
} from "@/api/v1/bases/[mountainId]/details";
import { usePrefetchQuery } from "@tanstack/react-query";

interface BasesDetailPrefetchProps {
  mountainId: string;
}

const useBasesDetailPrefetch = ({ mountainId }: BasesDetailPrefetchProps) => {
  return usePrefetchQuery({
    queryKey: [BASES_DETAIL_API_PATH(mountainId)],
    queryFn: () => getBasesDetailApi(mountainId),
  });
};

export default useBasesDetailPrefetch;
