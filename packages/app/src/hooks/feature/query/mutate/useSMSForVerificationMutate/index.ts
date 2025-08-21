import {
  postSMSForVerification,
  USER_VERIFY_SMS_API_PATH,
} from "@api/v1/users/sms";
import { useMutation } from "@tanstack/react-query";

const useSMSForVerificationMutate = () => {
  return useMutation({
    mutationKey: [USER_VERIFY_SMS_API_PATH],
    mutationFn: postSMSForVerification,
  });
};

export default useSMSForVerificationMutate;
