import { AxiosInstance } from "axios";

export const USER_PROFILE_STATUS_API_PATH = "/api/v1/users/profile/status";

export interface GetProfileStatusResponse {
  basicInformation: boolean;
  personalInformation: boolean;
}

export const getProfileStatus = async (instance: AxiosInstance) => {
  const response = await instance<GetProfileStatusResponse>({
    method: "GET",
    url: USER_PROFILE_STATUS_API_PATH,
  });

  return response.data;
};
