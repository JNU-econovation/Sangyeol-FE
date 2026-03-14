import authenticatedApi from "@api/_instances/authenticatedApi";
import { useMutation } from "@tanstack/react-query";
import { postLogoutApi } from "api";

const useLogoutMutate = () => {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: () => postLogoutApi(authenticatedApi),
  });
};

export default useLogoutMutate;
