import { LOGIN_API_PATH, postLogin, PostLoginRequest } from "api";
import { useMutation } from "@tanstack/react-query";
import publicApi from "@api/_instances/publicApi";

const useAppleLoginMutate = () => {
  return useMutation({
    mutationKey: [LOGIN_API_PATH],
    mutationFn: (data: PostLoginRequest) => postLogin(publicApi, data),
  });
};

export default useAppleLoginMutate;
