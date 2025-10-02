import { BASES_API_PATH, getBasesApi } from "api";
import { useSuspenseQuery } from "@tanstack/react-query";
import authenticatedApi from "@/api/_instances/authenticatedApi";

interface UseBaseQueryProps {
  mountainId: string;
}

const useBasesQuery = ({ mountainId }: UseBaseQueryProps) => {
  return useSuspenseQuery({
    queryKey: [BASES_API_PATH(mountainId)],
    queryFn: () => getBasesApi(authenticatedApi, mountainId),
    staleTime: 1000 * 60 * 5, // 5m
    gcTime: 1000 * 60 * 60, // 1h
  });
};

export default useBasesQuery;
