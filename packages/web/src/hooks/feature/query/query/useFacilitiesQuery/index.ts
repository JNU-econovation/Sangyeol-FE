import { FACILITY_API_PATH, getFacilitiesApi } from "api";
import { useSuspenseQuery } from "@tanstack/react-query";
import authenticatedApi from "@/api/_instances/authenticatedApi";

interface UseFacilitiesQueryParams {
  mountainId: string;
}

const useFacilitiesQuery = ({ mountainId }: UseFacilitiesQueryParams) => {
  return useSuspenseQuery({
    queryKey: [FACILITY_API_PATH(mountainId ?? "1")],
    queryFn: () => getFacilitiesApi(authenticatedApi, mountainId ?? "1"),
    staleTime: 1000 * 60 * 5, // 5m
    gcTime: 1000 * 60 * 60, // 1h
  });
};

export default useFacilitiesQuery;
