import type { Meta, StoryObj } from "@storybook/nextjs";

import LeftChevronThinIcon from ".";

const meta = {
  title: "Shared/UI/Icons/LeftChevronThinIcon",
  component: LeftChevronThinIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LeftChevronThinIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
