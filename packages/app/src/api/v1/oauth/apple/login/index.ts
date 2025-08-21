/**
 * LOGIN API
 * @path - /api/v1/oauth/apple/login
 */

import publicApi from "@api/_instances/publicApi";

interface LoginRequestBody {
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
export const postLogin = async (body: LoginRequestBody) => {
  const response = await publicApi.post(LOGIN_API_PATH, body);
  return response.data;
};
