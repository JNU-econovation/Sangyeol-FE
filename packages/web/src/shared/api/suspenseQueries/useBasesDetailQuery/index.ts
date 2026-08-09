import {
  BASES_DETAIL_API_PATH,
  getBasesDetailApi,
} from "api";
import { useSuspenseQuery } from "@tanstack/react-query";
import authenticatedApi from "@shared/api/_instances/authenticatedApi";

interface BasesDetailQueryProps {
  mountainId: string;
}

const useBasesDetailQuery = ({ mountainId }: BasesDetailQueryProps) => {
  return useSuspenseQuery({
    queryKey: [BASES_DETAIL_API_PATH(mountainId)],
    queryFn: () => getBasesDetailApi(authenticatedApi, mountainId),
  });
};

export default useBasesDetailQuery;
