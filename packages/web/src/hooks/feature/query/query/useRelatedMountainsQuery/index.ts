import {
  getRelatedMountains,
  RELATED_MOUNTAINS_API_PATH,
} from "@/api/v1/mountains/relations/[keyword]";
import { useQuery } from "@tanstack/react-query";

const useRelatedMountainsQuery = (keyword: string) => {
  return useQuery({
    queryKey: [RELATED_MOUNTAINS_API_PATH(keyword)],
    queryFn: () => getRelatedMountains({ keyword }),
    enabled: Boolean(keyword),
    gcTime: 1000 * 60 * 60, // 1 hour
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export default useRelatedMountainsQuery;
