import authenticatedApi from "@api/_instances/authenticatedApi";
import { useMutation } from "@tanstack/react-query";
import {
  postUserPersonalInformation,
  PostUserPersonalInformationResponse,
  USER_PERSONAL_INFORMATION_API_PATH,
} from "api";

const useUserPersonalInformationMutation = () => {
  return useMutation({
    mutationKey: [USER_PERSONAL_INFORMATION_API_PATH],
    mutationFn: (body: PostUserPersonalInformationResponse) =>
      postUserPersonalInformation(authenticatedApi, body),
  });
};

export default useUserPersonalInformationMutation;
