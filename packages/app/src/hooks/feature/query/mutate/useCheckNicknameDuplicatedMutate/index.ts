import { getCheckNicknameDuplicated } from "@api/v1/users/nickname/check";
import { useMutation } from "@tanstack/react-query";

/**
 * [!warning] 해당 훅은 비동기적 호출을 위하여 mutate를 사용하였지만, get 요청입니다. 사용에 주의해주세요
 */
const useCheckNicknameDuplicatedMutate = () => {
  return useMutation({
    // mutationKey: [CHECK_NICKNAME_API_PATH(nickname)],
    mutationFn: ({ nickname }: { nickname: string }) =>
      getCheckNicknameDuplicated(nickname),
  });
};

export default useCheckNicknameDuplicatedMutate;
