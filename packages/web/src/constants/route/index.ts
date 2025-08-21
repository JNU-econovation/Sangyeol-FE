const ROUTE = {
  MAIN: "/",
  LOGIN: "/login",
  SOCIAL_LOGIN_LOADING: "/social-login-loading",

  // mountain & course
  MOUNTAIN: "/mountain",
  MOUNTAIN_COURSE: (mountainId: string) => `/mountain/${mountainId}/course`,
  MOUNTAIN_COURSE_DETAIL: (
    mountainId: string,
    courseId: string,
    searchParams?: Record<string, string>
  ) =>
    `/mountain/${mountainId}/course/${courseId}?${new URLSearchParams(
      searchParams
    ).toString()}`,
  MOUNTAIN_COURSE_SEARCH: (mountainId: string) =>
    `/mountain/${mountainId}/course/search`,
  COURSE: "/course",
  COURSE_SEARCH_RESULT: ({
    mountainId,
    sort = "my",
  }: {
    mountainId: string;
    sort?: string;
  }) => `/course/${mountainId}?sort=${sort}`,

  // travel
  TRAVEL: ({ tag = "" }: { tag?: string }) =>
    `/travel${tag ? `?tag=${tag}` : ""}`,

  //my page
  MY_PAGE: "/my-page",
  MY_INFO: "/my-page/my-info",
  HIKING_LOG: "/my-page/hiking-log",
  COURSE_BOOKMARK: "/my-page/course-bookmark",
  FAQ: "/my-page/faq",
  INQUIRY: "/my-page/inquiry",
  INQUIRY_HISTORY: "/my-page/inquiry-history",
  CHECK_TERMS: "/my-page/check-terms",
  NOTIFICATION_SETTINGS: "/my-page/notification-settings",
  CHANGE_PASSWORD: "/my-page/change-password",
};

export default ROUTE;
