import authenticatedApi from "@api/_instances/authenticatedApi";

export const USER_PROFILE_STATUS_API_PATH = "/api/v1/users/profile/status";

export interface GetProfileStatusResponse {
  isComplete: boolean;
}

export const getProfileStatus = async () => {
  const response = await authenticatedApi<GetProfileStatusResponse>({
    method: "GET",
    url: USER_PROFILE_STATUS_API_PATH,
  });

  return response.data;
};
