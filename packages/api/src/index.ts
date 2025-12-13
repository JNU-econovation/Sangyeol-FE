// 모든 API 타입들을 자동으로 re-export
export * from "./api/v1/bases";
export * from "./api/v1/bases/[mountainId]/details";
export * from "./api/v1/bookmarks";
export * from "./api/v1/bookmarks/[courseId]";
export * from "./api/v1/facilities";
export * from "./api/v1/mountains/[mountainId]/courses";
export * from "./api/v1/mountains/searches/suggestions";
export * from "./api/v1/oauth/apple/login";
export * from "./api/v1/oauth/kakao";
export * from "./api/v1/pathways";
export * from "./api/v1/users/nickname/check";
export * from "./api/v1/users/nickname/random";
export * from "./api/v1/users/profile";
export * from "./api/v1/users/profile/status";
export * from "./api/v1/auth/sms";
export * from "./api/v1/auth/sms/verify";
export * from "./api/v1/users/profile/basic-information";
export * from "./api/v1/users/profile/personal-information";
// export * from "./api/v1/users/profile/image"; // 주석 처리: profile-image와 중복
export * from "./api/v1/users/profile-image";
export * from "./api/v1/users/profile-image/save";
export * from "./api/v1/users/alert";
export * from "./api/v1/travel/records";
export * from "./api/v1/travel/records/[recordId]";
export * from "./api/v1/travel/records/[recordId]/details";

// Model 타입들도 re-export
export * from "./model/course";
export * from "./model/map";

// Constants re-export
export { default as MAP_CONSTANTS } from "./constants/map";

// Utils re-export
export * from "./utils/phoneNumber";
