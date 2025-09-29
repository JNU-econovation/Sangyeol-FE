import { AxiosInstance } from "axios";

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
import { USER_PROFILE_API_PATH, postProfile } from "./v1/users/profile";
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

export const instanceWith = (Instance: AxiosInstance) => {
  return {
    // Bases APIs
    getBasesApi: {
      path: BASES_API_PATH,
      api: getBasesApi.bind(null, Instance),
    },
    getBasesDetailApi: {
      path: BASES_DETAIL_API_PATH,
      api: getBasesDetailApi.bind(null, Instance),
    },

    // Bookmarks APIs
    getBookmarksApi: {
      path: BOOKMARK_API_PATH,
      api: getBookmarksApi.bind(null, Instance),
    },
    postBookmarkApi: {
      path: BOOKMARK_API_PATH,
      api: postBookmarkApi.bind(null, Instance),
    },
    deleteBookmarkApi: {
      path: DELETE_BOOKMARK_API_PATH,
      api: deleteBookmarkApi.bind(null, Instance),
    },

    // Facilities API
    getFacilitiesApi: {
      path: FACILITY_API_PATH,
      api: getFacilitiesApi.bind(null, Instance),
    },

    // Mountains APIs
    getCoursesOfMountainApi: {
      path: COURSES_OF_MOUNTAIN_API_PATH,
      api: getCoursesOfMountainApi.bind(null, Instance),
    },
    getRelatedMountains: {
      path: RELATED_MOUNTAINS_API_PATH,
      api: getRelatedMountains.bind(null, Instance),
    },

    // OAuth APIs
    postLogin: {
      path: LOGIN_API_PATH,
      api: postLogin.bind(null, Instance),
    },
    getKakaoLoginApi: {
      path: KAKAO_LOGIN_URI,
      api: getKakaoLoginApi.bind(null, Instance),
    },

    // Pathways API
    getPathwayOfCourse: {
      path: PATHWAY_API_PATH,
      api: getPathwayOfCourse.bind(null, Instance),
    },

    // Users APIs
    getCheckNicknameDuplicated: {
      path: CHECK_NICKNAME_API_PATH,
      api: getCheckNicknameDuplicated.bind(null, Instance),
    },
    getRandomNickname: {
      path: RANDOM_NICKNAME_API_PATH,
      api: getRandomNickname.bind(null, Instance),
    },
    postProfile: {
      path: USER_PROFILE_API_PATH,
      api: postProfile.bind(null, Instance),
    },
    getProfileStatus: {
      path: USER_PROFILE_STATUS_API_PATH,
      api: getProfileStatus.bind(null, Instance),
    },
    postSMSForVerification: {
      path: USER_VERIFY_SMS_API_PATH,
      api: postSMSForVerification.bind(null, Instance),
    },
    postVerifyPhoneNumber: {
      path: USER_VERIFY_NUMBER_API_PATH,
      api: postVerifyPhoneNumber.bind(null, Instance),
    },
  };
};
