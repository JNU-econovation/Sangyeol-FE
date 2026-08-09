import type { Meta, StoryObj } from "@storybook/nextjs";

import AppleLogoIcon from ".";

const meta = {
  title: "Shared/UI/Icons/AppleLogoIcon",
  component: AppleLogoIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AppleLogoIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
