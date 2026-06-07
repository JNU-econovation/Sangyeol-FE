import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  // 스토리는 각 컴포넌트 폴더 내부(`*.stories.tsx`)에 colocation 합니다.
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: ["../public"],
};

export default config;
