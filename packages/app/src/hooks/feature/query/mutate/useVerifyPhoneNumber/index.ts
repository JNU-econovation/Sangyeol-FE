import {
  postVerifyPhoneNumber,
  USER_VERIFY_NUMBER_API_PATH,
} from "@api/v1/users/verify-sms";
import { useMutation } from "@tanstack/react-query";

const useVerifyPhoneNumber = () => {
  return useMutation({
    mutationKey: [USER_VERIFY_NUMBER_API_PATH],
    mutationFn: postVerifyPhoneNumber,
  });
};

export default useVerifyPhoneNumber;
