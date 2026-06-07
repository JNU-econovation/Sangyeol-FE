import type { Meta, StoryObj } from "@storybook/nextjs";

import LockIcon from ".";

const meta = {
  title: "Shared/UI/Icons/LockIcon",
  component: LockIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LockIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
