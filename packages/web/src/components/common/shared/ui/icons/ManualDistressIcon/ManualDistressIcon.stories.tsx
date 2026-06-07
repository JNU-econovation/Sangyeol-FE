import type { Meta, StoryObj } from "@storybook/nextjs";

import ManualDistressIcon from ".";

const meta = {
  title: "Shared/UI/Icons/ManualDistressIcon",
  component: ManualDistressIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ManualDistressIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
