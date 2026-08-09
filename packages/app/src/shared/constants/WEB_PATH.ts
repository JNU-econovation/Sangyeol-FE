const BASE_URL = process.env.EXPO_PUBLIC_WEB_BASE_URI ?? "";
const CURRENT_VERSION = process.env.EXPO_PUBLIC_WEBVIEW_CURRENT_VERSION
  ? Number(process.env.EXPO_PUBLIC_WEBVIEW_CURRENT_VERSION)
  : 0;

interface MakePathArg {
  baseUrl?: string;
  version?: number;
  path: string;
}

const makePath = ({ baseUrl = "", version = 0, path }: MakePathArg) => {
  return `${baseUrl ?? BASE_URL}/v${version ?? `v${CURRENT_VERSION}/`}/${path}`;
};

const WEB_PATH = {
  HOME: makePath({
    baseUrl: BASE_URL,
    version: CURRENT_VERSION,
    path: "/home",
  }),
  ETC: makePath({
    baseUrl: BASE_URL,
    version: CURRENT_VERSION,
    path: "/etc",
  }),
};

export default WEB_PATH;
