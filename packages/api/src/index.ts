// API
export { instanceWith as default } from "./api";

// Model Types
export type {
  CourseDifficulty,
  Course,
} from "./model/course";

export type {
  Coordinate,
  FacilityMarker,
  BaseMarker,
  Markers,
} from "./model/map";

// API Response/Request Types

// Bases
export type {
  GetBasesApiResponse,
} from "./api/v1/bases";

export type {
  Weather,
  BaseInfo,
  GetBasesDetailApiResponse,
} from "./api/v1/bases/[mountainId]/details";

// Bookmarks
export type {
  GetBookmarksResponse,
} from "./api/v1/bookmarks";

// Facilities
export type {
  GetFacilitiesApiResponse,
} from "./api/v1/facilities";

// Mountains
export type {
  CourseSortType,
  GetCoursesOfMountainResponse,
} from "./api/v1/mountains/[mountainId]/courses";

export type {
  Mountain,
  GetRelatedMountainsResponse,
} from "./api/v1/mountains/relations/[keyword]";

// OAuth
export type {
  LoginRequestBody,
} from "./api/v1/oauth/apple/login";

export type {
  KakaoLoginResponse,
} from "./api/v1/oauth/kakao";

// Pathways
export type {
  Pathway,
  GetPathwayOfCourseResponse,
} from "./api/v1/pathways";

// Users
export type {
  GetCheckNicknameDuplicatedResponse,
} from "./api/v1/users/nickname/check";

export type {
  GetRandomNicknameResponse,
} from "./api/v1/users/nickname/random";

export type {
  PostProfileResponse,
  PostProfileRequest,
} from "./api/v1/users/profile";

export type {
  GetProfileStatusResponse,
} from "./api/v1/users/profile/status";

export type {
  PostSMSForVerificationResponse,
} from "./api/v1/users/sms";

export type {
  PostVerifyPhoneNumberResponse,
  PostVerifyPhoneNumberRequest,
} from "./api/v1/users/verify-sms";