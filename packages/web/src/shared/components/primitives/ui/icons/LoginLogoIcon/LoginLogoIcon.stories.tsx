import type { Meta, StoryObj } from "@storybook/nextjs";

import LoginLogoIcon from ".";

const meta = {
  title: "Shared/UI/Icons/LoginLogoIcon",
  component: LoginLogoIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LoginLogoIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
