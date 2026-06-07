import type { Meta, StoryObj } from "@storybook/nextjs";

import DrizzleIcon from ".";

const meta = {
  title: "Shared/UI/Icons/DrizzleIcon",
  component: DrizzleIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DrizzleIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
