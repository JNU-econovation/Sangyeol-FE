import type { Meta, StoryObj } from "@storybook/nextjs";

import StarBlockIcon from ".";

const meta = {
  title: "Shared/UI/Icons/StarBlockIcon",
  component: StarBlockIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StarBlockIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
