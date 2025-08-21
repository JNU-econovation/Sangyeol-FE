import { Href } from "expo-router";

type PathToRoute = { [key: string]: Href };

const PATH_TO_ROUTE: PathToRoute = {
  "course-detail": "/(tabs)/home/course/courseDetail",
  "start-travel": "/travel",
  "manual-detail": "/(tabs)/home/safeManual/[manual]",
  "course-search": "/(tabs)/home/course/search",
  "my-info": "/(tabs)/mypage/myInfo",
  "travel-log": "/(tabs)/mypage/travelLog",
  "course-bookmark": "/(tabs)/mypage/courseBookmark",
  "notification-setting": "/(tabs)/mypage/notificationSetting",
  "change-password": "/(tabs)/mypage/changePassword",
  "check-terms": "/(tabs)/mypage/checkTerms",
  "customer-center": "/(tabs)/mypage/customerCenter/[tab]",
  "mountain-course": "/(tabs)/home/course/[mountainName]",
  starter: "/starter",
} as const;

export default PATH_TO_ROUTE;
