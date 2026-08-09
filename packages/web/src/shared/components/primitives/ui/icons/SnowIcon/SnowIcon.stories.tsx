import type { Meta, StoryObj } from "@storybook/nextjs";

import SnowIcon from ".";

const meta = {
  title: "Shared/UI/Icons/SnowIcon",
  component: SnowIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SnowIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
