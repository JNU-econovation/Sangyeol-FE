import type { Meta, StoryObj } from "@storybook/nextjs";

import PositionPointerIcon from ".";

const meta = {
  title: "Shared/UI/Icons/PositionPointerIcon",
  component: PositionPointerIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PositionPointerIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
