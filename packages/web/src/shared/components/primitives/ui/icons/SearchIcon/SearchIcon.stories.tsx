import type { Meta, StoryObj } from "@storybook/nextjs";

import SearchIcon from ".";

const meta = {
  title: "Shared/UI/Icons/SearchIcon",
  component: SearchIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SearchIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
