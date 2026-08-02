import { getCheckNicknameDuplicated } from "api";
import { useMutation } from "@tanstack/react-query";
import authenticatedApi from "@api/_instances/authenticatedApi";

/**
 * [!warning] 해당 훅은 비동기적 호출을 위하여 mutate를 사용하였지만, get 요청입니다. 사용에 주의해주세요
 */
const useCheckNicknameDuplicatedMutate = () => {
  return useMutation({
    // mutationKey: [CHECK_NICKNAME_API_PATH(nickname)],
    mutationFn: ({ nickname }: { nickname: string }) =>
      getCheckNicknameDuplicated(authenticatedApi, nickname),
  });
};

export default useCheckNicknameDuplicatedMutate;
