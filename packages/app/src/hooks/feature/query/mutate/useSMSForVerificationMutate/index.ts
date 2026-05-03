import { postSMSForVerification, USER_VERIFY_SMS_API_PATH } from "api";
import { useMutation } from "@tanstack/react-query";
import authenticatedApi from "@api/_instances/authenticatedApi";

const useSMSForVerificationMutate = () => {
  return useMutation({
    mutationKey: [USER_VERIFY_SMS_API_PATH],
    mutationFn: (phoneNumber: string) =>
      postSMSForVerification(authenticatedApi, phoneNumber),
  });
};

export default useSMSForVerificationMutate;
