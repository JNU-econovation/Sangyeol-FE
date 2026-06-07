import type { Meta, StoryObj } from "@storybook/nextjs";

import StarIcon from ".";

const meta = {
  title: "Shared/UI/Icons/StarIcon",
  component: StarIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StarIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
