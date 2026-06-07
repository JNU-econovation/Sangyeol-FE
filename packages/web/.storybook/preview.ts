import type { Preview } from "@storybook/nextjs";

// Tailwind CSS 4 + 디자인 토큰(@theme)을 스토리에 적용하기 위해 전역 스타일을 로드합니다.
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
