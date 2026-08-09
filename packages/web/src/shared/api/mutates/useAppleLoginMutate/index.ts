import { LOGIN_API_PATH, postLogin, PostLoginRequest } from "api";
import { useMutation } from "@tanstack/react-query";
import publicApi from "@shared/api/_instances/publicApi";

const useAppleLoginMutate = () => {
  return useMutation({
    mutationKey: [LOGIN_API_PATH],
    mutationFn: (data: PostLoginRequest) => postLogin(publicApi, data),
  });
};

export default useAppleLoginMutate;
