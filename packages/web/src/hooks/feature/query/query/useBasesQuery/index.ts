import { BASES_API_PATH, getBasesApi } from "@/api/v1/bases";
import { useSuspenseQuery } from "@tanstack/react-query";

interface UseBaseQueryProps {
  mountainId: string;
}

const useBasesQuery = ({ mountainId }: UseBaseQueryProps) => {
  return useSuspenseQuery({
    queryKey: [BASES_API_PATH(mountainId ?? "1")],
    queryFn: () => getBasesApi(mountainId ?? "1"),
    staleTime: 1000 * 60 * 5, // 5m
    gcTime: 1000 * 60 * 60, // 1h
  });
};

export default useBasesQuery;
