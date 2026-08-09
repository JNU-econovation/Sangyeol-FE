const APP_PATH = {
  COURSE_LIST: (mountainName: string) => `/(tabs)/home/course/${mountainName}`,
} as const;

export default APP_PATH;
