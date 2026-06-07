import type { Meta, StoryObj } from "@storybook/nextjs";

import CancelIcon from ".";

const meta = {
  title: "Shared/UI/Icons/CancelIcon",
  component: CancelIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CancelIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
