import type { Meta, StoryObj } from "@storybook/nextjs";

import ScratchIcon from ".";

const meta = {
  title: "Shared/UI/Icons/ScratchIcon",
  component: ScratchIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ScratchIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
