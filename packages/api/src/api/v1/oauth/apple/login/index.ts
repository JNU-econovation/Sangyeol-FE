import { AxiosInstance } from "axios";

/**
 * LOGIN API
 * @path - /api/v1/oauth/apple/login
 */

export interface PostLoginRequest {
  identityToken: string;
  email: string;
  fullName: {
    familyName: string;
    givenName: string;
  };
}

export const LOGIN_API_PATH = "/api/v1/oauth/apple/login";

/**
 * @method POST
 */
export const postLogin = async (
  instance: AxiosInstance,
  body: PostLoginRequest,
) => {
  const response = await instance.post(LOGIN_API_PATH, body);
  return response.data;
};
