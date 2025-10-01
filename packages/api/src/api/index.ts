import { AxiosInstance } from "axios";
import type { CourseSortType } from "@model/course";
import type { LoginRequestBody } from "./v1/oauth/apple/login";
import type { PutProfileRequest } from "./v1/users/profile";
import type { PostVerifyPhoneNumberRequest } from "./v1/users/verify-sms";

import { BASES_API_PATH, getBasesApi } from "./v1/bases";
import {
  BASES_DETAIL_API_PATH,
  getBasesDetailApi,
} from "./v1/bases/[mountainId]/details";
import {
  BOOKMARK_API_PATH,
  getBookmarksApi,
  postBookmarkApi,
} from "./v1/bookmarks";
import {
  DELETE_BOOKMARK_API_PATH,
  deleteBookmarkApi,
} from "./v1/bookmarks/[courseId]";
import { FACILITY_API_PATH, getFacilitiesApi } from "./v1/facilities";
import {
  COURSES_OF_MOUNTAIN_API_PATH,
  getCoursesOfMountainApi,
} from "./v1/mountains/[mountainId]/courses";
import {
  RELATED_MOUNTAINS_API_PATH,
  getRelatedMountains,
} from "./v1/mountains/relations/[keyword]";
import { LOGIN_API_PATH, postLogin } from "./v1/oauth/apple/login";
import { KAKAO_LOGIN_URI, getKakaoLoginApi } from "./v1/oauth/kakao";
import { PATHWAY_API_PATH, getPathwayOfCourse } from "./v1/pathways";
import {
  CHECK_NICKNAME_API_PATH,
  getCheckNicknameDuplicated,
} from "./v1/users/nickname/check";
import {
  RANDOM_NICKNAME_API_PATH,
  getRandomNickname,
} from "./v1/users/nickname/random";
import {
  USER_PROFILE_API_PATH,
  getProfile,
  putProfile,
} from "./v1/users/profile";
import {
  USER_PROFILE_STATUS_API_PATH,
  getProfileStatus,
} from "./v1/users/profile/status";
import {
  USER_VERIFY_SMS_API_PATH,
  postSMSForVerification,
} from "./v1/users/sms";
import {
  USER_VERIFY_NUMBER_API_PATH,
  postVerifyPhoneNumber,
} from "./v1/users/verify-sms";
import {
  postUserBasicInformation,
  USER_BASIC_INFORMATION_API_PATH,
} from "./v1/users/profile/basic-information";
import {
  postUserPersonalInformation,
  PostUserPersonalInformationRequest,
  USER_PERSONAL_INFORMATION_API_PATH,
} from "./v1/users/profile/personal-information";

export const instanceWith = (Instance: AxiosInstance) => {
  return {
    // Bases APIs
    getBasesApi: {
      path: BASES_API_PATH,
      api: (mountainId: string) => getBasesApi(Instance, mountainId),
    },
    getBasesDetailApi: {
      path: BASES_DETAIL_API_PATH,
      api: (mountainId: string) => getBasesDetailApi(Instance, mountainId),
    },

    // Bookmarks APIs
    getBookmarksApi: {
      path: BOOKMARK_API_PATH,
      api: () => getBookmarksApi(Instance),
    },
    postBookmarkApi: {
      path: BOOKMARK_API_PATH,
      api: (courseId: string) => postBookmarkApi(Instance, courseId),
    },
    deleteBookmarkApi: {
      path: DELETE_BOOKMARK_API_PATH,
      api: (courseId: string) => deleteBookmarkApi(Instance, courseId),
    },

    // Facilities API
    getFacilitiesApi: {
      path: FACILITY_API_PATH,
      api: (mountainId: string) => getFacilitiesApi(Instance, mountainId),
    },

    // Mountains APIs
    getCoursesOfMountainApi: {
      path: COURSES_OF_MOUNTAIN_API_PATH,
      api: (params: { mountainId: string; sortBy?: CourseSortType }) =>
        getCoursesOfMountainApi(Instance, params),
    },
    getRelatedMountains: {
      path: RELATED_MOUNTAINS_API_PATH,
      api: (params: { keyword: string }) =>
        getRelatedMountains(Instance, params),
    },

    // OAuth APIs
    postLogin: {
      path: LOGIN_API_PATH,
      api: (body: LoginRequestBody) => postLogin(Instance, body),
    },
    getKakaoLoginApi: {
      path: KAKAO_LOGIN_URI,
      api: () => getKakaoLoginApi(Instance),
    },

    // Pathways API
    getPathwayOfCourse: {
      path: PATHWAY_API_PATH,
      api: (courseId: string) => getPathwayOfCourse(Instance, courseId),
    },

    // Users APIs
    getCheckNicknameDuplicated: {
      path: CHECK_NICKNAME_API_PATH,
      api: (nickname: string) => getCheckNicknameDuplicated(Instance, nickname),
    },
    getRandomNickname: {
      path: RANDOM_NICKNAME_API_PATH,
      api: () => getRandomNickname(Instance),
    },
    getProfile: {
      path: USER_PROFILE_API_PATH,
      api: () => getProfile(Instance),
    },
    putProfile: {
      path: USER_PROFILE_API_PATH,
      api: (profileData: PutProfileRequest) =>
        putProfile(Instance, profileData),
    },
    getProfileStatus: {
      path: USER_PROFILE_STATUS_API_PATH,
      api: () => getProfileStatus(Instance),
    },
    postSMSForVerification: {
      path: USER_VERIFY_SMS_API_PATH,
      api: (phoneNumber: string) =>
        postSMSForVerification(Instance, phoneNumber),
    },
    postVerifyPhoneNumber: {
      path: USER_VERIFY_NUMBER_API_PATH,
      api: (params: PostVerifyPhoneNumberRequest) =>
        postVerifyPhoneNumber(Instance, params),
    },
    postUserBasicInformation: {
      path: USER_BASIC_INFORMATION_API_PATH,
      api: (params: { nickname: string; phoneNumber: string; email: string }) =>
        postUserBasicInformation(Instance, params),
    },
    postUserPersonalInformation: {
      path: USER_PERSONAL_INFORMATION_API_PATH,
      api: (params: PostUserPersonalInformationRequest) =>
        postUserPersonalInformation(Instance, params),
    },
  };
};
