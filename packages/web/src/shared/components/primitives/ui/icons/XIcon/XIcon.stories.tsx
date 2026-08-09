import type { Meta, StoryObj } from "@storybook/nextjs";

import XIcon from ".";

const meta = {
  title: "Shared/UI/Icons/XIcon",
  component: XIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof XIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
