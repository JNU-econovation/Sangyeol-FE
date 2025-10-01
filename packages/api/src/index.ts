// API
export { instanceWith as default } from "./api";

// 모든 API 타입들을 자동으로 re-export
export * from "./api/v1/bases";
export * from "./api/v1/bases/[mountainId]/details";
export * from "./api/v1/bookmarks";
export * from "./api/v1/bookmarks/[courseId]";
export * from "./api/v1/facilities";
export * from "./api/v1/mountains/[mountainId]/courses";
export * from "./api/v1/mountains/relations/[keyword]";
export * from "./api/v1/oauth/apple/login";
export * from "./api/v1/oauth/kakao";
export * from "./api/v1/pathways";
export * from "./api/v1/users/nickname/check";
export * from "./api/v1/users/nickname/random";
export * from "./api/v1/users/profile";
export * from "./api/v1/users/profile/status";
export * from "./api/v1/users/sms";
export * from "./api/v1/users/verify-sms";
export * from "./api/v1/users/profile/basic-information";
export * from "./api/v1/users/profile/personal-information";

// Model 타입들도 re-export
export * from "./model/course";
export * from "./model/map";
