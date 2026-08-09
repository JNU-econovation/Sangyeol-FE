import type { Meta, StoryObj } from "@storybook/nextjs";

import StarWeakIcon from ".";

const meta = {
  title: "Shared/UI/Icons/StarWeakIcon",
  component: StarWeakIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StarWeakIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
