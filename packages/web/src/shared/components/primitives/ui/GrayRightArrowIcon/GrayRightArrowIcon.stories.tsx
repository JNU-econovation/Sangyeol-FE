import type { Meta, StoryObj } from "@storybook/nextjs";

import GrayRightArrowIcon from ".";

const meta = {
  title: "Shared/UI/GrayRightArrowIcon",
  component: GrayRightArrowIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    width: { control: { type: "number" } },
    height: { control: { type: "number" } },
  },
  args: {
    width: 24,
    height: 24,
  },
} satisfies Meta<typeof GrayRightArrowIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
