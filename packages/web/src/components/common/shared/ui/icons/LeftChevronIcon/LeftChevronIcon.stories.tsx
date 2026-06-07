import type { Meta, StoryObj } from "@storybook/nextjs";

import LeftChevronIcon from ".";

const meta = {
  title: "Shared/UI/Icons/LeftChevronIcon",
  component: LeftChevronIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LeftChevronIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
