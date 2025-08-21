import { FACILITY_API_PATH, getFacilitiesApi } from "@/api/v1/facilities";
import { useSuspenseQuery } from "@tanstack/react-query";

interface UseFacilitiesQueryParams {
  mountainId: string;
}

const useFacilitiesQuery = ({ mountainId }: UseFacilitiesQueryParams) => {
  return useSuspenseQuery({
    queryKey: [FACILITY_API_PATH(mountainId ?? 1)],
    queryFn: () => getFacilitiesApi(mountainId ?? 1),
    staleTime: 1000 * 60 * 5, // 5m
    gcTime: 1000 * 60 * 60, // 1h
  });
};

export default useFacilitiesQuery;
