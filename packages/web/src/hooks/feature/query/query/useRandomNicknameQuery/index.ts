import {
  getRandomNickname,
  RANDOM_NICKNAME_API_PATH,
} from "api";
import { useSuspenseQuery } from "@tanstack/react-query";
import authenticatedApi from "@/api/_instances/authenticatedApi";

const useRandomNicknameQuery = () => {
  return useSuspenseQuery({
    queryKey: [RANDOM_NICKNAME_API_PATH],
    queryFn: () => getRandomNickname(authenticatedApi),
  });
};

export default useRandomNicknameQuery;
