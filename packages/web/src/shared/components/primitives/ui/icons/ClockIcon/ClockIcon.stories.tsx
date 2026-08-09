import type { Meta, StoryObj } from "@storybook/nextjs";

import ClockIcon from ".";

const meta = {
  title: "Shared/UI/Icons/ClockIcon",
  component: ClockIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ClockIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
