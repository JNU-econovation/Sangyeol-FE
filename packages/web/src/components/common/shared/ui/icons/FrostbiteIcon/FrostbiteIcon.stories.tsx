import type { Meta, StoryObj } from "@storybook/nextjs";

import FrostbiteIcon from ".";

const meta = {
  title: "Shared/UI/Icons/FrostbiteIcon",
  component: FrostbiteIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FrostbiteIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
