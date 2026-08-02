import authenticatedApi from "@api/_instances/authenticatedApi";
import { useMutation } from "@tanstack/react-query";
import {
  postUserBasicInformation,
  PostUserBasicInformationRequest,
  USER_BASIC_INFORMATION_API_PATH,
} from "api";

const postBasicInformation = () => {
  return useMutation({
    mutationKey: [USER_BASIC_INFORMATION_API_PATH],
    mutationFn: (body: PostUserBasicInformationRequest) =>
      postUserBasicInformation(authenticatedApi, body),
  });
};

export default postBasicInformation;
