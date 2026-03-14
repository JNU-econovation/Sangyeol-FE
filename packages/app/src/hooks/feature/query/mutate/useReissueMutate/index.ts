import { REISSUE_API_PATH, postReissueApi, PostReissueRequest } from "api";
import { useMutation } from "@tanstack/react-query";
import publicApi from "@api/_instances/publicApi";

const useReissueMutate = () => {
  return useMutation({
    mutationKey: [REISSUE_API_PATH],
    mutationFn: (data: PostReissueRequest) => postReissueApi(publicApi, data),
  });
};

export default useReissueMutate;
