import { useQuery } from "@tanstack/react-query";

export const KNPS_CONTROL_INFO_API_PATH = (rstId: string) =>
  `/api/knps-control-info?rstId=${rstId}`;

export interface GetKnpsControlInfoApiResponse {
  park: string;
  status: string;
  reason: string;
  baseTime: string;
  contentHtml: string;
}

export const getKnpsControlInfoApi = async (rstId: string) => {
  const response = await fetch(KNPS_CONTROL_INFO_API_PATH(rstId));

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(body?.error ?? "통제정보 조회에 실패했습니다.");
  }

  return (await response.json()) as GetKnpsControlInfoApiResponse;
};

interface KnpsControlInfoQueryProps {
  rstId: string;
}

const useKnpsControlInfoQuery = ({ rstId }: KnpsControlInfoQueryProps) => {
  return useQuery({
    queryKey: [KNPS_CONTROL_INFO_API_PATH(rstId)],
    queryFn: () => getKnpsControlInfoApi(rstId),
    staleTime: 1000 * 60 * 60 * 24, // 서버 revalidate(하루)와 동일
    gcTime: 1000 * 60 * 60 * 24,
  });
};

export default useKnpsControlInfoQuery;
