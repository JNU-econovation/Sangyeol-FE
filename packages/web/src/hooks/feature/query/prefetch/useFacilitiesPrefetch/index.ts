import { FACILITY_API_PATH, getFacilitiesApi } from "api";
import { usePrefetchQuery } from "@tanstack/react-query";
import authenticatedApi from "@/api/_instances/authenticatedApi";

interface UseFacilitiesPrefetchProps {
  mountainId: string;
}

const useFacilitiesPrefetch = ({ mountainId }: UseFacilitiesPrefetchProps) => {
  return usePrefetchQuery({
    queryKey: [FACILITY_API_PATH(mountainId)],
    queryFn: () => getFacilitiesApi(authenticatedApi, mountainId),
    staleTime: 1000 * 60 * 5, // 5m
    gcTime: 1000 * 60 * 60, // 1h
  });
};

export default useFacilitiesPrefetch;
