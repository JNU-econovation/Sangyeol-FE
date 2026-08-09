import type { Meta, StoryObj } from "@storybook/nextjs";

import HeartIcon from ".";

const meta = {
  title: "Shared/UI/Icons/HeartIcon",
  component: HeartIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HeartIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
