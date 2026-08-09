import type { Meta, StoryObj } from "@storybook/nextjs";

import ExhaustionIcon from ".";

const meta = {
  title: "Shared/UI/Icons/ExhaustionIcon",
  component: ExhaustionIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ExhaustionIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
