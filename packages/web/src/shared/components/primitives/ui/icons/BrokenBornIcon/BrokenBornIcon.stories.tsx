import type { Meta, StoryObj } from "@storybook/nextjs";

import BrokenBornIcon from ".";

const meta = {
  title: "Shared/UI/Icons/BrokenBornIcon",
  component: BrokenBornIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BrokenBornIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
