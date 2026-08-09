import type { Meta, StoryObj } from "@storybook/nextjs";

import KakaoLogoIcon from ".";

const meta = {
  title: "Shared/UI/Icons/KakaoLogoIcon",
  component: KakaoLogoIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof KakaoLogoIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
