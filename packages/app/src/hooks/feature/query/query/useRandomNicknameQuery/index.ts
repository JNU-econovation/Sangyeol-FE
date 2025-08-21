import {
  getRandomNickname,
  RANDOM_NICKNAME_API_PATH,
} from "@api/v1/users/nickname/random";
import { useSuspenseQuery } from "@tanstack/react-query";

const useRandomNicknameQuery = () => {
  return useSuspenseQuery({
    queryKey: [RANDOM_NICKNAME_API_PATH],
    queryFn: getRandomNickname,
  });
};

export default useRandomNicknameQuery;
