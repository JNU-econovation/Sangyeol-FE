import type { Meta, StoryObj } from "@storybook/nextjs";

import RightChevronThinIcon from ".";

const meta = {
  title: "Shared/UI/Icons/RightChevronThinIcon",
  component: RightChevronThinIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RightChevronThinIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
