import { AxiosInstance } from "axios";

export const USER_PROFILE_API_PATH = "/api/v1/users/profile";

//TODO: api 변경 반영 필요
export interface GetProfileResponse {
  name: string;
  nickname: string;
  phoneNumber: string;
  imageUrl: string;
  email: string;
  height: number;
  weight: number;
  bloodType: "A" | "B" | "AB" | "O";
  etc: string;
}

export interface PutProfileRequest {
  nickname: string;
  phoneNumber: string;
  email: string;
  height?: number;
  weight?: number;
  bloodType?: "A" | "B" | "AB" | "O";
  etc: string;
}

//get
export const getProfile = async (instance: AxiosInstance) => {
  const response = await instance<GetProfileResponse>({
    method: "GET",
    url: USER_PROFILE_API_PATH,
  });

  return response.data;
};

//put
export const putProfile = async (
  instance: AxiosInstance,
  profileData: PutProfileRequest,
) => {
  const response = await instance({
    method: "PUT",
    url: USER_PROFILE_API_PATH,
    data: profileData,
  });

  return response.data;
};
