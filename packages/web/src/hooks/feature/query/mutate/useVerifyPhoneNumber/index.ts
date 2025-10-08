import {
  postVerifyPhoneNumber,
  PostVerifyPhoneNumberRequest,
  USER_VERIFY_NUMBER_API_PATH,
} from "api";
import { useMutation } from "@tanstack/react-query";
import authenticatedApi from "@/api/_instances/authenticatedApi";

const useVerifyPhoneNumber = () => {
  return useMutation({
    mutationKey: [USER_VERIFY_NUMBER_API_PATH],
    mutationFn: (data: PostVerifyPhoneNumberRequest) => {
      console.log(data);
      return postVerifyPhoneNumber(authenticatedApi, data);
    },
  });
};

export default useVerifyPhoneNumber;
