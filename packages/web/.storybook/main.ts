import type { StorybookConfig } from "@storybook/nextjs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  // 스토리는 각 컴포넌트 폴더 내부(`*.stories.tsx`)에 colocation 합니다.
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: ["../public"],
  webpackFinal: (webpackConfig) => {
    // @storybook/nextjs는 next/navigation 등을 mock으로 alias하지만,
    // 그 타깃이 상대 specifier(@storybook/nextjs/*.mock)라 import한 모듈 위치 기준으로 해석됩니다.
    // prebuilt 워크스페이스 패키지(stack-link/dist)에서는 @storybook/nextjs가 도달 불가능해
    // "Can't resolve 'next/navigation'" 에러가 나므로, 절대경로로 덮어써 어느 컨텍스트에서도 해석되게 합니다.
    webpackConfig.resolve ??= {};
    webpackConfig.resolve.alias = {
      ...webpackConfig.resolve.alias,
      "next/navigation": require.resolve("@storybook/nextjs/navigation.mock"),
      "next/router": require.resolve("@storybook/nextjs/router.mock"),
      "next/link": require.resolve("@storybook/nextjs/link.mock"),
      "next/headers": require.resolve("@storybook/nextjs/headers.mock"),
      "next/cache": require.resolve("@storybook/nextjs/cache.mock"),
    };
    return webpackConfig;
  },
};

export default config;
