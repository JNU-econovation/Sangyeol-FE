import type { Meta, StoryObj } from "@storybook/nextjs";

import ClearIcon from ".";

const meta = {
  title: "Shared/UI/Icons/ClearIcon",
  component: ClearIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ClearIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
