import { AxiosInstance } from "axios";

export const USER_BASIC_INFORMATION_API_PATH =
  "/api/v1/users/profile/basic-information";

export interface PostUserBasicInformationRequest {
  nickname: string;
  phoneNumber: string;
  email: string;
}

export interface PostUserBasicInformationResponse {
  nickname: string;
  phoneNumber: string;
  email: string;
}

//TODO: api 변경 반영 필요

/**
 *
 * 프로필 기본 정보 작성
 */
export const postUserBasicInformation = async (
  instance: AxiosInstance,
  body: PostUserBasicInformationRequest,
) => {
  const response = await instance<PostUserBasicInformationResponse>({
    method: "POST",
    url: USER_BASIC_INFORMATION_API_PATH,
    data: body,
  });

  return response.data;
};
